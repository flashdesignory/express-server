import express from 'express';
import path from 'path';
import indexRoute from './routes';

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

export default app;
