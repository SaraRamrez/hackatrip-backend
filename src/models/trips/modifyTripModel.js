import getPool from '../../db/getPool.js';

const modifyTripModel = async (
    titulo,
    descripcion,
    destino,
    fechaDeInicio,
    fechaDeFin,
    plazasMinimas,
    plazasMaximas,
    itinerario,
    lat,
    lng,
    precio,
    grupoDeEdad,
    activo,
    photoName,
    viajeId,
) => {
    const pool = await getPool();

    // Verifica y actualiza los items en la base de datos.

    if (titulo) {
        await pool.query(`UPDATE viajes SET titulo = ? WHERE id = ?`, [
            titulo,
            viajeId,
        ]);
    }

    if (descripcion) {
        await pool.query(`UPDATE viajes SET descripcion = ? WHERE id = ?`, [
            descripcion,
            viajeId,
        ]);
    }

    if (destino) {
        await pool.query(`UPDATE viajes SET destino = ? WHERE id = ?`, [
            destino,
            viajeId,
        ]);
    }

    if (fechaDeInicio) {
        await pool.query(`UPDATE viajes SET fechaDeInicio = ? WHERE id = ?`, [
            fechaDeInicio,
            viajeId,
        ]);
    }

    if (fechaDeFin) {
        await pool.query(`UPDATE viajes SET fechaDeFin = ? WHERE id = ?`, [
            fechaDeFin,
            viajeId,
        ]);
    }

    if (plazasMinimas) {
        await pool.query(`UPDATE viajes SET plazasMinimas = ? WHERE id = ?`, [
            plazasMinimas,
            viajeId,
        ]);
    }

    if (plazasMaximas) {
        await pool.query(`UPDATE viajes SET plazasMaximas = ? WHERE id = ?`, [
            plazasMaximas,
            viajeId,
        ]);
    }

    if (itinerario) {
        await pool.query(`UPDATE viajes SET itinerario = ? WHERE id = ?`, [
            itinerario,
            viajeId,
        ]);
    }

    if (lat) {
        await pool.query(`UPDATE viajes SET lat = ? WHERE id = ?`, [
            lat,
            viajeId,
        ]);
    }

    if (lng) {
        await pool.query(`UPDATE viajes SET lng = ? WHERE id = ?`, [
            lng,
            viajeId,
        ]);
    }

    if (precio) {
        await pool.query(`UPDATE viajes SET precio = ? WHERE id = ?`, [
            precio,
            viajeId,
        ]);
    }

    if (grupoDeEdad) {
        await pool.query(`UPDATE viajes SET grupoDeEdad = ? WHERE id = ?`, [
            grupoDeEdad,
            viajeId,
        ]);
    }

    if (activo) {
        await pool.query(`UPDATE viajes SET activo = ? WHERE id = ?`, [
            activo,
            viajeId,
        ]);
    }

    if (photoName) {
        await pool.query(`UPDATE viajes SET imagen = ? WHERE id = ?`, [
            photoName,
            viajeId,
        ]);
    }
};

export default modifyTripModel;
