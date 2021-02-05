
import Bottle from "bottlejs";
import { Sequelize } from "sequelize";
import DiHelper from "../../common-lib/di/di-helper";
import { initer as SequelizeIniter } from "./sequelize-initer";
// import { initer as EmailService, IEmailService } from "../../common-lib/di/email-service-initer";
// import { initer as CacheService, ICacheService } from "../../common-lib/di/cache-service-initer";

export type DiContext = {
    bottle: Bottle,
    container: {
        sequelize: Sequelize
    }
}

export const diContext: DiContext = {
    bottle: null,
    container: null
};

export function initializeDI() {
    // api-gateway projesinde kullanilan ve DI icine kaydetmek istedigimiz
    // servislerin initer'larini import edip biz dizi haline getiriyoruz.
    // NOT: initer metodlari common-lib icinden cekebilecegimiz gibi
    // her mikroservise ozel bir initer yazip onu da ekleyebiliriz.
    // orn : SequelizeIniter
    const initializers = [SequelizeIniter];
    // DiHelper yardimi ile api-gateway icinde kullandigimiz DiContext
    // objesini bottlejs ile dolduruyoruz ve ayrica initer metodlari
    // calistirip ilgilendigimiz servislerin dependency injection icine
    // kaydolmasini sagliyoruz.
    DiHelper.initContext(diContext, initializers);
}
