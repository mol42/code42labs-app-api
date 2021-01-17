// initialize dotenv
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });

import { initializeDI, diContext } from "./di";
import GenericApiResponse from "../common-lib/models/generic-api-response";
const amqp = require("amqplib/callback_api");

/*
 **********************************************************************
 */
const MQ_CONN_STR = `amqp://${process.env.MQ_USER}:${process.env.MQ_PASS}@${process.env.MQ_HOST}?heartbeat=10`;

console.log("MQ_CONN_STR", MQ_CONN_STR);

amqp.connect(MQ_CONN_STR, function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        const queue = "C42_AUTH_RPC_QUEUE";

        channel.assertQueue(queue, {
            durable: false
        });
        channel.prefetch(1);
        console.log(" [x] Awaiting RPC requests");
        channel.consume(queue, async function reply(msg) {
            //-----
            const authCommandDataJSON = msg.content.toString();
            console.log("incoming command", authCommandDataJSON);
            const authCommandData = JSON.parse(authCommandDataJSON);
            const responseDataHolder = { data: null };
            const { command, data, sessionUser } = authCommandData;
            const response = new GenericApiResponse();
            //------
            responseDataHolder.data = response.failJSONString();
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

