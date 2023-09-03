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
const USER_EXISTS_ERR = 'User already exists with the phone number';
const COLLECTOR_NOT_FOUND_ERR = 'Collector not found';
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
    res.status(BAD_REQUEST);
    throw new Error('Please add all fields');
  }

  //   validate the student's matric number
  const isMatricNumberValid = await MatricNumber.findOne({ first_name, last_name, matric_number });

  if (!isMatricNumberValid) {
    res.status(UNAUTHORIZED);
    throw new Error('Invalid matric number');
  }

  // Check if student exists
  const studentExists = await Student.findOne({ matric_number });

  if (studentExists) {
    res.status(BAD_REQUEST);
    throw new Error('Student already exists');
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
    res.status(BAD_REQUEST);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

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
  loginUser,
  getMe,
};
