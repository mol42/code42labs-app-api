import EmailService, { IEmailService as ref } from "../services/EmailService";
// import Bottle type
import Bottle from 'bottlejs';

export type IEmailService = ref;

export function initer(bottle: Bottle) {
    bottle.service("emailService", EmailService);
};