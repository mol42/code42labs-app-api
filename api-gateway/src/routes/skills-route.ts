import express from "express";
import SkillsController from "../controllers/skills-controller";

const router = express.Router();

router.get('/all', function (req, res, next) {
    SkillsController.fetchAllSkills(req, res);
});

router.get('/favorites/all', function (req, res, next) {
    SkillsController.fetchAllFavoriteSkills(req, res);
});

router.post('/favorites/add-or-remove', function (req, res, next) {
    SkillsController.addOrRemoveSkillToFavorites(req, res);
});

module.exports = router;