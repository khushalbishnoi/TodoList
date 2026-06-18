const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const authenticate = require('../middleware/authenticate.middleware');
const validate = require('../middleware/validate.middleware');
const validateObjectIdParam = require('../middleware/validate-object-id-param.middleware');
const {
  createTaskSchema,
  updateTaskSchema,
  idsSchema,
} = require('../validations/task.validation');

router.use(authenticate);

router.get('/list', taskController.getTasks);

router.post('/update', validate(createTaskSchema), taskController.createTask);

router.patch(
  '/bulk/complete',
  validate(idsSchema),
  taskController.completeTasks
);

router.put(
  '/:id/toggle',
  validateObjectIdParam('id'),
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
  taskController.deleteTask
);

module.exports = router;
