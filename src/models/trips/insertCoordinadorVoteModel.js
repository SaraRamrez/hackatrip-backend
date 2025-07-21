import getPool from '../../db/getPool.js';

import {
    cantVoteCoordinador,
    cantVoteCoordinadorAgain,
} from '../../services/errorService.js';

const insertCoordinadorVoteModel = async (value, viajeId, userId) => {
    const pool = await getPool();

    let [user] = await pool.query(
        `SELECT userId FROM viajesreservados WHERE userId = ? AND viajeId = ?`,
        [userId, viajeId],
    );

    if (!user[0]) {
        cantVoteCoordinador();
    }

    const [coordinadorId] = await pool.query(
        `SELECT userId, confirmado FROM coordinadorviajes WHERE viajeId = ?`,
        [viajeId],
    );

    [user] = await pool.query(
        `SELECT userId FROM coordinadorvotes WHERE viajeId = ? AND userId = ?`,
        [viajeId, userId],
    );

    if (user[0]) {
        cantVoteCoordinadorAgain();
    }

    for (let i = 0; i < coordinadorId.length; i++) {
        if (coordinadorId[i].confirmado) {
            await pool.query(
                `INSERT INTO coordinadorvotes (value, coordinadorId, viajeId, userId) VALUES (?, ?, ?, ?)`,
                [value, coordinadorId[i].userId, viajeId, userId],
            );

            const [votesAvg] = await pool.query(
                `SELECT AVG(value) AS avg FROM coordinadorvotes WHERE coordinadorId = ?`,
                [coordinadorId[i].userId],
            );

            return Number(votesAvg[0].avg);
        }
    }
};

export default insertCoordinadorVoteModel;
