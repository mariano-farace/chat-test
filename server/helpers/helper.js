const jwt = require('jsonwebtoken');
const { JWT_SECRET, COOKIE_NAME } = require('../config');

const maxAge = 24 * 60 * 60;

const createJWT = (id) => jwt.sign({ id }, JWT_SECRET, {
  expiresIn: maxAge, // in token expiration, calculate by second
});

const setCookie = (token, res) => {
  res.cookie(COOKIE_NAME, token, { httpOnly: true, maxAge: maxAge * 1000 });
};

module.exports = { createJWT, maxAge, setCookie };
