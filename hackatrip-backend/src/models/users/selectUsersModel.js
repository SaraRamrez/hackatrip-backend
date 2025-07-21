import getPool from '../../db/getPool.js';

const selectUsersModel = async () => {
    const pool = await getPool();

    const [users] = await pool.query(
        `SELECT id, username, avatar, role, email FROM users`,
    );

    return users;
};

export default selectUsersModel;
