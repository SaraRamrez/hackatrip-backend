import joi from 'joi';

import joiErrorMessages from '../joiErrorMessages.js';

const voteCoordinadorSchema = joi.object({
    value: joi
        .number()
        .integer()
        .min(1)
        .max(5)
        .required()
        .messages(joiErrorMessages),
});

export default voteCoordinadorSchema;
