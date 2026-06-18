const Joi = require('joi');
const mongoose = require('mongoose');

const objectIdSchema = Joi.string().custom(
  validateObjectId,
  'MongoDB ObjectId validation'
);

const getTasksQuerySchema = Joi.object({
  userId: objectIdSchema.required(),
});

const createTaskSchema = Joi.object({
  userId: objectIdSchema.required(),
  text: Joi.string().trim().min(1).max(500).required(),
});

const updateTaskSchema = Joi.object({
  userId: objectIdSchema.required(),
  text: Joi.string().trim().min(1).max(500),
  completed: Joi.boolean(),
}).or('text', 'completed');

const taskOwnerSchema = Joi.object({
  userId: objectIdSchema.required(),
});

const idsSchema = Joi.object({
  userId: objectIdSchema.required(),
  ids: Joi.array().items(objectIdSchema).min(1).required(),
});

function validateObjectId(value, helpers) {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }

  return value;
}

module.exports = {
  getTasksQuerySchema,
  createTaskSchema,
  updateTaskSchema,
  taskOwnerSchema,
  idsSchema,
};
