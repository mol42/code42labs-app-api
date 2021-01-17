import Bottle from "bottlejs";
import DiHelper from "../../../common-lib/di/di-helper";
import { initer as responseUtilIniter, IResponseUtil } from "../../../common-lib/di/response-util-initer";
import { initer as mqClientServiceIniter, IMQClientService } from "../../../common-lib/di/mq-client-initer";

export type DiContext = {
    bottle: Bottle,
    container: {
        responseUtil: IResponseUtil,
        mqClientService: IMQClientService
    }
}

export const diContext: DiContext = {
    bottle: null,
    container: null
};

export function initializeDI() {
    const initializers = [responseUtilIniter, mqClientServiceIniter];
    DiHelper.initContext(diContext, initializers);
}
