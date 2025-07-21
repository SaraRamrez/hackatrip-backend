import updateUserModel from '../../models/users/updateUserModel.js';

import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';

import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

import editUserSchema from '../../schemas/users/editUserSchema.js';

const editUserController = async (req, res, next) => {
    try {
        await validateSchemaUtil(editUserSchema, req.body);

        let { username, email, password } = req.body;

        const user = await selectUserByIdModel(req.user.id);

        username = username === user.username ? null : username;
        email = email === user.email ? null : email;

        console.log(password);

        await updateUserModel(username, email, password, req.user.id);

        res.send({
            status: 'ok',
            message: 'Usuario actualizado',
            data: {
                user: {
                    username,
                    email,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default editUserController;
