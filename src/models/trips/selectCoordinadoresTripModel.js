import getPool from '../../db/getPool.js';

const selectCoordinadoresTripModel = async (viajeId) => {
    const pool = await getPool();

    const [coordinadores] = await pool.query(
        `
        SELECT 
            u.id, username, avatar
        FROM users u
        LEFT JOIN coordinadorviajes c ON c.userId = u.id
        LEFT JOIN coordinadorvotes cv ON c.viajeId = cv.viajeId
        WHERE c.viajeId = ?
        GROUP BY u.id
        `,
        [viajeId],
    );

    return coordinadores;
};

export default selectCoordinadoresTripModel;
