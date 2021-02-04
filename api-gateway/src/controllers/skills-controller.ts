import { diContext } from "../di";
const SKILLS_RPC_QUEUE = "C42_SKILLS_RPC_QUEUE";

const SkillsController = {
    fetchAllSkills: null,
    fetchAllFavoriteSkills: null,
    addOrRemoveSkillToFavorites: null
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

SkillsController.fetchAllFavoriteSkills = controllerHelperService.controller(async function (req, res, sessionUser) {
    const { mqClientService, responseUtil } = diContainer;

    const resultAsJsonString = await mqClientService.callRPCQueue(
        SKILLS_RPC_QUEUE,
        JSON.stringify({ command: "FETCH_ALL_FAVORITE_SKILLS", data: {}, sessionUser })
    );
    responseUtil.sendJSON(res, resultAsJsonString);
});

SkillsController.addOrRemoveSkillToFavorites = controllerHelperService.controller(async function (req, res, sessionUser) {
    const { mqClientService, responseUtil } = diContainer;
    const { skillId, isFavorite } = req.body;

    console.log("sessionUser", sessionUser);

    const resultAsJsonString = await mqClientService.callRPCQueue(
        SKILLS_RPC_QUEUE,
        JSON.stringify({ command: "ADD_OR_REMOVE_SKILL_TO_FAVORITES", data: { skillId, isFavorite }, sessionUser })
    );
    responseUtil.sendJSON(res, resultAsJsonString);
});

export default SkillsController;
