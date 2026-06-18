const userService = require('../services/user.service');

async function signup(req, res, next) {
  try {
    const authData = await userService.signup(req.body);
    res.status(201).json(authData);
  } catch (error) {
    next(error);
  }
}

async function signin(req, res, next) {
  try {
    const authData = await userService.signin(req.body);
    res.json(authData);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signup,
  signin,
};
