import amqp from "amqplib/callback_api";

const AMPQ_GLOBAL = {
  connection: null,
  channel: null
};

const RESPONSE_HANDLERS = {};
const RESPONSE_QUEUE_NAME = `SGEEK_GLOBAL_RESPONSE_QUEUE_${process.env.RESPONSE_QUEUE_ID}`;

const MQConnectionStr = `amqp://${process.env.MQ_USER}:${process.env.MQ_PASS}@${process.env.MQ_HOST}?heartbeat=10`;

console.log("MQConnectionStr", MQConnectionStr);

function generateUuid() {
  return Math.random().toString() + Math.random().toString() + Math.random().toString();
}

class MQClientService {
  async init(): Promise<void> {
    if (!AMPQ_GLOBAL.connection) {
      await this.initConnection();
      await this.initQueueConsumer();
    }
  }

  async initConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (AMPQ_GLOBAL.connection) {
        resolve(AMPQ_GLOBAL.connection);
        return;
      }
      amqp.connect(MQConnectionStr, function (error0, connection) {
        if (error0) {
          console.log(error0);
          reject();
          return;
        }
        AMPQ_GLOBAL.connection = connection;
        resolve(connection);
      });
    });
  };

  async initQueueConsumer(): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log("initQueueConsumer AMPQ_GLOBAL.channel", AMPQ_GLOBAL.channel);
      if (AMPQ_GLOBAL.channel) {
        resolve(AMPQ_GLOBAL.channel);
        return;
      }
      AMPQ_GLOBAL.connection.createChannel(function (error1, channel) {
        if (error1) {
          console.log("messageQueueClient error1");
          console.log(error1);
          reject(error1);
          return;
        }
        //----
        channel.assertQueue(
          RESPONSE_QUEUE_NAME,
          {
            durable: false
          },
          function (error2, q) {
            if (error2) {
              console.log("messageQueueClient error2");
              console.log(error2);
              reject(error2);
              return;
            }

            console.log("q.queue", q.queue);

            channel.consume(
              RESPONSE_QUEUE_NAME,
              function (msg) {
                const { correlationId } = msg.properties;
                if (RESPONSE_HANDLERS[correlationId]) {
                  RESPONSE_HANDLERS[correlationId].resolve(msg.content.toString());
                  RESPONSE_HANDLERS[correlationId] = null;
                }
              },
              {
                noAck: true
              }
            );
          }
        );

        AMPQ_GLOBAL.channel = channel;
        resolve(channel);
      });
    });
  };

  async callRPCQueue(queueName, data): Promise<string> {
    //---
    return new Promise(async (resolve, reject): Promise<void> => {

      const correlationId = generateUuid();

      console.log(" [x] Requesting queueName, correlationId", queueName, correlationId);
      const strData = typeof data === "string" ? data : JSON.stringify(data);

      AMPQ_GLOBAL.channel.sendToQueue(queueName, Buffer.from(strData), {
        correlationId: correlationId,
        replyTo: RESPONSE_QUEUE_NAME
      });

      RESPONSE_HANDLERS[correlationId] = {
        resolve,
        reject
      };
    });
  };
}

export default MQClientService;
