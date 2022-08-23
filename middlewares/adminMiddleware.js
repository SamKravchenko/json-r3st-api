const errorHandlers = require('../helpers/ErrorHandlers');
require('dotenv').config();

module.exports = (req, res, next) => {
  const auth = req.headers?.authorization;
  if (!auth) {
    return errorHandlers.unauthorized(res, 'Authentication is required');
  }
  let decoded = '';
  if (Buffer.from(auth, 'base64').toString('base64') === auth) {
    decoded = Buffer.from(auth, 'base64').toString();
  } else {
    decoded = auth;
  }
  const [login, password] = decoded.split(':');
  const condition =
    login !== process.env.ADMIN_LOGIN ||
    password !== process.env.ADMIN_PASSWORD;
  if (condition) {
    return errorHandlers.unauthorized(res, 'Authentication failed');
  }
  next();
};
