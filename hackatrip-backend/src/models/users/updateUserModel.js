import getPool from '../../db/getPool.js';

import bcrypt from 'bcrypt';

import {
    userAlreadyRegisteredError,
    emailAlreadyRegisteredError,
} from '../../services/errorService.js';

const updateUserModel = async (
    username = '',
    email = '',
    password = '',
    userId = '',
) => {
    const pool = await getPool();

    let [user] = await pool.query(`SELECT id FROM users WHERE username = ?`, [
        username,
    ]);

    if (user.length > 0) {
        userAlreadyRegisteredError();
    }

    if (username) {
        await pool.query(`UPDATE users SET username = ? WHERE id = ?`, [
            username,
            userId,
        ]);
    }

    [user] = await pool.query(`SELECT id FROM users WHERE email = ?`, [email]);

    if (user.length > 0) {
        emailAlreadyRegisteredError();
    }

    if (email) {
        await pool.query(`UPDATE users SET email = ? WHERE id = ?`, [
            email,
            userId,
        ]);
    }

    const hashedPass = await bcrypt.hash(password, 10);

    if (password) {
        await pool.query(`UPDATE users SET password = ? WHERE id = ?`, [
            hashedPass,
            userId,
        ]);
    }
};

export default updateUserModel;
