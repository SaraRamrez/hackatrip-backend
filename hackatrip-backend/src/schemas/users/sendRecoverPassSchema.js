import joi from 'joi';

import joiErrorMessages from '../joiErrorMessages.js';

const sendRecoverPassSchema = joi.object({
    email: joi.string().email().required().messages(joiErrorMessages),
});

export default sendRecoverPassSchema;
