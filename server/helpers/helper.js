const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const maxAge = 24 * 60 * 60;

const createJWT = (id) => jwt.sign({ id }, JWT_SECRET, {
  expiresIn: maxAge, // in token expiration, calculate by second
});

module.exports = { createJWT, maxAge };
