const taskService = require('../services/task.service');

async function getTasks(req, res, next) {
  try {
    const tasks = await taskService.getTasks(req.query.userId);
    res.json({ tasks });
  } catch (error) {
    next(error);
  }
}

async function createTask(req, res, next) {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json({ task });
  } catch (error) {
    next(error);
  }
}

async function completeTasks(req, res, next) {
  try {
    const tasks = await taskService.completeTasks(req.body.userId, req.body.ids);
    res.json({ tasks });
  } catch (error) {
    next(error);
  }
}

async function toggleTask(req, res, next) {
  try {
    const task = await taskService.toggleTask(req.params.id, req.body.userId);
    res.json({ task });
  } catch (error) {
    next(error);
  }
}

async function updateTask(req, res, next) {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.json({ task });
  } catch (error) {
    next(error);
  }
}

async function deleteTasks(req, res, next) {
  try {
    const tasks = await taskService.deleteTasks(req.body.userId, req.body.ids);
    res.json({ tasks });
  } catch (error) {
    next(error);
  }
}

async function deleteTask(req, res, next) {
  try {
    await taskService.deleteTask(req.params.id, req.body.userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getTasks,
  createTask,
  completeTasks,
  toggleTask,
  updateTask,
  deleteTasks,
  deleteTask,
};
