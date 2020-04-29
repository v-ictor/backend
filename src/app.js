const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

// initializations
const app = express();
require('./database/database');

// settings
app.set('port', process.env.PORT);

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// routes
app.use(require('./routes/foods'));
app.use(require('./routes/category'));

// static files
app.use(express.static(path.join(__dirname, 'uploads')));

module.exports = app;