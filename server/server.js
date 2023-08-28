/* eslint-disable no-unused-vars */
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const Paths = require('./routes/constants/Paths');
const router = require('./routes/api');

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// api
app.use(Paths.Base, router);

app.listen(port, () => console.log(`Server started @${port}`.grey));
