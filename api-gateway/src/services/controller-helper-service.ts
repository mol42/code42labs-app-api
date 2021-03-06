import GenericApiResponse from "../../../common-lib/models/generic-api-response";
import jwt from "jsonwebtoken";
const jwtKey = "c42_sec_key";

class ControllerHelperService {
    controller(controller) {

        return function (req, res) {
            const jwtToken = req.headers["x-auth-token"];
            let sessionUser;

            if (!jwtToken || jwtToken == "null" || typeof jwtToken === "undefined") {
                res.json(new GenericApiResponse().failJSON("ERR_19999"));
                return;
            }

            try {
                sessionUser = jwt.verify(jwtToken, jwtKey);
            } catch (e) {

                if (e instanceof jwt.JsonWebTokenError) {
                    res.json(new GenericApiResponse().failJSON("ERR_19999"));
                    return;
                }

                res.json(new GenericApiResponse().failJSON("ERR_19999"));
                return;
            }

            console.log("sessionUser", sessionUser);

            controller(req, res, sessionUser);
        };
    }
}

export default ControllerHelperService;
