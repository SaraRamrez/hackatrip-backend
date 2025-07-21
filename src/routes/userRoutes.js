import express from 'express';

import {
    newUserController,
    validateUserController,
    loginUserController,
    sendRecoverPassController,
    editUserPassController,
    editUserRoleController,
    editUserController,
    editUserAvatarController,
    getOwnUserController,
    getAllUsersController,
} from '../controllers/users/index.js';

import {
    authAdminController,
    authUserController,
} from '../middlewares/index.js';

const router = express.Router();

router.post('/users/register', newUserController);

router.put('/users/validate/:registrationCode', validateUserController);

router.post('/users/login', loginUserController);

router.get('/users', authUserController, getOwnUserController);

router.get(
    '/allusers',
    authUserController,
    authAdminController,
    getAllUsersController,
);

router.post('/users/password/recover', sendRecoverPassController);

router.put('/users/password/edit', editUserPassController);

router.put('/users/edit', authUserController, editUserController);

router.put('/users/avatar/edit', authUserController, editUserAvatarController);

router.put(
    '/users/role/:userId',
    authUserController,
    authAdminController,
    editUserRoleController,
);

export default router;
