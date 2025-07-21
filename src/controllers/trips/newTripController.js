import insertTripModel from '../../models/trips/insertTripModel.js';

import { savePhoto } from '../../services/photoService.js';

import validateSchema from '../../utils/validateSchemaUtil.js';

import newTripSchema from '../../schemas/trips/newTripSchema.js';

const newTripController = async (req, res, next) => {
    try {
        await validateSchema(newTripSchema, Object.assign(req.body, req.files));

        const {
            titulo,
            descripcion,
            destino,
            fechaDeInicio,
            fechaDeFin,
            plazasMinimas,
            plazasMaximas,
            itinerario,
            lat,
            lng,
            precio,
            grupoDeEdad,
            activo,
        } = req.body;

        const photoName = await savePhoto(req.files, 300);

        const id = crypto.randomUUID();

        await insertTripModel(
            id,
            titulo,
            descripcion,
            destino,
            fechaDeInicio,
            fechaDeFin,
            plazasMinimas,
            plazasMaximas,
            itinerario,
            precio,
            lat,
            lng,
            grupoDeEdad,
            activo,
            photoName,
            req.user.id,
        );

        res.status(201).send({
            status: 'ok',
            message: 'Viaje creado',
            data: {
                trip: {
                    titulo,
                    descripcion,
                    destino,
                    fechaDeInicio,
                    fechaDeFin,
                    plazasMinimas,
                    plazasMaximas,
                    itinerario,
                    lat,
                    lng,
                    precio,
                    grupoDeEdad,
                    userId: req.user.id,
                    photoName,
                    createdAt: new Date(),
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default newTripController;
