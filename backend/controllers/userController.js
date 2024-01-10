const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Student = require('../models/userModel');
const HttpStatusCodes = require('../constants/HttpStatusCodes');
const generateToken = require('../utils/genrateToken');
const User = require('../models/userModel');
const { UareU, CONSTANTS } = require('uareu-node'); // Import

const { BAD_REQUEST, CREATED, UNAUTHORIZED } = HttpStatusCodes;

// status code messages
const FIELDS_ERR = 'Please add all fields';
const USER_EXISTS_ERR = 'User already exists';
const REGISTER_USER_ERR = 'Failed to register user.';
const LOGIN_ERR = 'failed, please check to make sure you entered the right details';

// @desc    Register new user
// @route   POST /api/user
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    biometric,
  } = req.body;

  try {
    // Check if any required field is missing
    if (
      !first_name
      || !last_name
      || !email
      || !biometric
    ) {
      return res.status(BAD_REQUEST).json({ message: FIELDS_ERR });
    }

    // Check if the student already exists
    const userExists = await User.findOne({ matric_number });

    if (userExists) {
      return res.status(BAD_REQUEST).json({ message: USER_EXISTS_ERR });
    }

    const uareu = UareU.getInstance(); // Get a unique instance of library handler.
    let reader; // Create a variable to keep the reader handle after 'open' the device.

     uareu.loadLibs() // Load libs
     .then(() => uareu.dpfpddInit()) // Init libs
     .then(() => uareu.dpfpddQueryDevices()) // Search reader devices connected
     .then((res) => uareu.dpfpddOpen(res.devicesList[0])) // 'Open' the reader device, it's needed for use others functions like: dpfpddCaptureAsync
     .then((res) => { if (res) reader = res }) // Set reader variable
     .catch((err) => { throw err; });

 // After this initial configuration you can create some functions to capture a fingerprint, identify it, compare it and etc...
 // Note: Identify and Compare are different, the main diference between it are: - Compare only compares two fingerprints;  - Identify compares a fingerprint against a list of fingerprints;

 uareu.dpfpddCaptureAsync(reader, CONSTANTS.DPFPDD_IMAGE_FMT.DPFPDD_IMG_FMT_ANSI381, CONSTANTS.DPFPDD_IMAGE_PROC.DPFPDD_IMG_PROC_DEFAULT, (data, dataSize) => {
     // Here you receive the data of a fingerprint image data (FID)
     // Before compare it, you need to generate a fingerprint minutie data (FMD)
     uareu.dpfjCreateFmdFromFid(data, CONSTANTS.DPFJ_FMD_FORMAT.DPFJ_FMD_ANSI_378_2004)
     .then((res) => {
         // Here you receive the FMD and then you can compare it, save it to compare with the next fingerprint, identify it with a database, etc...
         return uareu.dpfjIdentify(res, [FMD, LIST]);
     })
     .then((res) => {
         // Finger was identified or not? The answer you get here.
     })
     .catch((err) => console.log(err));
 });

    // Create the user
    const userData = {
      first_name,
      last_name,
      email,
      biometric
    };
    const student = await User.create(userData);

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
const loginUser = asyncHandler(async (req, res) => {
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
  registerUser,
  loginUser,
  getMe,
};
