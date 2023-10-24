/* eslint-disable no-unused-vars */
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const Paths = require('./routes/constants/Paths');
const router = require('./routes/api');

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure CORS to allow requests from all origins
app.use(
  cors({
    origin: '*', // Allow requests from any origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Include cookies in the request (if applicable)
  }),
);

// api
app.use(Paths.Base, router);

app.listen(port, () => console.log(`Server started @${port}`.grey));
