import { diContext } from "../di";
const SKILLS_RPC_QUEUE = "C42_SKILLS_RPC_QUEUE";

const SkillsController = {
    fetchAllSkills: null,
    fetchAllFavoriteSkills: null,
    updateFavoriteSkills: null,
    fetchSkillSteps: null,
    fetchSkillStepResources: null,
    fetchUserSkillStepProgress: null,
    updateUserSkillProgress: null
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

SkillsController.updateFavoriteSkills = controllerHelperService.controller(async function (req, res, sessionUser) {
    const { mqClientService, responseUtil } = diContainer;
    const { skillId, isFavorite } = req.body;

    const resultAsJsonString = await mqClientService.callRPCQueue(
        SKILLS_RPC_QUEUE,
        JSON.stringify({ command: "UPDATE_FAVORITE_SKILLS", data: { skillId, isFavorite }, sessionUser })
    );
    responseUtil.sendJSON(res, resultAsJsonString);
});

SkillsController.fetchSkillSteps = controllerHelperService.controller(async function (req, res, sessionUser) {
    const { mqClientService, responseUtil } = diContainer;
    const { skillId } = req.params;

    const resultAsJsonString = await mqClientService.callRPCQueue(
        SKILLS_RPC_QUEUE,
        JSON.stringify({ command: "FETCH_SKILL_STEPS", data: { skillId }, sessionUser })
    );
    responseUtil.sendJSON(res, resultAsJsonString);
});

SkillsController.fetchSkillStepResources = controllerHelperService.controller(async function (req, res, sessionUser) {
    const { mqClientService, responseUtil } = diContainer;
    const { skillId, skillStepId } = req.params;

    const resultAsJsonString = await mqClientService.callRPCQueue(
        SKILLS_RPC_QUEUE,
        JSON.stringify({ command: "FETCH_SKILL_STEP_RESOURCES", data: { skillId, skillStepId }, sessionUser })
    );
    responseUtil.sendJSON(res, resultAsJsonString);
});

SkillsController.fetchUserSkillStepProgress = controllerHelperService.controller(async function (req, res, sessionUser) {
    const { mqClientService, responseUtil } = diContainer;
    const { skillId, skillStepId } = req.params;

    const resultAsJsonString = await mqClientService.callRPCQueue(
        SKILLS_RPC_QUEUE,
        JSON.stringify({ command: "FETCH_USER_SKILL_STEP_PROGRESS", data: { skillId, skillStepId }, sessionUser })
    );
    responseUtil.sendJSON(res, resultAsJsonString);
});

SkillsController.updateUserSkillProgress = controllerHelperService.controller(async function (req, res, sessionUser) {
    const { mqClientService, responseUtil } = diContainer;
    const { skillId } = req.params;
    const { skillStepId, isCompleted } = req.body;

    const resultAsJsonString = await mqClientService.callRPCQueue(
        SKILLS_RPC_QUEUE,
        JSON.stringify({ command: "UPDATE_USER_SKILL_STEP_PROGRESS", data: { skillId, skillStepId, isCompleted }, sessionUser })
    );
    responseUtil.sendJSON(res, resultAsJsonString);
});

export default SkillsController;
