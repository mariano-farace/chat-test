require('dotenv').config();

const { GOOGLE_CLIENT_ID } = process.env;
const { GOOGLE_CLIENT_SECRET } = process.env;
const { SERVER_ROOT_URI } = process.env;
const { CLIENT_ROOT_URI } = process.env;
const { JWT_SECRET } = process.env;
const { DB_URI } = process.env;
const COOKIE_NAME = 'google-auth-cookie';
const REDIRECT_URL = 'http://localhost:5000/login/google-auth';

module.exports = {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SERVER_ROOT_URI,
  CLIENT_ROOT_URI,
  JWT_SECRET,
  COOKIE_NAME,
  REDIRECT_URL,
  DB_URI,
};
