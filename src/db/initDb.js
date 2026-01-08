import getPool from './getPool.js';
import {
    ADMIN_EMAIL,
    ADMIN_USERNAME,
    ADMIN_PASSWORD,
    ADMIN_ROLE,
} from '../../env.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const createTables = async () => {
    try {
        const hashedPass = await bcrypt.hash(ADMIN_PASSWORD, 10);
        const id = crypto.randomUUID();

        const pool = getPool();

        console.log('Dropping tables...');
        
        // Desactivar restricciones de claves foráneas
        await pool.query('SET FOREIGN_KEY_CHECKS=0;');
        
        // Eliminar todas las tablas
        await pool.query('DROP TABLE IF EXISTS coordinadorvotes;');
        await pool.query('DROP TABLE IF EXISTS viajesposts;');
        await pool.query('DROP TABLE IF EXISTS viajesphotos;');
        await pool.query('DROP TABLE IF EXISTS viajesreservados;');
        await pool.query('DROP TABLE IF EXISTS coordinadorviajes;');
        await pool.query('DROP TABLE IF EXISTS viajes;');
        await pool.query('DROP TABLE IF EXISTS users;');
        
        // Reactivar restricciones de claves foráneas
        await pool.query('SET FOREIGN_KEY_CHECKS=1;');

        console.log('Creating tables...');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id VARCHAR(100) PRIMARY KEY,
                email VARCHAR(100) UNIQUE NOT NULL,
                username VARCHAR(30) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100),
                active BOOLEAN DEFAULT false,
                role VARCHAR(20) DEFAULT 'normal',
                registrationCode CHAR(30),
                recoverPassCode CHAR(10),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                modifiedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await pool.query(
            `INSERT INTO users (id, email, username, password, role, active) VALUES (?, ?, ?, ?, ?, ?)`,
            [id, ADMIN_EMAIL, ADMIN_USERNAME, hashedPass, ADMIN_ROLE, true]
        );

        await pool.query(`
            CREATE TABLE IF NOT EXISTS viajes (
                id VARCHAR(100) PRIMARY KEY,
                titulo VARCHAR(100) NOT NULL,
                descripcion TEXT NOT NULL,
                destino VARCHAR(50) NOT NULL,
                fechaDeInicio DATE NOT NULL,
                fechaDeFin DATE NOT NULL,
                plazasMinimas INT NOT NULL,
                plazasMaximas INT NOT NULL,
                itinerario TEXT NOT NULL,
                lat FLOAT NOT NULL,
                lng FLOAT NOT NULL,
                precio INT NOT NULL,
                grupoDeEdad VARCHAR(10) NOT NULL,
                activo BOOLEAN NOT NULL,
                confirmado BOOLEAN NOT NULL,
                imagen VARCHAR(100) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                modifiedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS coordinadorviajes (
                id SERIAL PRIMARY KEY,
                userId VARCHAR(100) NOT NULL,
                viajeId VARCHAR(100) NOT NULL,
                confirmado BOOLEAN,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (viajeId) REFERENCES viajes(id)
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS viajesreservados (
                id SERIAL PRIMARY KEY,
                userId VARCHAR(100) NOT NULL,
                viajeId VARCHAR(100) NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (viajeId) REFERENCES viajes(id)
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS viajesphotos (
                id SERIAL PRIMARY KEY,
                photo VARCHAR(100) NOT NULL,
                viajeId VARCHAR(100) NOT NULL,
                FOREIGN KEY (viajeId) REFERENCES viajes(id),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS viajesposts (
                id SERIAL PRIMARY KEY,
                value SMALLINT NOT NULL,
                title VARCHAR(50) NOT NULL,
                description VARCHAR(250) NOT NULL,
                name VARCHAR(50) NOT NULL,
                userId VARCHAR(100) NOT NULL,
                viajeId VARCHAR(100) NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (viajeId) REFERENCES viajes(id),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS coordinadorvotes (
                id SERIAL PRIMARY KEY,
                value SMALLINT NOT NULL,
                coordinadorId VARCHAR(100) NOT NULL,
                viajeId VARCHAR(100) NOT NULL,
                userId VARCHAR(100) NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (viajeId) REFERENCES viajes(id)
            );
        `);

        console.log('Tables created!');

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

createTables();
