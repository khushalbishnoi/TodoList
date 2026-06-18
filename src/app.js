const express = require('express');
const cors = require('cors');
const notFound = require('./middleware/not-found.middleware');
const errorHandler = require('./middleware/error-handler.middleware');

const app = express();

const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

const routes = require('./routes');
app.use('/', routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
