import insertCoordinadorConfirmadoModel from '../../models/trips/insertCoordinadorConfirmadoModel.js';

const confirmarCoordinadorController = async (req, res, next) => {
    try {
        const { userId, viajeId } = req.params;

        await insertCoordinadorConfirmadoModel(userId, viajeId);

        res.status(201).send({
            status: 'ok',
            message: 'Coordinador confirmado',
        });
    } catch (err) {
        next(err);
    }
};

export default confirmarCoordinadorController;
