const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const validate = require('../middleware/validate.middleware');
const validateObjectIdParam = require('../middleware/validate-object-id-param.middleware');
const {
  getTasksQuerySchema,
  createTaskSchema,
  updateTaskSchema,
  taskOwnerSchema,
  idsSchema,
} = require('../validations/task.validation');

router.get('/list', validate(getTasksQuerySchema, 'query'), taskController.getTasks);

router.post('/update', validate(createTaskSchema), taskController.createTask);

router.patch(
  '/bulk/complete',
  validate(idsSchema),
  taskController.completeTasks
);

router.put(
  '/:id/toggle',
  validateObjectIdParam('id'),
  validate(taskOwnerSchema),
  taskController.toggleTask,
);

router.put(
  '/:id',
  validateObjectIdParam('id'),
  validate(updateTaskSchema),
  taskController.updateTask
);

router.delete('/', validate(idsSchema), taskController.deleteTasks);

router.delete(
  '/:id',
  validateObjectIdParam('id'),
  validate(taskOwnerSchema),
  taskController.deleteTask
);

module.exports = router;
