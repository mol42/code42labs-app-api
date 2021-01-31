// initialize dotenv
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });

import { initializeDI, diContext } from "./di";
import GenericApiResponse from "../common-lib/models/generic-api-response";
import amqp from "amqplib/callback_api";
import { Op, Sequelize } from "sequelize";
import ERR_CONS from "../common-lib/config/error-constants";
import UserModelIniter from "../common-lib/models/usermodel";
//-----

const SKILLS_RPC_QUEUE = "C42_SKILLS_RPC_QUEUE";
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
            if (command === "AUTH_LOGIN") {

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

