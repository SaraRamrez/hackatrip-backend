import getPool from '../../db/getPool.js';

const updateUserRoleModel = async (userId) => {
    const pool = await getPool();

    await pool.query(`UPDATE users SET role = ? WHERE id = ?`, [
        'coordinador',
        userId]);
};

export default updateUserRoleModel;
