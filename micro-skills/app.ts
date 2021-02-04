// initialize dotenv
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });

import { initializeDI, diContext } from "./di";
import GenericApiResponse from "../common-lib/models/generic-api-response";
import amqp from "amqplib/callback_api";
import { Op, Sequelize } from "sequelize";
// import ERR_CONS from "../common-lib/config/error-constants";
import SkillModelIniter from "../common-lib/models/skillmodel";
import UserFavoriteSkillModelIniter from "../common-lib/models/userfavoriteskillmodel";
import UserSkillStepProgressModelIniter from "../common-lib/models/userskillstepprogressmodel";
import SkillTypeModelIniter from "../common-lib/models/skilltypemodel";
import SkillStepModelIniter from "../common-lib/models/skillstepmodel";
import SkilStepResourceModelIniter from "../common-lib/models/skillstepresourcemodel";
//-----

const SKILLS_RPC_QUEUE = "C42_SKILLS_RPC_QUEUE";

const skillsMicro_fetchAllSkills = async function (requestData, response: GenericApiResponse) {
    const { sequelize } = diContext.container;
    try {
        const SkillModel = SkillModelIniter(sequelize, Sequelize);

        const allSkills = await SkillModel.findAll({
            raw: true
        });

        return response.okJSONString(allSkills);
    } catch (err) {
        return response.failJSONString();
    }
}

const skillsMicro_fetchFavoriteSkills = async function (requestData, response: GenericApiResponse, sessionUser) {
    const { sequelize } = diContext.container;
    try {
        const SkillModel = SkillModelIniter(sequelize, Sequelize);
        const UserFavoriteSkillModel = UserFavoriteSkillModelIniter(sequelize, Sequelize);

        const userId = sessionUser.id;

        const favoriteSkillsRowOfUser = await UserFavoriteSkillModel.findOne({
            where: {
                userId
            }, raw: true
        });

        let allUserFavoriteSkills;

        if (favoriteSkillsRowOfUser.favorites) {
            const favoritesList = Array.isArray(favoriteSkillsRowOfUser.favorites) ? favoriteSkillsRowOfUser.favorites : [];

            allUserFavoriteSkills = await SkillModel.findAll({
                where: {
                    id: favoritesList
                },
                raw: true
            });
        } else {
            allUserFavoriteSkills = [];
        }

        return response.okJSONString(allUserFavoriteSkills);
    } catch (err) {
        return response.failJSONString();
    }
}

const skillsMicro_fetchUserSkillProgress = async function (requestData, response: GenericApiResponse, sessionUser) {
    const { sequelize } = diContext.container;
    try {
        const UserSkillStepProgressModel = UserSkillStepProgressModelIniter(sequelize, Sequelize);

        const { skillId } = requestData;
        const userId = sessionUser.id;

        const userSkillProgress = await UserSkillStepProgressModel.findAll({
            where: {
                skillId,
                userId
            }, raw: true
        });

        return response.okJSONString(userSkillProgress);
    } catch (err) {
        return response.failJSONString();
    }
}

const skillsMicro_fetchSkillTypes = async function (requestData, response: GenericApiResponse) {
    const { sequelize } = diContext.container;
    try {
        const SkillTypeModel = SkillTypeModelIniter(sequelize, Sequelize);

        const skillTypes = await SkillTypeModel.findAll({
            raw: true
        });

        return response.okJSONString(skillTypes);
    } catch (err) {
        return response.failJSONString();
    }
}

const skillsMicro_fetchSkillSteps = async function (requestData, response: GenericApiResponse, sessionUser) {
    const { sequelize } = diContext.container;
    try {
        const SkillStepModel = SkillStepModelIniter(sequelize, Sequelize);

        const { skillId } = requestData;

        const skillSteps = await SkillStepModel.findAll({
            where: {
                skillId
            },
            raw: true
        });

        return response.okJSONString(skillSteps);
    } catch (err) {
        return response.failJSONString();
    }
}

const skillsMicro_fetchSkillStepsResources = async function (requestData, response: GenericApiResponse, sessionUser) {
    const { sequelize } = diContext.container;
    try {
        const SkilStepResourceModel = SkilStepResourceModelIniter(sequelize, Sequelize);

        const { skillId } = requestData;
        const { languageOptions } = sessionUser;

        const skillStepResources = await SkilStepResourceModel.findAll({
            where: {
                skillId,
                languageId: {
                    [Op.in]: languageOptions.prefferedLanguages
                }
            },
            raw: true
        });

        return response.okJSONString(skillStepResources);
    } catch (err) {
        return response.failJSONString();
    }
}

