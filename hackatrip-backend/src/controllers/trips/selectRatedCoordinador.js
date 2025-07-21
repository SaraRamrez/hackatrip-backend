import selectRatedCoordinadorModel from '../../models/trips/selectRatedCoordinadorModel.js';

const selectRatedCoordinador = async (req, res, next) => {
    try {

        const coordinadores = await selectRatedCoordinadorModel();

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

export default selectRatedCoordinador;