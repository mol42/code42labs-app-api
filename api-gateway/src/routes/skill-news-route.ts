import express from "express";
import SkillNewsController from "../controllers/skill-news-controller";

const router = express.Router();

router.get('/favorites/all', function (req, res, next) {
    SkillNewsController.fetchAllFavoriteSkillNews(req, res);
});

module.exports = router;