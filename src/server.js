import express from 'express';
import path from 'path';
import indexRoute from './api';

const app = express();

// local vars
app.locals.title = 'express server';

// parse json payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', indexRoute);

// global error handler
app.use((err, req, res /* , next */) => {
  console.log(err.stack);
  res.status(500).send('Error has occured');
});

export default app;
