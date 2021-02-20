import { diContext } from "../di";
const SKILL_NEWS_RPC_QUEUE = "C42_SKILL_NEWS_RPC_QUEUE";

const SkillNewsController = {
    fetchAllFavoriteSkillNews: null
};
const diContainer = diContext.container;
const controllerHelperService = diContainer.controllerHelperService;

SkillNewsController.fetchAllFavoriteSkillNews = controllerHelperService.controller(async function (req, res, sessionUser) {
    const { mqClientService, responseUtil } = diContainer;

    const resultAsJsonString = await mqClientService.callRPCQueue(
        SKILL_NEWS_RPC_QUEUE,
        JSON.stringify({ command: "FETCH_ALL_FAVORITE_SKILL_NEWS", data: {}, sessionUser })
    );
    responseUtil.sendJSON(res, resultAsJsonString);
});

export default SkillNewsController;
