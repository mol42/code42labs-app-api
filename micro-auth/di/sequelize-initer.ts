// DB INITIALIZATION
import { Sequelize } from "sequelize";
import SequelizeFactory from "../../common-lib/db/sequelize-factory";
// model imports here
// import UserModelIniter, { IUserModel } from "../../common-lib/models/usermodel";

export function initer(bottle) {
    bottle.provider("sequelize", function () {
        // this is the service factory.
        this.$get = function (container) {
            const { MYSQL_DATABASE, MYSQL_USER, MYSQL_PASS, MYSQL_HOST } = process.env;
            const sequelize = new SequelizeFactory().init(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASS, MYSQL_HOST);

            return sequelize;
        };
    });
};
