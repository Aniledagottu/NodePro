// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import commonRoute  from './routes/commonRoute.js'
// const dotenv = require('dotenv');
// const commonRoute  = require('./routes/commonRoute');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/', commonRoute);
app.use('/',express.json())

app.listen(8000, () => {
  console.log(`[server]: Server is running at http://localhost:${8000}`);
});