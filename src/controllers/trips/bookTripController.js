import reservarTripModel from '../../models/trips/reservarTripModel.js';

const bookTripController = async (req, res, next) => {
    try {
        const { viajeId } = req.params;

        await reservarTripModel(req.user.id, viajeId);

        res.status(201).send({
            status: 'ok',
            message: 'Viaje reservado',
        });
    } catch (err) {
        next(err);
    }
};

export default bookTripController;
