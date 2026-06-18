const jwt = require('jsonwebtoken');

const DEFAULT_EXPIRES_IN = '7d';

function generateAccessToken(user) {
  const secret = getJwtSecret();

  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
    },
    secret,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || DEFAULT_EXPIRES_IN,
    }
  );
}

function verifyAccessToken(token) {
  return jwt.verify(token, getJwtSecret());
}

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw createHttpError(500, 'Missing JWT_SECRET in environment');
  }

  return secret;
}

function createHttpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

module.exports = {
  generateAccessToken,
  verifyAccessToken,
};
