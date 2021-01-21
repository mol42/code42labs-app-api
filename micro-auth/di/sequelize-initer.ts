import SequelizeFactory from "../../common-lib/db/sequelize-factory";

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
