require('dotenv').config();

const { GOOGLE_CLIENT_ID } = process.env;
const { GOOGLE_CLIENT_SECRET } = process.env;
const { SERVER_ROOT_URI } = process.env;
const { CLIENT_ROOT_URI } = process.env;
const { JWT_SECRET } = process.env;
const { COOKIE_NAME } = process.env;

module.exports = {
  GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SERVER_ROOT_URI, CLIENT_ROOT_URI, JWT_SECRET, COOKIE_NAME,
};
