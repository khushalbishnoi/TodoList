const express = require('express');
const router = express.Router();

const healthRoute = require('./health.route');
const taskRoutes = require('./task.route');
const userRoutes = require('./user.route');

router.use('/health', healthRoute);
router.use('/tasks', taskRoutes);
router.use('/user', userRoutes);

module.exports = router;
