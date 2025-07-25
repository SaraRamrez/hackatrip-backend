import jwt from 'jsonwebtoken';

import { SECRET } from '../../env.js';

import {
    notAuthenticatedError,
    invalidTokenError,
} from '../services/errorService.js';

const authUserController = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            notAuthenticatedError();
        }

        let tokenInfo;

        try {
            tokenInfo = jwt.verify(authorization, SECRET);

            req.user = tokenInfo;

            next();
        } catch (err) {
            console.error(err);

            invalidTokenError();
        }
    } catch (err) {
        next(err);
    }
};

export default authUserController;
