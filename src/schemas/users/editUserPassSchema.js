import joi from 'joi';

import joiErrorMessages from '../joiErrorMessages.js';

const editUserPassSchema = joi.object({
    email: joi.string().email().required().messages(joiErrorMessages),
    newPass: joi
        .string()
        .pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/,
        )
        .required()
        .messages(joiErrorMessages),
    recoverPassCode: joi.string().required().messages(joiErrorMessages),
});

export default editUserPassSchema;
