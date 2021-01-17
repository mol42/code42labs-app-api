const nodemailer = require("nodemailer");

let globalTransporter;
const gmailFrom = "code42labsapp.emailer@gmail.com";

export type IEmailService = {
    init(transporter: any): void;
    sendEmail(to: string, subject: string, html: string): void;
    sendEmailWithAttachment(to: string, subject: string, html: string, attachments: Array<any>): void;
}

class EmailService {
    init(transporter: any) {
        if (transporter) {
            globalTransporter = transporter;
        } else {
            // USE GMAIL ON LOCAL..
            globalTransporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: gmailFrom,
                    pass: "___PASS_HERE___"
                }
            });
        }
    }

    sendEmail(to: string, subject: string, html: string) {
        if (!globalTransporter) {
            this.init(null);
        }
        const mailOptions = {
            from: gmailFrom, // sender address
            to, // list of receivers
            subject, // Subject line
            html, // body
        };

        globalTransporter.sendMail(mailOptions, function (err, info) {
            if (err) console.log(err);
            else console.log(info);
        });
    }

    sendEmailWithAttachment(to: string, subject: string, html: string, attachments: Array<any>) {
        if (!globalTransporter) {
            this.init(null);
        }
        const mailOptions = {
            from: gmailFrom, // sender address
            to, // list of receivers
            subject, // Subject line
            html, // body
            attachments
        };

        globalTransporter.sendMail(mailOptions, function (err, info) {
            if (err) console.log(err);
            else console.log(info);
        });
    }
}

export default EmailService;
