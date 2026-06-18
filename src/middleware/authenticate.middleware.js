const User = require('../models/user.model');
const tokenService = require('../services/token.service');

async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication token is required' });
    }

    const token = authHeader.split(' ')[1];
    const payload = tokenService.verifyAccessToken(token);
    const user = await User.findById(payload.sub).select('_id name email');

    if (!user) {
      return res.status(401).json({ message: 'Invalid authentication token' });
    }

    req.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Invalid or expired authentication token' });
    }

    next(error);
  }
}

module.exports = authenticate;
