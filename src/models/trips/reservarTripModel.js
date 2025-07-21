import getPool from '../../db/getPool.js';

import { cantJoinTrip } from '../../services/errorService.js';

import confirmarTripModel from './confirmarTripModel.js';

import sendMailUtil from '../../utils/sendMailUtil.js';

const reservarTripModel = async (userId, viajeId) => {
    const pool = await getPool();

    const [userApuntado] = await pool.query(
        `SELECT userId FROM viajesreservados WHERE userId = ? AND viajeId = ?`,
        [userId, viajeId],
    );

    const [plazasMin] = await pool.query(
        `SELECT plazasMinimas FROM viajes WHERE id = ?`,
        [viajeId],
    );

    if (userApuntado[0]) {
        cantJoinTrip();
    }

    await pool.query(
        `INSERT into viajesreservados (userId, viajeId) VALUES (?, ?)`,
        [userId, viajeId],
    );

    const [inscritos] = await pool.query(
        `
        SELECT 
            email, username, avatar
        FROM users u
        LEFT JOIN viajesreservados r ON r.userId = u.id
        WHERE r.viajeId = ?
        `,
        [viajeId],
    );

    if (plazasMin[0].plazasMinimas === inscritos.length) {
        confirmarTripModel(viajeId);
    }

    const [viaje] = await pool.query(
        `
            SELECT
                v.titulo
            FROM viajes v
            WHERE id = ?
        `,
        [viajeId],
    );

    const [user] = await pool.query(
        `
            SELECT
                u.id,
                u.email
            FROM users u
            WHERE id = ?
        `,
        [userId],
    );

    const emailSubject = 'Viaje reservado';

    const emailBody = `
            ¡Has reservado el viaje ${viaje[0].titulo}, gracias por confiar en nosotros!

            Saludos, Hack a Trip.
        `;

    await sendMailUtil(user[0].email, emailSubject, emailBody);
};

export default reservarTripModel;
