import joi from 'joi';

import joiErrorMessages from '../joiErrorMessages.js';

const editUserSchema = joi.object({
    username: joi.string().min(3).max(30).optional().messages(joiErrorMessages),
    email: joi.string().email().optional().messages(joiErrorMessages),
    password: joi
        .string()
        .pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/,
        )
        .optional()
        .messages(joiErrorMessages),
});

export default editUserSchema;
