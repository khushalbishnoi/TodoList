const Joi = require('joi');
const mongoose = require('mongoose');

const createTaskSchema = Joi.object({
  text: Joi.string().trim().min(1).max(500).required(),
});

const updateTaskSchema = Joi.object({
  text: Joi.string().trim().min(1).max(500),
  completed: Joi.boolean(),
}).or('text', 'completed');

const idsSchema = Joi.object({
  ids: Joi.array()
    .items(
      Joi.string().custom(validateObjectId, 'MongoDB ObjectId validation')
    )
    .min(1)
    .required(),
});

function validateObjectId(value, helpers) {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }

  return value;
}

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  idsSchema,
};
