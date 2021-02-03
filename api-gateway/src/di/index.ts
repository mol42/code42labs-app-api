import Bottle from "bottlejs";
import DiHelper from "../../../common-lib/di/di-helper";
import { initer as controllerHelperServiceIniter, IControllerHelperService } from "./controller-helper-service-initer";
import { initer as responseUtilIniter, IResponseUtil } from "../../../common-lib/di/response-util-initer";
import { initer as mqClientServiceIniter, IMQClientService } from "../../../common-lib/di/mq-client-initer";

export type DiContext = {
    bottle: Bottle,
    container: {
        responseUtil: IResponseUtil,
        mqClientService: IMQClientService,
        controllerHelperService: IControllerHelperService
    }
}

export const diContext: DiContext = {
    bottle: null,
    container: null
};

export function initializeDI() {
    // api-gateway projesinde kullanilan ve DI icine kaydetmek istedigimiz
    // servislerin initer'larini import edip biz dizi haline getiriyoruz.
    const initializers = [controllerHelperServiceIniter, responseUtilIniter, mqClientServiceIniter];
    // DiHelper yardimi ile api-gateway icinde kullandigimiz DiContext
    // objesini bottlejs ile dolduruyoruz ve ayrica initer metodlari
    // calistirip ilgilendigimiz servislerin dependency injection icine
    // kaydolmasini sagliyoruz.
    DiHelper.initContext(diContext, initializers);
}
