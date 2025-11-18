import express from 'express';
import api from './api/index.js';
import cors from 'cors';
import {errorHandler, notFoundHandler} from './middlewares/error-handlers.js';

const app = express();

app.use(cors());

app.use(express.static('public'));
app.use('/uploads', express.static('public'));
app.use(express.json()); // parse json data from http request
app.use(express.urlencoded({extended: true}));
app.use('/api/v1', api); // adds prefix and guides all requests to routes inside api

app.use(notFoundHandler); // default for all routes not handled by routers above
app.use(errorHandler); // error handler

export default app;
