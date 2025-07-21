import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';

const getOwnUserController = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const user = await selectUserByIdModel(userId);

        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getOwnUserController;
