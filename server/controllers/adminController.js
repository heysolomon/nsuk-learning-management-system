/* eslint-disable camelcase */
const asyncHandler = require('express-async-handler');
const HttpStatusCodes = require('../constants/HttpStatusCodes');
const MatricNumber = require('../models/matricNumberModel');

const { BAD_REQUEST, CREATED } = HttpStatusCodes;

// status code messages
const MATRIC_NUM_ERR = 'Matric Number exists';
const FIELDS_ERR = 'Please add all fields';

const addStudentMN = asyncHandler(async (req, res) => {
  const { first_name, last_name, matric_number } = req.body;

  if (!first_name || !last_name || !matric_number) {
    res.status(BAD_REQUEST).json({ message: FIELDS_ERR });
  }

  //   check if maric number exists in the database
  const matricNumberExists = await MatricNumber.findOne({
    first_name,
    last_name,
    matric_number,
  });

  if (matricNumberExists) {
    res.status(BAD_REQUEST).json({ message: MATRIC_NUM_ERR });
  }

  // add student data
  const student = await MatricNumber.create({
    first_name,
    last_name,
    matric_number,
  });

  if (student) {
    res.status(CREATED).json({
      _id: student.id,
      first_name: student.first_name,
      last_name: student.name,
      matric_number: student.matric_number,
    });
  } else {
    res.status(BAD_REQUEST).json({ message: 'Invalid user data' });
  }
});

module.exports = { addStudentMN };
