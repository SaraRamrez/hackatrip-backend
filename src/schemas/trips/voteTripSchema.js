import joi from 'joi';

import imgSchema from '../imgSchema.js';

import joiErrorMessages from '../joiErrorMessages.js';

const voteTripSchema = joi.object({
    photo: imgSchema.required(),
    title: joi.string().min(3).max(50).required().messages(joiErrorMessages),
    description: joi
        .string()
        .min(5)
        .max(250)
        .required()
        .messages(joiErrorMessages),
    value: joi
        .number()
        .integer()
        .min(1)
        .max(5)
        .required()
        .messages(joiErrorMessages),
});

export default voteTripSchema;
