import updateUserPassModel from '../../models/users/updateUserPassModel.js';

import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

import editUserPassSchema from '../../schemas/users/editUserPassSchema.js';

const editUserPassController = async (req, res, next) => {
    try {
        const { email, newPass, recoverPassCode } = req.body;

        await validateSchemaUtil(editUserPassSchema, req.body);

        await updateUserPassModel(email, recoverPassCode, newPass);

        res.send({
            status: 'ok',
            message: 'Contraseña actualizada',
        });
    } catch (err) {
        next(err);
    }
};

export default editUserPassController;