import desactivarTripModel from '../../models/trips/desactivarTripModel.js';

import reActivarTripModel from '../../models/trips/reActivarTripModel.js';

import validateSchema from '../../utils/validateSchemaUtil.js';

import editTripSchema from '../../schemas/trips/editTripSchema.js';

const activateOrDesactivateTripController = async (req, res, next) => {
    try {
        await validateSchema(editTripSchema, req.body);

        const { viajeId } = req.params;

        const { desactivar, reactivar } = req.body;

        if (desactivar) {
            await desactivarTripModel(viajeId);

            res.status(201).send({
                status: 'ok',
                message: 'Viaje desactivado',
            });
        } else if (reactivar) {
            await reActivarTripModel(viajeId);

            res.status(201).send({
                status: 'ok',
                message: 'Viaje reactivado',
            });
        }
    } catch (err) {
        next(err);
    }
};

export default activateOrDesactivateTripController;
