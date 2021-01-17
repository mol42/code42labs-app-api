import redisClient, { IRedisClient } from "./RedisClient";

type GetFunction = {
    (key: string, doParse: boolean): Promise<any>
}

type SetFunction = {
    (key: string, valueAsString: string, timeout: number): Promise<any>
}

type CalcTimeoutFunction = {
    (timeStr: string): number;
}

export type ICacheService = {
    get: GetFunction,
    set: SetFunction,
    calcTimeout: CalcTimeoutFunction
}

class CacheService {
    get(key: string, doParse: boolean = false): Promise<any> {
        return new Promise((resolve, reject) => {
            const client = redisClient.getClient();

            client.get(key, function (err, reply) {
                if (err) {
                    reject();
                } else {
                    resolve(reply);
                }
            });
        });
    }

    set(key: string, valueAsString: string, timeout: number) {
        return new Promise((resolve, reject) => {
            const client: IRedisClient = redisClient.getClient();

            client.set(key, valueAsString, function (err, reply) {
                if (err) {
                    reject();
                } else {
                    timeout && client.expireat(key, timeout);

                    resolve(reply);
                }
            });
        });
    }

    calcTimeout(timeStr) {
        if (timeStr === "HOUR") {
            return 60 * 60 * 1000;
        } else if (timeStr === "HALF_DAY") {
            return 12 * 60 * 60 * 1000;
        }
        throw "NO_TIMEOUT_KEY_FOUND";
    }
}

export default CacheService;
