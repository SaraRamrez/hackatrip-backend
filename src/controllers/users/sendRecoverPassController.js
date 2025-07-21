import randomstring from 'randomstring';

import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';

import updateRecoverPassModel from '../../models/users/updateRecoverPassModel.js';

import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

import sendRecoverPassSchema from '../../schemas/users/sendRecoverPassSchema.js';

import { notFoundError } from '../../services/errorService.js';

const sendRecoverPassController = async (req, res, next) => {
    try {
        const { email } = req.body;

        await validateSchemaUtil(sendRecoverPassSchema, req.body);

        const user = await selectUserByEmailModel(email);

        if (!user) {
            notFoundError('user');
        }

        const recoverPassCode = randomstring.generate(10);

        await updateRecoverPassModel(email, recoverPassCode);

        res.send({
            status: 'ok',
            message: 'Recuperacion de contraseña enviada al email',
        });
    } catch (err) {
        next(err);
    }
};

export default sendRecoverPassController;
