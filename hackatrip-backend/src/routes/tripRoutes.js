import express from 'express';

import {
    newTripController,
    activateOrDesactivateTripController,
    coordinadorTripController,
    confirmarCoordinadorController,
    bookTripController,
    addPostController,
    voteCoordinadorController,
    filterTripController,
    userViewTripController,
    modifyTripController,
    confirmedTripsController,
    selectRatedCoordinador,
    coordinadoresTripController,
    getAllPostsController,
} from '../controllers/trips/index.js';

import {
    authUserController,
    authUserOptionalController,
    authAdminController,
} from '../middlewares/index.js';

const router = express.Router();

router.get('/todosviajes', authUserOptionalController, filterTripController);

router.get('/posts', authUserOptionalController, getAllPostsController);

router.get('/ratedcoordinadores', authUserController, selectRatedCoordinador);

router.get(
    '/todosviajesconfirmados',
    authUserController,
    confirmedTripsController,
);

router.post(
    '/viajes',
    authUserController,
    authAdminController,
    newTripController,
);

router.get(
    '/viajes/:viajeId',
    authUserOptionalController,
    userViewTripController,
);

router.get(
    '/:viajeId/coordinadores',
    authUserController,
    authAdminController,
    coordinadoresTripController,
);

router.post(
    '/viajes/:userId/:viajeId/confirmar',
    authUserController,
    authAdminController,
    confirmarCoordinadorController,
);

router.post(
    '/viajes/:viajeId',
    authUserController,
    authAdminController,
    activateOrDesactivateTripController,
);

router.post(
    '/viajes/:viajeId/reservarycancelar',
    authUserController,
    bookTripController,
);

router.post('/viajes/:viajeId/addpost', authUserController, addPostController);

router.post(
    '/viajes/:viajeId/coordinadorVotes',
    authUserController,
    voteCoordinadorController,
);

router.post(
    '/viajes/:viajeId/:coordinadorId',
    authUserController,
    coordinadorTripController,
);

router.put(
    '/viajes/:viajeId/modificarviaje',
    authUserController,
    authAdminController,
    modifyTripController,
);

export default router;
