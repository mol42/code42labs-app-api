// DB INITIALIZATION
import ControllerHelperService from "../services/controller-helper-service";

export type IControllerHelperService = {
    controller: Function
}

export function initer(bottle) {
    bottle.service("controllerHelperService", ControllerHelperService);
}
