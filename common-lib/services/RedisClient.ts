/////////////////////////////////////////////////
// Singleton for Redis cache database client.
//
// @file: redisClient.js
// @author: Anurag Bhandari
/////////////////////////////////////////////////

import redis from "redis";

type SetFunction = {
    (key: string, value: string, cb: Function)
}

type GetFunction = {
    (key: string, cb: Function)
}

type SetExFunction = {
    (key: string, time: number, value: any)
}

type ExpireAtFunction = {
    (key: string, time: number)
}

export type IRedisClient = {
    set: SetFunction,
    get: GetFunction;
    setex: SetExFunction;
    expireat: ExpireAtFunction;
}

const redisClient = (function () {
    // Start with a fake client so that we have a client that works
    // even when Redis server is down
    let client: IRedisClient = {
        set: function (key: string, value: string, cb: Function) {
            // Do nothing in particular
        },
        get: function (key: string, cb: Function) {
            cb(null, null);
        },
        setex: function (key, time, value) {
            // Do nothing in particular
        },
        expireat: function (key, time) {
            // Do nothing in particular
        },
    };

    // Attempt to create a new instance of an actual redis client
    const connectionString = process.env.REDIS_URL || "redis://localhost:6379";
    const redisCli = redis.createClient(connectionString, {
        retry_strategy: function (options) {
            if (options.error.code === "ECONNREFUSED") {
                // This will suppress the ECONNREFUSED unhandled exception
                // that results in app crash
                return;
            }
        },
    });

    // Set the "client" variable to the actual redis client instance
    // once a connection is established with the Redis server
    redisCli.on("ready", function () {
        client = redisCli;
    });

    redisCli.on("error", function (err) {
        console.log("Redis error encountered", err);
    });

    redisCli.on("end", function () {
        console.log("Redis connection closed");
    });

    /**
     * Get a redis client
     * @return {Object} client - eventually a proper redis client object (if redis is up) or a fake client object (if redis is down)
     */
    const getClient = function (): IRedisClient {
        return client;
    };

    return {
        getClient: getClient,
    };
})();

export default redisClient;
