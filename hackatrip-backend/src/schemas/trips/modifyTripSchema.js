import joi from 'joi';

import imgSchema from '../imgSchema.js';

import joiErrorMessages from '../joiErrorMessages.js';

const newTripSchema = joi.object({
    titulo: joi.string().min(5).max(100).optional().messages(joiErrorMessages),
    destino: joi.string().min(2).max(50).optional().messages(joiErrorMessages),
    fechaDeInicio: joi.date().optional().messages(joiErrorMessages),
    fechaDeFin: joi.date().optional().messages(joiErrorMessages),
    plazasMinimas: joi.number().optional().messages(joiErrorMessages),
    plazasMaximas: joi.number().optional().messages(joiErrorMessages),
    itinerario: joi
        .string()
        .min(3)
        .max(10000)
        .optional()
        .messages(joiErrorMessages),
    lat: joi.number().required().messages(joiErrorMessages),
    lng: joi.number().required().messages(joiErrorMessages),
    precio: joi.number().optional().messages(joiErrorMessages),
    grupoDeEdad: joi
        .string()
        .min(3)
        .max(10)
        .optional()
        .messages(joiErrorMessages),
    descripcion: joi
        .string()
        .min(10)
        .max(100000)
        .optional()
        .messages(joiErrorMessages),
    activo: joi.number().optional().messages(joiErrorMessages),
    photo: imgSchema.optional(),
});

export default newTripSchema;
