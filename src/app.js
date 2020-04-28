const express = require('express');

// initializations
const app = express();

// settings
app.set('port', process.env.PORT);

// routes
app.use(require('./routes/foods'));

module.exports = app;