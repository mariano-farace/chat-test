const jwt = require('jsonwebtoken');
const User = require('../models/User');

const maxAge = 24 * 60 * 60;

const createJWT = (id) => jwt.sign({ id }, 'chatroom secret', {
  expiresIn: maxAge, // in token expiration, calculate by second
});

module.exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    // eslint-disable-next-line no-underscore-dangle
    const token = createJWT(user._id);

    // create a cookie name as jwt and contain token and expire after 1 day
    // in cookies, expiration date calculate by milisecond
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user });
  } catch (error) {
    // TODO implementear esta mierda
    // const errors = alertError(error);
    // res.status(400).json({ errors });
  }
};
