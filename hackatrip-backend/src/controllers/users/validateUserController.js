import updateUserRegCodeModel from '../../models/users/updateUserRegCodeModel.js';

const validateUserController = async (req, res, next) => {
    try {
        const { registrationCode } = req.params;

        await updateUserRegCodeModel(registrationCode);

        res.send({
            status: 'ok',
            message: 'Usuario activo',
        });
    } catch (err) {
        next(err);
    }
};

export default validateUserController;
