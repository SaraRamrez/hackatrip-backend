import getPool from '../../db/getPool.js';

const selectRatedCoordinadorModel = async () => {
    const pool = await getPool();

    const [coordinadores] = await pool.query(
        `
        SELECT 
            username, avatar, AVG(cv.value) as media
        FROM users u
        LEFT JOIN coordinadorviajes c ON c.userId = u.id
        LEFT JOIN coordinadorvotes cv ON c.viajeId = cv.viajeId
        WHERE cv.coordinadorId = u.id
        GROUP BY u.id
        `,
    );

    return coordinadores;
};

export default selectRatedCoordinadorModel;
