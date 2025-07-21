import selectCoordinadoresTripModel from '../../models/trips/selectCoordinadoresTripModel.js';

const coordinadoresTripController = async (req, res, next) => {
    try {
        const { viajeId } = req.params;

        const coordinadores = await selectCoordinadoresTripModel(viajeId);

        res.send({
            status: 'ok',
            data: {
                coordinadores,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default coordinadoresTripController;
