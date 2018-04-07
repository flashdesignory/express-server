const express = require('express');
const path = require('path');
const indexRoute = require('./routes/index');

const app = express();

//local vars
app.locals.title = 'express server';

//parse json payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//route for homepage
app.get('/', indexRoute);

module.exports = app;
