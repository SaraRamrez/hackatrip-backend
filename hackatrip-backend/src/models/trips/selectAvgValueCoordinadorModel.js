import getPool from '../../db/getPool.js';

const selectAvgValueCoordinadorModel = async (viajeId, userId = '') => {
    const pool = await getPool();

    const [avgValue] = await pool.query(
        `
            SELECT AVG(value) as media, BIT_OR(userId = ?) AS votedByMe
            FROM coordinadorvotes
            WHERE viajeId = ?
        `,
        [userId, viajeId],
    );

    return avgValue[0];
};

export default selectAvgValueCoordinadorModel;
