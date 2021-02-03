import { diContext } from "../di";
import { v4 as uuidv4 } from "uuid";
const SKILLS_RPC_QUEUE = "C42_SKILLS_RPC_QUEUE";

const SkillsController = {
    fetchAllSkills: null
};
const diContainer = diContext.container;
const controllerHelperService = diContainer.controllerHelperService;

SkillsController.fetchAllSkills = controllerHelperService.controller(async function (req, res) {
    const { mqClientService, responseUtil } = diContainer;

    const resultAsJsonString = await mqClientService.callRPCQueue(
        SKILLS_RPC_QUEUE,
        // buradaki data yapisi tamamen bize ozel yani MQ sadece string bekliyor data olarak biz ise
        // bir JSON datasini string hale donusturup o sekilde gonderiyoruz boylece karsi taraf aldigi
        // zaman parse eder ve gonderdigimiz JS objesini okuyup islemini yapar.
        JSON.stringify({ command: "FETCH_ALL_SKILLS", data: {} })
    );
    responseUtil.sendJSON(res, resultAsJsonString);
});

export default SkillsController;