const skillsMicro_updateFavoriteSkills = async function (requestData, response: GenericApiResponse, sessionUser) {
    const { sequelize } = diContext.container;
    try {
        const UserFavoriteSkillModel = UserFavoriteSkillModelIniter(sequelize, Sequelize);

        const { skillId, isFavorite } = requestData;
        const userId = sessionUser.id;

        let [userFavoriteSkillRow, isCreated] = await UserFavoriteSkillModel.findOrCreate({
            where: {
                userId
            }
        });

        const nSkillId = Number(skillId);
        let arrayToUpdate: Array<number>;

        if (userFavoriteSkillRow.favorites) {
            if (!Array.isArray(userFavoriteSkillRow.favorites)) {
                // TODO(tayfun): log here...
                userFavoriteSkillRow.favorites = [];
            }
            arrayToUpdate = [...userFavoriteSkillRow.favorites];
            if (isFavorite) {
                if (arrayToUpdate.indexOf(nSkillId) === -1) {
                    arrayToUpdate.push(nSkillId);
                }
            } else {
                arrayToUpdate = arrayToUpdate.filter(pSkillId => pSkillId !== nSkillId);
            }
        } else {
            if (!Array.isArray(userFavoriteSkillRow.favorites)) {
                arrayToUpdate = [];
            }
            arrayToUpdate.push(skillId);
        }

        userFavoriteSkillRow.favorites = arrayToUpdate;
        userFavoriteSkillRow.save();

        return response.okJSONString(null);
    } catch (err) {
        console.log(err);
        return response.failJSONString();
    }
}

const skillsMicro_updateUserSkillStepProgress = async function (requestData, response: GenericApiResponse, sessionUser) {
    const { sequelize } = diContext.container;
    try {
        const UserSkillStepProgressModel = UserSkillStepProgressModelIniter(sequelize, Sequelize);

        const { skillId, skillStepId, newFlag } = requestData;
        const userId = sessionUser.id;
        const nSkillId = Number(skillId);
        const nSkillStepId = Number(skillStepId);

        const [userSkillProgress, isCreated] = await UserSkillStepProgressModel.findOrCreate({
            where: {
                userId,
                skillId: nSkillId
            }
        });

        const { progress } = userSkillProgress;
        const progressToUpdate = progress || JSON.parse(JSON.stringify({}));

        userSkillProgress.progress = {
            ...progressToUpdate,
            [`skill_${nSkillId}`]: {
                ...(progressToUpdate[`skill_${nSkillId}`]),
                [nSkillStepId]: newFlag
            }
        };

        userSkillProgress.save();

        return response.okJSONString(userSkillProgress);
    } catch (err) {
        return response.failJSONString();
    }
}

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
        const queue = SKILLS_RPC_QUEUE;

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
            if (command === "FETCH_ALL_SKILLS") {
                responseDataHolder.data = await skillsMicro_fetchAllSkills(data, response);
            } else if (command === "FETCH_ALL_FAVORITE_SKILLS") {
                responseDataHolder.data = await skillsMicro_fetchFavoriteSkills(data, response, sessionUser);
            } else if (command === "FETCH_USER_SKILL_PROGRESS") {
                responseDataHolder.data = await skillsMicro_fetchUserSkillProgress(data, response, sessionUser);
            } else if (command === "FETCH_SKILL_TYPES") {
                responseDataHolder.data = await skillsMicro_fetchSkillTypes(data, response);
            } else if (command === "FETCH_SKILL_STEPS") {
                responseDataHolder.data = await skillsMicro_fetchSkillSteps(data, response, sessionUser);
            } else if (command === "FETCH_SKILL_STEP_RESOURCES") {
                responseDataHolder.data = await skillsMicro_fetchSkillStepsResources(data, response, sessionUser);
            } else if (command === "UPDATE_FAVORITE_SKILLS") {
                responseDataHolder.data = await skillsMicro_updateFavoriteSkills(data, response, sessionUser);
            } else if (command === "UPDATE_USER_SKILL_STEP_PROGRESS") {
                responseDataHolder.data = await skillsMicro_updateUserSkillStepProgress(data, response, sessionUser);
            } else {
                responseDataHolder.data = response.failJSONString();
            }
            //------
            channel.sendToQueue(msg.properties.replyTo, Buffer.from(responseDataHolder.data), {
                correlationId: msg.properties.correlationId
            });

            channel.ack(msg);
        });
    });
});

initializeDI();