import getPool from '../../db/getPool.js';

import { unauthorizedUserError } from '../../services/errorService.js';

const selectConfirmedTripsModel = async (role, userId) => {
    const pool = await getPool();

    if (role === 'admin') {
        const [viajes] = await pool.query(
            `
            SELECT 
                id, titulo, descripcion, destino, fechaDeInicio, fechaDeFin, plazasMinimas, plazasMaximas, itinerario, precio, grupoDeEdad, activo, confirmado, imagen, createdAt, modifiedAt
            FROM viajes
            WHERE confirmado = ?
            `,
            [1],
        );

        return viajes;
    } else if (role === 'coordinador') {
        const [viajes] = await pool.query(
            `
            SELECT 
                v.id, v.titulo, v.descripcion, v.destino, v.fechaDeInicio, v.fechaDeFin, v.plazasMinimas, v.plazasMaximas, v.itinerario, v.precio, v.grupoDeEdad, v.activo, v.confirmado, v.imagen, v.createdAt, v.modifiedAt
            FROM viajes v
            LEFT JOIN coordinadorviajes r ON r.viajeId = v.id
            LEFT JOIN coordinadorviajes vr ON r.viajeId = vr.viajeId
            WHERE v.confirmado LIKE ? AND vr.userId LIKE ?
            `,
            [1, userId],
        );

        return viajes;
    } else {
        unauthorizedUserError();
    }
};

export default selectConfirmedTripsModel;
