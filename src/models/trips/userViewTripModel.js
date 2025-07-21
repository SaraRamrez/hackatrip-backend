import getPool from '../../db/getPool.js';

const userViewTripModel = async (viajeId, userId = '') => {
    const pool = await getPool();

    const [viajes] = await pool.query(
        ` 
        SELECT
            v.id,
            v.titulo,
            v.descripcion,
            v.destino,
            v.plazasMinimas,
            v.plazasMaximas,
            v.itinerario,
            v.lat,
            v.lng,
            v.imagen,
            v.fechaDeInicio,
            v.fechaDeFin,
            v.precio,
            v.grupoDeEdad,
            v.activo,
            v.confirmado,
            COUNT(r.viajeId) AS numeroReservas,
            BIT_OR(vr.userId = ?) AS reservedByMe
        from viajes v
        LEFT JOIN viajesreservados r ON r.viajeId = v.id
        LEFT JOIN viajesreservados vr ON r.viajeId = vr.viajeId
        WHERE v.id = ?
       `,
        [userId, viajeId],
    );

    return viajes;
};

export default userViewTripModel;
