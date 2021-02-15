import { diContext } from "../di";
const AUTH_RPC_QUEUE = "C42_AUTH_RPC_QUEUE";

const AuthorizationController = {
    signUp: null,
    activate: null,
    login: null,
    logout: null,
    resetPassword: null,
    updatePassword: null,
    updateTheme: null
};
const diContainer = diContext.container;
const controllerHelperService = diContainer.controllerHelperService;

AuthorizationController.signUp = async function (req, res) {
    // Dependency Injection servisinden okuma yaparken eger talep ettigimiz
    // servis icin bir instance olusturulmamis ise BottleJS bir tane instance olusturur
    // ve onu doner ve tabi ki bundan sonraki her servis istegimizde daha onceden
    // olusturulmus servisi doner.
    const { mqClientService, responseUtil } = diContainer;
    // HTTP post ile gonderilmis datayi okuyup MQ tarafina gonderilecek data yapisinda
    // kullaniyoruz.
    const { firstName, lastName, email, password, referralCode } = req.body;
    const resultAsJsonString = await mqClientService.callRPCQueue(
        AUTH_RPC_QUEUE,
        // buradaki data yapisi tamamen bize ozel yani MQ sadece string bekliyor data olarak biz ise
        // bir JSON datasini string hale donusturup o sekilde gonderiyoruz boylece karsi taraf aldigi
        // zaman parse eder ve gonderdigimiz JS objesini okuyup islemini yapar.
        JSON.stringify({ command: "AUTH_SIGNUP", data: { firstName, lastName, email, password, referralCode } })
    );
    responseUtil.sendJSON(res, resultAsJsonString);
};

AuthorizationController.activate = async function (req, res) {
    const { mqClientService, responseUtil } = diContainer;
    const { requestId } = req.params;
    const resultAsString = await mqClientService.callRPCQueue(
        AUTH_RPC_QUEUE,
        JSON.stringify({ command: "AUTH_ACTIVATE", data: { requestId } })
    );
    responseUtil.sendHTMLString(res, resultAsString);
};

AuthorizationController.login = async function (req, res) {
    const { mqClientService, responseUtil } = diContainer;
    const { email, password, appVersion } = req.body;
    const resultAsJsonString = await mqClientService.callRPCQueue(
        AUTH_RPC_QUEUE,
        JSON.stringify({
            command: "AUTH_LOGIN",
            data: { email, password, appVersion }
        })
    );
    responseUtil.sendJSON(res, resultAsJsonString);
};

AuthorizationController.logout = function (req, res) { };

AuthorizationController.resetPassword = async function (req, res) {
    const { mqClientService, responseUtil } = diContainer;
    const { email } = req.body;
    const resultAsJsonString = await mqClientService.callRPCQueue(
        AUTH_RPC_QUEUE,
        JSON.stringify({ command: "AUTH_RESET_PASSWORD", data: { email } })
    );
    responseUtil.sendJSON(res, resultAsJsonString);
};

AuthorizationController.updatePassword = async function (req, res) {
    const { mqClientService, responseUtil } = diContainer;
    const { email, code, password } = req.body;
    const resultAsJsonString = await mqClientService.callRPCQueue(
        AUTH_RPC_QUEUE,
        JSON.stringify({ command: "AUTH_UPDATE_PASSWORD", data: { email, code, password } })
    );
    responseUtil.sendJSON(res, resultAsJsonString);
};

AuthorizationController.updateTheme = controllerHelperService.controller(async function (req, res, sessionUser) {
    const { mqClientService, responseUtil } = diContainer;
    const { theme } = req.body;
    const resultAsJsonString = await mqClientService.callRPCQueue(
        AUTH_RPC_QUEUE,
        JSON.stringify({ command: "PROFILE_UPDATE_THEME", data: { theme }, sessionUser })
    );
    responseUtil.sendJSON(res, resultAsJsonString);
});

export default AuthorizationController;
