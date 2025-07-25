import mysql from 'mysql2/promise';

import { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } from '../../env.js';

let pool;

const getPool = async () => {

    try {
        if (!pool) {
            const tempPool = await mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
            });
            
            await tempPool.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`);
            console.log(pool);

            pool = await mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB,
                timezone: 'Z',
            });
        }

        return pool;
    } catch (err) {
        console.error(err);
    }
};

export default getPool;
