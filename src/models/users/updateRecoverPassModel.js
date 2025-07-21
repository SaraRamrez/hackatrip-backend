import getPool from '../../db/getPool.js';

import sendMailUtil from '../../utils/sendMailUtil.js';

const updateRecoverPassModel = async (email, recoverPassCode) => {
    const pool = await getPool();

    await pool.query(`UPDATE users SET recoverPassCode = ? WHERE email = ?`, [
        recoverPassCode,
        email,
    ]);

    const emailSubject = 'Recuperacion de contraseña';

    const emailBody = `
            Recuperacion contraseña solicitada para este email. 
                
            Usa el siguiente codigo para crear una nueva contraseña: ${recoverPassCode}

            Si no fuiste tu, ignora este correo.
        `;

    await sendMailUtil(email, emailSubject, emailBody);
};

export default updateRecoverPassModel;
