const Task = require('../models/task.model');
const User = require('../models/user.model');

async function getTasks(userId) {
  await ensureUserExists(userId);

  const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });
  return tasks.map(formatTask);
}

async function createTask({ text, userId }) {
  await ensureUserExists(userId);

  const task = await Task.create({ text, user: userId });
  return formatTask(task);
}

async function completeTasks(userId, ids) {
  await ensureUserExists(userId);

  await Task.updateMany(
    { _id: { $in: ids }, user: userId },
    { $set: { completed: true } }
  );

  return getTasks(userId);
}

async function toggleTask(id, userId) {
  await ensureUserExists(userId);

  const task = await Task.findOne({ _id: id, user: userId });

  if (!task) {
    throw createHttpError(404, 'Task not found');
  }

  task.completed = !task.completed;
  await task.save();

  return formatTask(task);
}

async function updateTask(id, { userId, ...updates }) {
  await ensureUserExists(userId);

  const task = await Task.findOneAndUpdate(
    { _id: id, user: userId },
    updates,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!task) {
    throw createHttpError(404, 'Task not found');
  }

  return formatTask(task);
}

async function deleteTasks(userId, ids) {
  await ensureUserExists(userId);

  await Task.deleteMany({ _id: { $in: ids }, user: userId });
  return getTasks(userId);
}

async function deleteTask(id, userId) {
  await ensureUserExists(userId);

  const task = await Task.findOneAndDelete({ _id: id, user: userId });

  if (!task) {
    throw createHttpError(404, 'Task not found');
  }
}

async function ensureUserExists(userId) {
  const userExists = await User.exists({ _id: userId });

  if (!userExists) {
    throw createHttpError(404, 'User not found');
  }
}

function formatTask(task) {
  return {
    id: task._id.toString(),
    userId: task.user.toString(),
    text: task.text,
    completed: task.completed,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
}

function createHttpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
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
