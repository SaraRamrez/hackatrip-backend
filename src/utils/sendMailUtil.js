import nodemailer from 'nodemailer';

import { sendEmailError } from '../services/errorService.js';

import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } from '../../env.js';

const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});

const sendMailUtil = async (email, subject, body) => {
    try {
        const mailOptions = {
            from: SMTP_USER,
            to: email,
            subject,
            text: body,
        };

        await transport.sendMail(mailOptions);
    } catch (err) {
        console.error(err);
        sendEmailError();
    }
};

export default sendMailUtil;
