import getPool from '../../db/getPool.js';

import sendMailUtil from '../../utils/sendMailUtil.js';

const insertCoordinadorConfirmadoModel = async (userId, viajeId) => {
    const pool = await getPool();

    await pool.query(
        `UPDATE coordinadorviajes SET confirmado = ? WHERE userId = ? AND viajeId = ?`,
        [1, userId, viajeId],
    );

    const [viaje] = await pool.query(
        `
            SELECT
                v.titulo
            FROM viajes v
            WHERE id = ?
        `,
        [viajeId],
    );

    const [inscritos] = await pool.query(
        `
            SELECT
                u.id,
                u.email
            FROM users u
            LEFT JOIN viajesreservados r ON r.userId = u.id
            WHERE u.id = r.userId AND r.viajeId = ?
        `,
        [viajeId],
    );

    const emailSubject = 'Coordinador confirmado';

    const emailBody = `
            ¡Hemos confirmado un coordinador para el viaje ${viaje[0].titulo} en el que estás apuntado, pronto os enviaremos más detalles!
        `;

    for (let i = 0; i < inscritos.length; i++) {
        await sendMailUtil(inscritos[i].email, emailSubject, emailBody);
    }

    const [coordinador] = await pool.query(
        `
            SELECT
                u.id,
                u.email
            FROM users u
            LEFT JOIN coordinadorviajes cv ON cv.userId = u.id
            WHERE u.id = cv.userId AND cv.viajeId = ? AND confirmado = 1
        `,
        [viajeId],
    );

    const emailSubjectForCoordinador = 'Confirmado como coordinador';

    const emailBodyForCoordinador = `
            ¡Felicidades, te hemos confirmado como coordinador para el viaje ${viaje[0].titulo}!

            El siguiente paso es que hagas la reserva del viaje en la propia página del viaje.

            ¡Gracias por colaborar con nosotros!
        `;

    await sendMailUtil(
        coordinador[0].email,
        emailSubjectForCoordinador,
        emailBodyForCoordinador,
    );
};

export default insertCoordinadorConfirmadoModel;
