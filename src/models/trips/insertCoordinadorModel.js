import getPool from '../../db/getPool.js';

import { cantBeCoordinador } from '../../services/errorService.js';

const insertCoordinadorModel = async (coordinadorId, viajeId, userId) => {
    const pool = await getPool();

    const [coordinador] = await pool.query(
        `SELECT userId FROM coordinadorviajes WHERE viajeId = ?`,
        [viajeId],
    );

    for (let i = 0; i < coordinador.length; i++) {
        if (coordinador[i].userId === userId) {
            cantBeCoordinador();
        }
    }

    await pool.query(
        `INSERT INTO coordinadorviajes (userId, viajeId) VALUES (?, ?)`,
        [coordinadorId, viajeId],
    );
};

export default insertCoordinadorModel;
