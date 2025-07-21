import filterTripModel from '../../models/trips/filterTripModel.js';

const filterTripController = async (req, res, next) => {
    try {
        let { fecha, destino, grupoDeEdad } = req.query;

        const viajesFiltrados = await filterTripModel(
            fecha,
            destino,
            grupoDeEdad,
            req.user?.id,
        );

        res.send({
            status: 'ok',
            data: {
                viajesFiltrados,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default filterTripController;
