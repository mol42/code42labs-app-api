import express from "express";
import SkillsController from "../controllers/skills-controller";

const router = express.Router();

router.get('/all', function (req, res, next) {
    SkillsController.fetchAllSkills(req, res);
});

router.get('/favorites/all', function (req, res, next) {
    SkillsController.fetchAllFavoriteSkills(req, res);
});

router.post('/favorites/update', function (req, res, next) {
    SkillsController.updateFavoriteSkills(req, res);
});

router.get('/:skillId/steps/all', function (req, res, next) {
    SkillsController.fetchSkillSteps(req, res);
});

router.get('/:skillId/steps/:skillStepId/resources/all', function (req, res, next) {
    SkillsController.fetchSkillStepResources(req, res);
});

router.get('/:skillId/progress/all', function (req, res, next) {
    SkillsController.fetchUserSkillProgress(req, res);
});

router.post('/:skillId/progress/update', function (req, res, next) {
    SkillsController.updateUserSkillProgress(req, res);
});

module.exports = router;