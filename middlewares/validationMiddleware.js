const { validationResult } = require('express-validator');
const errorHandlers = require('../helpers/ErrorHandlers');

module.exports = (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return errorHandlers.badRequest(res, {
        message: 'Invalid Request',
        errors: result.mapped(),
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
