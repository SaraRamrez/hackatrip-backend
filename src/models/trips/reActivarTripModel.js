import getPool from '../../db/getPool.js';

import sendMailUtil from '../../utils/sendMailUtil.js';

const reActivarTripModel = async (viajeId) => {
    const pool = await getPool();

    await pool.query(`UPDATE viajes SET activo = ? WHERE id = ?`, [1, viajeId]);

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

    const [viaje] = await pool.query(
        `
            SELECT
                v.titulo
            FROM viajes v
            WHERE id = ?
        `,
        [viajeId],
    );

    const [coordinador] = await pool.query(
        `
            SELECT
                u.id,
                u.email
            FROM users u
            LEFT JOIN coordinadorviajes cv ON cv.userId = u.id
            WHERE u.id = cv.userId AND cv.viajeId = ?
        `,
        [viajeId],
    );

    const emailSubject = 'Viaje activo';

    const emailBody = `
            Hemos decidido activar de nuevo el viaje ${viaje[0].titulo} al que estás apuntado, pronto confirmaremos el viaje y os mandaremos más detalles.

            Hack a Trip.
        `;

    const emailBodyCoordinador = `
            Hemos decidido activar de nuevo el viaje ${viaje[0].titulo} al que estás apuntado como coordinador, pronto confirmaremos el viaje y te mandaremos más detalles.

            Hack a Trip.
        `;

    for (let i = 0; i < inscritos.length; i++) {
        await sendMailUtil(inscritos[i].email, emailSubject, emailBody);
    }

    for (let i = 0; i < coordinador.length; i++) {
        await sendMailUtil(
            coordinador[i].email,
            emailSubject,
            emailBodyCoordinador,
        );
    }
};

export default reActivarTripModel;
