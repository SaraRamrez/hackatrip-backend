import selectConfirmedTripsModel from '../../models/trips/selectConfirmedTripsModel.js';

const confirmedTripsController = async (req, res, next) => {
    try {
        const viajes = await selectConfirmedTripsModel(
            req.user.role,
            req.user.id,
        );

        res.send({
            status: 'ok',
            data: {
                viajes,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default confirmedTripsController;
