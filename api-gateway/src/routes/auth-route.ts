import express from "express";
import AuthorizationController from "../controllers/auth-controller";

const router = express.Router();

router.post('/login', function (req, res, next) {
    AuthorizationController.login(req, res);
});

router.post('/logout', function (req, res, next) {
    AuthorizationController.logout(req, res);
});

router.post('/signUp', function (req, res, next) {
    AuthorizationController.signUp(req, res);
});

router.get('/activate/:requestId', function (req, res, next) {
    AuthorizationController.activate(req, res);
});

router.post('/request/reset-password', function (req, res, next) {
    AuthorizationController.resetPassword(req, res);
});

router.post('/update/password', function (req, res, next) {
    AuthorizationController.updatePassword(req, res);
});

///
router.post('/update/theme', function (req, res, next) {
    AuthorizationController.updateTheme(req, res);
});

router.post('/update/language', function (req, res, next) {
    AuthorizationController.updateLanguage(req, res);
});

module.exports = router;