const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const SALT = 10;

async function signup({ name, email, password }) {
  const normalizedEmail = email.toLowerCase();
  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    throw createHttpError(409, "Email is already registered");
  }

  const passwordHash = await bcrypt.hash(password, SALT);
  const user = await User.create({
    name,
    email: normalizedEmail,
    passwordHash,
  });

  return formatUser(user);
}

async function signin({ email, password }) {
  const normalizedEmail = email.toLowerCase();
  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    throw createHttpError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw createHttpError(401, "Invalid email or password");
  }

  return formatUser(user);
}

function formatUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function createHttpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

module.exports = {
  signup,
  signin,
};
