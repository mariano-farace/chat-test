require('dotenv').config();

const { GOOGLE_CLIENT_ID } = process.env;
const { GOOGLE_CLIENT_SECRET } = process.env;
const { SERVER_ROOT_URI } = process.env;
const CLIENT_REDIRECT_TO_URI = 'http://localhost:3000/google-login-redirect';
const JWT_SECRET = 'chatroom secret';
const { DB_URI } = process.env;
const COOKIE_NAME = 'jwt';
const REDIRECT_URL = 'login/google-auth';
const CORS_URL = process.env || 'http://localhost:3000';

module.exports = {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SERVER_ROOT_URI,
  CLIENT_REDIRECT_TO_URI,
  JWT_SECRET,
  COOKIE_NAME,
  REDIRECT_URL,
  DB_URI,
  CORS_URL,
};
