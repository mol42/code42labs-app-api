// initialize dotenv
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });

import { initializeDI, diContext } from "./di";
import GenericApiResponse from "../common-lib/models/generic-api-response";
import amqp from "amqplib/callback_api";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import randomString from "randomstring";
import { Op, Sequelize } from "sequelize";
import EmailValidator from "email-deep-validator";
import ERR_CONS from "../common-lib/config/error-constants";
import UserModelIniter from "../common-lib/models/usermodel";
//-----
import TmplActivationEmail from "./templates/tmpl_activation_email";
import TmplPasswordResetEmail from "./templates/tmpl_password_reset_email";
import TmplMembershipActivated from "./templates/tmpl_membership_activated";
import TmplMembershipActivationError from "./templates/tmpl_membership_activation_error";

const AUTH_RPC_QUEUE = "C42_AUTH_RPC_QUEUE";
const DEFAULT_COUNTRY_TURKEY_ID = 1;
const jwtKey = "c42_sec_key";
const PASSWORD_SALT = "c42L@bZ"
const jwtExpirySeconds = 604800;
const {
    USERNAME_TAKEN,
    UNKOWN_ERROR,
    AUTH_ERROR,
    PASSWORD_UPDATE_ERROR,
    AUTH_DATA_MISSING,
    SIGNUP_FORM_EMPTY,
    SIGNUP_ALREADY_SIGNED_UP,
    SIGNUP_INVALID_EMAIL
} = ERR_CONS;

const sendActivationEmail = function (requestId, { firstName, email }) {
    const { emailService } = diContext.bottle.container;
    const activationEmail = TmplActivationEmail({
        firstName,
        requestId
    });

    console.log(activationEmail);

    emailService.sendEmail(email, "Email adresinizi onaylayınız", activationEmail);
};

const sendPasswordResetEmail = function (requestId, { firstName, email, code }) {
    const { emailService } = diContext.bottle.container;
    const activationEmail = TmplPasswordResetEmail({
        firstName,
        code
    });

    console.log("sendPasswordResetEmail, email", email);

    emailService.sendEmail(email, "Şifre belirleme kodunuz", activationEmail);
};

const sendNewUserInfo = function (email) {
    const { emailService } = diContext.bottle.container;
    emailService.sendEmail(["tayfun@mol42.com"], "Yeni kullanıcı!", `Kullanıcı emaili: ${email}`);
};

const generateSaltedPassword = (email, password) => {
    const salt = PASSWORD_SALT;
    const key = crypto.pbkdf2Sync(password, email + salt, 100000, 64, "sha512");
    const skey = key.toString("hex");

    return [salt, skey];
};

const authMicoservice_login = async function (requestData, response) {
    const { cacheService, sequelize } = diContext.container;
    const UserModel = UserModelIniter(sequelize, Sequelize);
    const { email, password, appVersion } = requestData;
    const announcementVersion = "1.10.0";

    if (!email || !password) {
        return response.failJSONString(AUTH_DATA_MISSING);
    }

    let [salt, saltedPassword] = generateSaltedPassword(email, password);

    let user = {
        email: email,
        hashedPassword: saltedPassword
    };

    try {
        const dbUser = await UserModel.findOne({ where: user, raw: true });

        if (!dbUser) {
            return response.failJSONString(AUTH_ERROR);
        } else {
            let {
                id,
                firstName,
                lastName,
                countryId,
                birthdate,
                email,
                phone,
                avatarId,
                lastAnnouncement,
                welcomed
            } = dbUser;

            let sessionUserObj = {
                id,
                firstName,
                lastName,
                countryId,
                birthdate,
                email,
                phone,
                avatarId,
                welcomed: false,
                showAnnouncement: false,
                announcementVersion
            };
            let redisSessionUser = {
                id,
                firstName,
                lastName,
                countryId,
                birthdate,
                email,
                phone,
                avatarId,
                showAnnouncement: false,
                announcementVersion
            };

            const xAuthToken = jwt.sign(redisSessionUser, jwtKey, {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds
            });

            await cacheService.set(xAuthToken, JSON.stringify(redisSessionUser), Math.round(new Date().getTime() / 1000 + 86400));

            return response.okJSONString({
                user: sessionUserObj,
                xAuthToken
            });
        }
    } catch (err) {
        console.log(err);
        return response.failJSONString(UNKOWN_ERROR);
    }
};

const authMicoservice_signup = async function (requestData, response) {
    const { cacheService, sequelize } = diContext.container;
    //---
    try {
        const UserModel = UserModelIniter(sequelize, Sequelize);
        const { firstName, lastName, email, password, referralCode } = requestData;

        if (!firstName || !lastName || !email || !password) {
            return response.failJSONString(SIGNUP_FORM_EMPTY);
        }

        // remove invalid chars from username....
        const uppercasedReferralCode = referralCode?.toUpperCase();
        const lowercasedEmail = email.toLowerCase();

        let emailLocal, emailDomain;
        try {
            [emailLocal, emailDomain] = EmailValidator.extractAddressParts(lowercasedEmail);
        } catch (err) {
            return response.failJSONString(SIGNUP_INVALID_EMAIL);
        }

        // clear out dots from email to prevent double signups...
        // for ex : tayfun.y@gmail,].com vs tayfuny@gmail.com
        let emailWithoutDots = `${emailLocal.split(".").join("")}@${emailDomain}`;
        //--
        let foundEmail = await UserModel.findOne({
            where: {
                email: {
                    [Op.or]: {
                        [Op.eq]: lowercasedEmail,
                        [Op.eq]: emailWithoutDots
                    }
                }
            },
            raw: true
        });

        if (foundEmail) {
            return response.failJSONString(SIGNUP_ALREADY_SIGNED_UP);
        }

        let [salt, saltedPassword] = generateSaltedPassword(lowercasedEmail, password);

        let signUpRequest = {
            firstName: firstName,
            lastName: lastName,
            birthday: "",
            phone: "",
            email: lowercasedEmail,
            referralCode: uppercasedReferralCode,
            hashedPassword: saltedPassword,
            countryId: DEFAULT_COUNTRY_TURKEY_ID,
            status: 1,
            salt
        };

        console.log("signUpRequest", signUpRequest);

        const requestId = uuidv4();

        await cacheService.set(requestId, JSON.stringify(signUpRequest), Math.round(new Date().getTime() / 1000 + 86400 * 5));
        sendActivationEmail(requestId, signUpRequest);
        return response.okJSONString({});
    } catch (err) {
        console.log(err);
        return response.failJSONString(UNKOWN_ERROR);
    }
};

