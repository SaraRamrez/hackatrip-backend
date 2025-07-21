import getPool from '../../db/getPool.js';

const selectPostsModel = async () => {
    const pool = await getPool();

    const [posts] = await pool.query(
        `SELECT
            value, title, description, name AS photo, userId, viajeId, u.username, u.avatar, v.destino, vp.createdAt
        FROM viajesposts vp
        LEFT JOIN users u ON u.id = vp.userId
        LEFT JOIN viajes v ON v.id = vp.viajeId`,
    );

    return posts;
};

export default selectPostsModel;
