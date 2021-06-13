const { register, login } = require('./users.controller');
const { checkToken } = require('../../auth/tokenValidation');

module.exports = (app) => {
  app.post('/register', register);
  app.post('/login', login);
}