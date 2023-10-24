/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-destructuring */
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Student = require('../models/studentModel');
const HttpStatusCodes = require('../constants/HttpStatusCodes');

const { UNAUTHORIZED } = HttpStatusCodes;

// status code messages
const TOKEN_ERR = 'Not authorized, no token';
const ADMIN_ERR = 'Not authorized as an admin';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization
    && req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await Student.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.log(error);
      res.status(UNAUTHORIZED);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    res.status(UNAUTHORIZED).json({ message: TOKEN_ERR });
    throw new Error(TOKEN_ERR);
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(UNAUTHORIZED).json({ message: ADMIN_ERR });
    throw new Error(ADMIN_ERR);
  }
};

module.exports = { protect, admin };
