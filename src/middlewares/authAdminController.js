import { unauthorizedUserError } from '../services/errorService.js';

const authAdminController = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            unauthorizedUserError();
        }

        next();
    } catch (err) {
        next(err);
    }
};

export default authAdminController;
