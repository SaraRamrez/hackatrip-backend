import getPool from '../../db/getPool.js';

const selectInscritosModel = async (viajeId) => {
    const pool = await getPool();

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

    return inscritos;
};

export default selectInscritosModel;
