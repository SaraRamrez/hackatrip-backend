import joi from 'joi';

import joiErrorMessages from '../joiErrorMessages.js';

const editTripSchema = joi.object({
    desactivar: joi.bool().optional().messages(joiErrorMessages),
    reactivar: joi.bool().optional().messages(joiErrorMessages),
});

export default editTripSchema;
