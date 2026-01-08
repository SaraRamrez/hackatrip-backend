import getPool from '../src/db/getPool.js';

const main = async () => {
  const pool = await getPool();
  const [rows] = await pool.query('SELECT id, titulo, destino, imagen, activo, confirmado, createdAt FROM viajes ORDER BY createdAt DESC LIMIT 20');
  console.log(rows);
  process.exit(0);
};

main().catch(err => { console.error(err); process.exit(1); });
