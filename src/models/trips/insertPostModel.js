import getPool from '../../db/getPool.js';

import { cantAddPost, cantAddPostAgain } from '../../services/errorService.js';

const insertPostModel = async (
    photoName,
    viajeId,
    userId,
    value,
    title,
    description,
) => {
    const pool = await getPool();

    let [user] = await pool.query(
        `            
        SELECT
            vr.userId
        FROM viajesreservados vr
        WHERE vr.userId = ? AND vr.viajeId = ?`,
        [userId, viajeId],
    );

    if (!user[0]) {
        cantAddPost();
    }

    [user] = await pool.query(
        `SELECT userId FROM viajesposts WHERE viajeId = ?`,
        [viajeId],
    );

    if (user[0]) {
        cantAddPostAgain();
    }

    const [post] = await pool.query(
        `INSERT INTO viajesposts (userId, viajeId, value, title, description, name) VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, viajeId, value, title, description, photoName],
    );

    return post.insertId;
};

export default insertPostModel;
