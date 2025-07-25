const validateSchemaUtil = async (schema, body) => {
    try {
        await schema.validateAsync(body);
    } catch (err) {
        err.httpStatus = 400;
        err.code = 'MISSING_FIELDS';
        throw err;
    }
};

export default validateSchemaUtil;
