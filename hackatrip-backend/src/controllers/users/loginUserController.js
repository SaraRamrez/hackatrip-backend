import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';

import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

import loginUserSchema from '../../schemas/users/loginUserSchema.js';

import {
    invalidCredentialsError,
    pendingActivationError,
} from '../../services/errorService.js';

import { SECRET } from '../../../env.js';

const loginUserController = async (req, res, next) => {
    try {
        await validateSchemaUtil(loginUserSchema, req.body);

        const { email, password } = req.body;

        const user = await selectUserByEmailModel(email);

        let validPass;

        if (user) {
            validPass = await bcrypt.compare(password, user.password);
        }

        if (!user || !validPass) {
            invalidCredentialsError();
        }

        if (!user.active) {
            pendingActivationError();
        }

        const tokenInfo = {
            id: user.id,
            role: user.role,
        };

        const token = jwt.sign(tokenInfo, SECRET, {
            expiresIn: '7d',
        });

        res.status(201).send({
            status: 'ok',
            message: 'Login correcto',
            data: {
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default loginUserController;
