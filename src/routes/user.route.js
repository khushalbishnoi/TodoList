const express = require('express');
const userController = require('../controllers/user.controller');
const validate = require('../middleware/validate.middleware');
const {
  signupSchema,
  signinSchema,
} = require('../validations/user.validation');

const router = express.Router();

router.post('/signup', validate(signupSchema), userController.signup);
router.post('/signin', validate(signinSchema), userController.signin);
module.exports = router;