const authMicoservice_activate = async function (requestData, response) {
    const { cacheService, sequelize } = diContext.bottle.container;
    const UserModel = UserModelIniter(sequelize, Sequelize);
    const { requestId } = requestData;
    let user;
    //---
    try {
        let userData = await cacheService.get(requestId);
        user = JSON.parse(userData);

        console.log("userData", userData);

        await UserModel.create(user);

        sendNewUserInfo(user.email);

        return TmplMembershipActivated({
            firstName: user.firstName
        });
    } catch (err) {
        console.log(err);
        return TmplMembershipActivationError({
            firstName: user ? user.firstName : ""
        });
    }
};

const authMicroservice_resetPassword = async function (requestData, sessionUser, response) {
    const { cacheService } = diContext.container;
    const { email } = requestData;
    const { firstName } = sessionUser;
    const resetPasswordRequest = {
        firstName,
        email,
        code: randomString.generate({
            length: 6,
            charset: "alphanumeric"
        })
    };

    const requestId = "RESET_" + email + resetPasswordRequest.code;

    console.log("authMicroservice_resetPassword requestId", requestId);

    try {
        await cacheService.set(requestId, JSON.stringify(resetPasswordRequest), Math.round(new Date().getTime() / 1000 + 86400 * 5));
        sendPasswordResetEmail(requestId, resetPasswordRequest);
        return response.okJSONString({});
    } catch (err) {
        console.log(err);
        return response.failJSONString(UNKOWN_ERROR);
    }
};

const authMicroservice_updatePassword = async function (requestData, response) {
    const { sequelize, cacheService } = diContext.bottle.container;
    const UserModel = UserModelIniter(sequelize, Sequelize);

    const { email, code, password } = requestData;
    const [salt, saltedPassword] = generateSaltedPassword(email, password);
    const requestId = "RESET_" + email + code;

    try {
        let reply = await cacheService.get(requestId);
        //---
        if (reply) {
            let result = await UserModel.findAll({ where: { email } });

            if (result.length > 0) {
                result[0].hashedPassword = saltedPassword;
                result[0].save();
                return response.okJSONString({});
            }
        } else {
            return response.failJSONString(PASSWORD_UPDATE_ERROR);
        }
    } catch (err) {
        return response.failJSONString(UNKOWN_ERROR);
    }
};

/*
 **********************************************************************
 */
const MQ_CONN_STR = `amqp://${process.env.MQ_USER}:${process.env.MQ_PASS}@${process.env.MQ_HOST}?heartbeat=10`;

console.log("MQ_CONN_STR", MQ_CONN_STR);

// amqplib yardimi ile RabbitMQ'ye baglanti aciyoruz ve belirledigimiz
// message queue kanalindan mesajlari dinlemeye basliyoruz.
amqp.connect(MQ_CONN_STR, function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        // dinlemek istedigimiz queue kanalinin adi
        const queue = AUTH_RPC_QUEUE;

        channel.assertQueue(queue, {
            durable: false
        });
        channel.prefetch(1);
        console.log(" [x] Awaiting RPC requests");
        channel.consume(queue, async function reply(msg) {
            //-----
            const authCommandDataJSON = msg.content.toString();
            console.log("incoming command", authCommandDataJSON);
            // MQ uzerinden string data gonderdigimiz icin JSON.parse
            // islemi yaparak datamizi JS objesine donstururuz.
            const authCommandData = JSON.parse(authCommandDataJSON);
            const responseDataHolder = { data: null };
            // authCommandData Api gateway tarafindan belirli bir standart data yapisina gore
            // hazirlanip MQ'ye gonderilen mesaj icerigidir.
            const { command, data, sessionUser } = authCommandData;
            const response = new GenericApiResponse();
            //------
            if (command === "AUTH_LOGIN") {
                responseDataHolder.data = await authMicoservice_login(data, response);
            } else if (command === "AUTH_SIGNUP") {
                responseDataHolder.data = await authMicoservice_signup(data, response);
            } else if (command === "AUTH_ACTIVATE") {
                responseDataHolder.data = await authMicoservice_activate(data, response);
            } else if (command === "AUTH_RESET_PASSWORD") {
                responseDataHolder.data = await authMicroservice_resetPassword(data, sessionUser, response);
            } else if (command === "AUTH_UPDATE_PASSWORD") {
                responseDataHolder.data = await authMicroservice_updatePassword(data, response);
            } else {
                responseDataHolder.data = response.failJSONString();
            }
            //------
            if (responseDataHolder.data !== null) {
                channel.sendToQueue(msg.properties.replyTo, Buffer.from(responseDataHolder.data), {
                    correlationId: msg.properties.correlationId
                });

                channel.ack(msg);
            }
        });
    });
});

initializeDI();

