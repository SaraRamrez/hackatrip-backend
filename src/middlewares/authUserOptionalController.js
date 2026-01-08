import jwt from 'jsonwebtoken';

import { invalidCredentialsError } from '../services/errorService.js';

const authUserOptionalController = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        // Solo intentamos verificar si llega cabecera y no es la cadena 'null'
        if (authorization && authorization !== 'null') {
            let tokenInfo;

            try {
                tokenInfo = jwt.verify(authorization, process.env.SECRET);
            } catch (err) {
                console.log(err);
                invalidCredentialsError();
            }

            req.user = tokenInfo;
        }

        next();
    } catch (err) {
        next(err);
    }
};

export default authUserOptionalController;
