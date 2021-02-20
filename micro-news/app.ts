// initialize dotenv
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });

import { initializeDI, diContext } from "./di";
import GenericApiResponse from "../common-lib/models/generic-api-response";
import amqp from "amqplib/callback_api";
import { Op, Sequelize } from "sequelize";
// import ERR_CONS from "../common-lib/config/error-constants";
import SkillNewsModelIniter from "../common-lib/models/skillnewsmodel";
import UserFavoriteSkillModelIniter from "../common-lib/models/userfavoriteskillmodel";
//-----

const SKILL_NEWS_RPC_QUEUE = "C42_SKILL_NEWS_RPC_QUEUE";
const LANG_EN = 0;
const LANG_TR = 1;

const newsMicro_fetchAllFavoriteSkillNews = async function (requestData, sessionUser, response) {
    const { sequelize } = diContext.bottle.container;
    const SkillNewsModel = SkillNewsModelIniter(sequelize, Sequelize);
    const UserFavoriteSkillModel = UserFavoriteSkillModelIniter(sequelize, Sequelize);

    const {id: userId, languageOptions} = sessionUser;

    try {
        const favoriteSkillsRowOfUser = await UserFavoriteSkillModel.findOne({
            where: {
                userId
            }, raw: true
        });

        const allFavoriteSkillNews = await SkillNewsModel.findOne({
            where: {
                skillId : favoriteSkillsRowOfUser.favorites,
                // TODO(Tayfun)
                languageId: [LANG_EN, LANG_TR]
            }, raw: true
        });

        return response.okJSONString(allFavoriteSkillNews); 
    } catch(err) {
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
        const queue = SKILL_NEWS_RPC_QUEUE;

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
            if (command === "FETCH_ALL_FAVORITE_SKILL_NEWS") {
                responseDataHolder.data = await newsMicro_fetchAllFavoriteSkillNews(data, sessionUser, response);
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