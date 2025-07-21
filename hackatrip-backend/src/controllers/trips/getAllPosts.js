import selectPostsModel from '../../models/trips/selectPostsModel.js';

const getAllPostsController = async (req, res, next) => {
    try {
        const posts = await selectPostsModel();

        res.send({
            status: 'ok',
            data: {
                posts,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getAllPostsController;
