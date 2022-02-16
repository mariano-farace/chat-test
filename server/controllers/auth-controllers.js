const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../config');

const maxAge = 24 * 60 * 60;

const createJWT = (id) => jwt.sign({ id }, JWT_SECRET, {
  expiresIn: maxAge, // in token expiration, calculate by second
});

// we use it for Error handling
const alertError = (err) => {
  const errors = { name: '', email: '', password: '' };
  console.log('err message', err.message);
  console.log('err code', err.code);

  if (err.message === 'Incorrect email') {
    errors.email = 'This email not found!';
  }
  if (err.message === 'Incorrect password') {
    errors.password = 'The password is incorrect!';
  }
  if (err.code === 11000) {
    errors.email = 'This email already registered';
    return errors;
  }
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  // TODO falta sanitizar, en este momento se pueden ingresar espacios al final y nada lo controla
  return errors;
};

module.exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    // eslint-disable-next-line no-underscore-dangle
    const token = createJWT(user._id);

    // create a cookie name as jwt and contain token and expire after 1 day
    // in cookies, expiration date calculate by milisecond
    // como es el sign-up, el token se crea sin verificar nada
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user });
  } catch (error) {
    const errors = alertError(error);
    res.status(400).json({ errors });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    // eslint-disable-next-line no-underscore-dangle
    const token = createJWT(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user });
  } catch (error) {
    const errors = alertError(error);
    res.status(400).json({ errors });
  }
};
// TODO logout de google auth!!!!!
module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: -1 });
  res.cookie('google-auth-cookie', '', { maxAge: -1 });
  res.status(200).json({ logout: true });
};
