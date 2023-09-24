/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Student = require('../models/studentModel');
const HttpStatusCodes = require('../constants/HttpStatusCodes');
const generateToken = require('../utils/genrateToken');
const MatricNumber = require('../models/matricNumberModel');

const { BAD_REQUEST, CREATED, UNAUTHORIZED } = HttpStatusCodes;

// status code messages
const FIELDS_ERR = 'Please add all fields';
const USER_EXISTS_ERR = 'User already exists';
const STUDENT_VALIDATION_ERR = 'Student validation failed, please make sure your name matches the matric number';
const REGISTER_USER_OK = 'User registered successfully!';
const REGISTER_USER_ERR = 'Failed to register user.';
const SAVE_USER_TO_DB_ERR = 'Failed to save new user';

// @desc    Register new student
// @route   POST /api/student
// @access  Public
const registerStudent = asyncHandler(async (req, res) => {
  const {
    first_name,
    middle_name,
    last_name,
    matric_number,
    email,
    current_level,
    password,
  } = req.body;

  if (
    !first_name
    || !last_name
    || !matric_number
    || !email
    || !current_level
    || !password
  ) {
    res.status(BAD_REQUEST).json({ message: FIELDS_ERR });
  }

  //   validate the student's matric number
  const isMatricNumberValid = await MatricNumber.findOne({
    first_name,
    last_name,
    matric_number,
  });

  if (!isMatricNumberValid) {
    res.status(UNAUTHORIZED).json({ message: STUDENT_VALIDATION_ERR });
  }

  // Check if student exists
  const studentExists = await Student.findOne({ matric_number });

  if (studentExists) {
    res.status(BAD_REQUEST).json({ message: USER_EXISTS_ERR });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const studentData = {
    first_name,
    middle_name,
    last_name,
    matric_number,
    email,
    current_level,
    password: hashedPassword,
  };

  // Create user
  const student = await Student.create(studentData);

  if (student) {
    res.status(CREATED).json({
      _id: student.id,
      first_name: student.first_name,
      middle_name: student.middle_name !== '' ? student.middle_name : undefined,
      last_name: student.name,
      email: student.email,
      token: generateToken(student._id),
    });
  } else {
    res.status(BAD_REQUEST).json({ message: 'Invalid user data' });
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginStudent = asyncHandler(async (req, res) => {
  const { matric_number, password } = req.body;

  // Check for user email
  const user = await Student.findOne({ matric_number });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = {
  registerStudent,
  loginStudent,
  getMe,
};
