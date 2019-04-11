import express from 'express';
import path from 'path';
import cors from 'cors';
import indexRoute from './routes';

const app = express();

app.use(cors());

// local vars
app.locals.title = 'express server';

// parse json payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', indexRoute);

export default app;
