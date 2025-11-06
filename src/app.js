import express from 'express';
import api from './api/index.js';

const app = express();

app.use(express.static('public'));
app.use(express.json()); // parse json data from http request
app.use(express.urlencoded({extended: true}));
app.use('/api/v1', api); // adds prefix and guides all requests to routes inside api

export default app;
