import express from "express";
import SkillsController from "../controllers/skills-controller";

const router = express.Router();

router.get('/all', function (req, res, next) {
    SkillsController.fetchAllSkills(req, res);
});

module.exports = router;