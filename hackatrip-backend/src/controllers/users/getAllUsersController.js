import selectUsersModel from '../../models/users/selectUsersModel.js';

const getAllUsersController = async (req, res, next) => {
    try {
        const users = await selectUsersModel();

        res.send({
            status: 'ok',
            data: {
                users,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getAllUsersController;
