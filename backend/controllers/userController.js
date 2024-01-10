/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Student = require('../models/userModel');
const HttpStatusCodes = require('../constants/HttpStatusCodes');
const generateToken = require('../utils/genrateToken');
const User = require('../models/userModel');

const { BAD_REQUEST, CREATED, UNAUTHORIZED } = HttpStatusCodes;

// status code messages
const FIELDS_ERR = 'Please add all fields';
const USER_EXISTS_ERR = 'User already exists';
const STUDENT_VALIDATION_ERR = 'validation failed, please make sure your name matches the matric number';
const REGISTER_USER_OK = 'User registered successfully!';
const REGISTER_USER_ERR = 'Failed to register user.';
const LOGIN_ERR = 'failed, please check to make sure you entered the right details';

// @desc    Register new student
// @route   POST /api/student
// @access  Public
const registerStudent = asyncHandler(async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
  } = req.body;

  try {
    // Check if any required field is missing
    if (
      !first_name
      || !last_name
      || !email
      || !password
    ) {
      return res.status(BAD_REQUEST).json({ message: FIELDS_ERR });
    }

    // Check if the student already exists
    const userExists = await User.findOne({ matric_number });

    if (userExists) {
      return res.status(BAD_REQUEST).json({ message: USER_EXISTS_ERR });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the student
    const studentData = {
      first_name,
      last_name,
      email,
      password: hashedPassword,
    };
    const student = await Student.create(studentData);

    if (student) {
      
    } else {
      // Handle student creation failure
      return res.status(BAD_REQUEST).json({ message: REGISTER_USER_ERR });
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error:', error);
    res.status(BAD_REQUEST).json({ message: REGISTER_USER_ERR });
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginStudent = asyncHandler(async (req, res) => {
  const { matric_number, password } = req.body;

  if (!matric_number || !password) {
    res.status(BAD_REQUEST).json({ message: FIELDS_ERR });
  }

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
    res.status(BAD_REQUEST).json({ message: LOGIN_ERR });
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
