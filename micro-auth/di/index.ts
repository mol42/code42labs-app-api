
import Bottle from "bottlejs";
import { Sequelize } from "sequelize";
import DiHelper from "../../common-lib/di/di-helper";
import { initer as SequelizeIniter } from "./sequelize-initer";
import { initer as EmailService, IEmailService } from "../../common-lib/di/email-service-initer";
import { initer as CacheService, ICacheService } from "../../common-lib/di/cache-service-initer";

export type DiContext = {
    bottle: Bottle,
    container: {
        sequelize: Sequelize,
        emailService: IEmailService,
        cacheService: ICacheService
    }
}

export const diContext: DiContext = {
    bottle: null,
    container: null
};

export function initializeDI() {
    const initializers = [SequelizeIniter, EmailService, CacheService];
    DiHelper.initContext(diContext, initializers);
}
