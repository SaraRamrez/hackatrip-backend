import getPool from '../../db/getPool.js';

const selectCoordinadorModel = async (viajeId) => {
    const pool = await getPool();

    const [coordinador] = await pool.query(
        `
        SELECT 
            username, avatar, c.confirmado
        FROM users u
        LEFT JOIN coordinadorviajes c ON c.userId = u.id
        LEFT JOIN coordinadorvotes cv ON c.viajeId = cv.viajeId
        WHERE c.viajeId = ? AND c.confirmado = 1
        `,
        [viajeId],
    );

    return coordinador[0];
};

export default selectCoordinadorModel;
