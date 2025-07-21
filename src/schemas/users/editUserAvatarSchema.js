import joi from 'joi';

import imgSchema from '../imgSchema.js';

import joiErrorMessages from '../joiErrorMessages.js';

const editUserAvatarSchema = joi.object({
    photo: imgSchema.required().messages(joiErrorMessages),
});

export default editUserAvatarSchema;
