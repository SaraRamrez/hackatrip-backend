import insertPostModel from '../../models/trips/insertPostModel.js';

import { savePhoto } from '../../services/photoService.js';

import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

import voteTripSchema from '../../schemas/trips/voteTripSchema.js';

const addPostController = async (req, res, next) => {
    try {
        await validateSchemaUtil(
            voteTripSchema,
            Object.assign(req.files, req.body),
        );

        const { value, title, description } = req.body;

        const { viajeId } = req.params;

        const photo = req.files;

        const photoName = await savePhoto(photo, 1000);

        const postId = await insertPostModel(
            photoName,
            viajeId,
            req.user.id,
            value,
            title,
            description,
        );

        res.status(201).send({
            status: 'ok',
            message: 'Post subido',
            data: {
                post: {
                    id: postId,
                    photoName: photoName,
                    title: title,
                    description: description,
                    value: value,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default addPostController;
