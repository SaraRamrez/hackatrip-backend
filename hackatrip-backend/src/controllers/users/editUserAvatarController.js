import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';
import updateUserAvatarModel from '../../models/users/updateUserAvatarModel.js';

import { deletePhoto, savePhoto } from '../../services/photoService.js';

import validateSchemaUtil from '../../utils/validateSchemaUtil.js';

import editUserAvatarSchema from '../../schemas/users/editUserAvatarSchema.js';


const editUserAvatarController = async (req, res, next) => {
    try {

        await validateSchemaUtil(editUserAvatarSchema, req.files || {});

        const user = await selectUserByIdModel(req.user.id);

        if (user.avatar) {
            await deletePhoto(user.avatar);
        }

        const avatarName = await savePhoto(req.files, 150);

        await updateUserAvatarModel(avatarName, req.user.id);

        
        res.send({
            status: 'ok',
            message: 'Avatar actualizado',
            data: {
                avatar: {
                    name: avatarName,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default editUserAvatarController;
