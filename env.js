import 'dotenv/config';

const {
    PORT,
    UPLOADS_DIR,
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASS,
    MYSQL_DB,
    ADMIN_EMAIL,
    ADMIN_USERNAME,
    ADMIN_PASSWORD,
    ADMIN_ROLE,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    CLIENT_URL,
    SECRET,
} = process.env;

export {
    PORT,
    UPLOADS_DIR,
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASS,
    MYSQL_DB,
    ADMIN_EMAIL,
    ADMIN_USERNAME,
    ADMIN_PASSWORD,
    ADMIN_ROLE,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    CLIENT_URL,
    SECRET,
};
