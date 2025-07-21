import insertCoordinadorVoteModel from '../../models/trips/insertCoordinadorVoteModel.js';

import validateSchema from '../../utils/validateSchemaUtil.js';

import voteCoordinadorSchema from '../../schemas/trips/voteCoordinadorSchema.js';

const voteCoordinadorController = async (req, res, next) => {
    try {
        await validateSchema(voteCoordinadorSchema, req.body);

        const { viajeId } = req.params;

        const { value } = req.body;

        const votesAvg = await insertCoordinadorVoteModel(
            value,
            viajeId,
            req.user.id,
        );

        console.log(votesAvg);

        res.status(201).send({
            status: 'ok',
            message: 'Coordinador Votado',
            data: {
                trip: {
                    votes: votesAvg,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default voteCoordinadorController;
