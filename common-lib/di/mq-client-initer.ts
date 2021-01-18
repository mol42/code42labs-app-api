import MQClientService from "../services/mq-client-service";
// import Bottle type
import Bottle from 'bottlejs';

export type IMQClientService = {
  init(): Promise<void>,
  initConnection(): Promise<void>,
  initQueueConsumer(): Promise<void>,
  callRPCQueue(queueName, data): Promise<string>
}

export function initer(bottle: Bottle) {
  bottle.service("mqClientService", MQClientService);
};