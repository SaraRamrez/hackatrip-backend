import bcrypt from 'bcrypt';

import getPool from '../../db/getPool.js';

import selectUserByEmailModel from './selectUserByEmailModel.js';

import { recoveryCodeError } from '../../services/errorService.js';

const updateUserPassModel = async (email, recoverPassCode, newPass) => {
    const pool = await getPool();

    const user = await selectUserByEmailModel(email);

    if (!user || user.recoverPassCode !== recoverPassCode) {
        recoveryCodeError();
    }

    const hashedPass = await bcrypt.hash(newPass, 10);

    await pool.query(
        `UPDATE users SET password = ?, recoverPassCode = null WHERE recoverPassCode = ?`,
        [hashedPass, recoverPassCode],
    );
};

export default updateUserPassModel;
