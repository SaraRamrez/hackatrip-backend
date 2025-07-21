import updateUserRoleModel from '../../models/users/updateUserRoleModel.js';

const editUserRoleController = async (req, res, next) => {
    try {
        const { userId } = req.params;

        await updateUserRoleModel(userId);

        res.send({
            status: 'ok',
            message: 'Usuario convertido a coordinador',
        });
    } catch (err) {
        next(err);
    }
};

export default editUserRoleController;
