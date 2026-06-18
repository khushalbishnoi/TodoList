const mongoose = require('mongoose');

function validateObjectIdParam(paramName) {
  return (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params[paramName])) {
      return res.status(400).json({ message: `Invalid ${paramName}` });
    }

    next();
  };
}

module.exports = validateObjectIdParam;
