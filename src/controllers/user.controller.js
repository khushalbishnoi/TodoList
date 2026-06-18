const userService = require('../services/user.service');

async function signup(req, res, next) {
  try {
    const user = await userService.signup(req.body);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
}

async function signin(req, res, next) {
  try {
    const user = await userService.signin(req.body);
    res.json({ user });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signup,
  signin,
};
