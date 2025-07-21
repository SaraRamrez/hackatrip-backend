export const notFoundError = (resource) => {
    throw {
        httpStatus: 404, // Not Found
        code: 'RESOURCE_NOT_FOUND',
        message: `El recurso requerido '${resource}' no existe`,
    };
};

export const userAlreadyRegisteredError = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'USER_ALREADY_REGISTERED',
        message: 'Este nombre de usuario ya está registrado',
    };
};

export const emailAlreadyRegisteredError = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'EMAIL_ALREADY_REGISTERED',
        message: 'Este email ya está registrado',
    };
};

export const sendEmailError = () => {
    throw {
        httpStatus: 500, // Internal server error
        code: 'SEND_EMAIL_FAILED',
        message: 'Error al enviar email',
    };
};

export const invalidCredentialsError = () => {
    throw {
        httpStatus: 401, // Unauthorized
        code: 'INVALID_CREDENTIALS',
        message: 'Credenciales inválidas',
    };
};

export const pendingActivationError = () => {
    throw {
        httpStatus: 403, // Forbidden
        code: 'PENDING_ACTIVATION',
        message:
            'Usuario pendiente de activar. Por favor, verifica tu cuenta antes de continuar.',
    };
};

export const recoveryCodeError = () => {
    throw {
        httpStatus: 401, // Unauthorized
        code: 'INVALID_RECOVERY_CODE',
        message: 'Código de recuperación incorrecto',
    };
};

export const notAuthenticatedError = () => {
    throw {
        httpStatus: 401, // Unauthorized
        code: 'NOT_AUTHENTICATED',
        message: `Debes enviar un token en el header 'Authorization'`,
    };
};

export const invalidTokenError = () => {
    throw {
        httpStatus: 401, // Unauthorized
        code: 'INVALID_TOKEN',
        message: 'Tienes que hacer login',
    };
};

export const deleteFileError = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'FILE_DELETED_FAILED',
        message: 'Error al eliminar el archivo del disco',
    };
};

export const saveFileError = () => {
    throw {
        httpStatus: 500, // Internal Server Error
        code: 'FILE_SAVE_FAILED',
        message: 'Error al guardar el archivo en el disco',
    };
};

export const unauthorizedUserError = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'UNAUTHORIZED',
        message: 'El usuario no está autorizado para hacer esta operación',
    };
};

export const cantAddPost = () => {
    throw {
        httpStatus: 403, // Conflict
        code: 'CANNOT_ADD_POST',
        message:
            'No está permitido añadir un post a un viaje que no has participado',
    };
};

export const cantAddPostAgain = () => {
    throw {
        httpStatus: 403, // Conflict
        code: 'CANNOT_ADD_POST',
        message: 'No puedes añadir un post sobre este viaje de nuevo',
    };
};

export const cantVoteCoordinador = () => {
    throw {
        httpStatus: 403, // Conflict
        code: 'CANNOT_VOTE_COORDINADOR',
        message:
            'No está permitido votar a un coordinador de un viaje en el que no has participado',
    };
};

export const cantVoteCoordinadorAgain = () => {
    throw {
        httpStatus: 403, // Conflict
        code: 'CANNOT_VOTE_COORDINADOR',
        message: 'No puedes votar a un coordinador de nuevo',
    };
};

export const cantBeCoordinador = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'CANNOT_BE_COORDINADOR',
        message: 'Ya estás apuntado como coordinador en este viaje',
    };
};

export const cantJoinTrip = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'CANNOT_JOIN_TRIP',
        message: 'Ya estás apuntado en este viaje',
    };
};
