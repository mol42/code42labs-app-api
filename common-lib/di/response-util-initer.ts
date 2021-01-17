import ResponseUtil from "../util/response-util";
// import Bottle type
import Bottle from 'bottlejs';

export type IResponseUtil = {
    sendJSON(res, jsonAsString: string): void;
    sendHTMLString(res, htmlString: string): void;
}

export function initer(bottle: Bottle) {
    bottle.service("responseUtil", ResponseUtil);
};