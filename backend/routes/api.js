const express = require('express');
const Paths = require('./constants/Paths');
const {
  registerStudent,
  loginStudent,
} = require('../controllers/studentController');
const { addStudentMN } = require('../controllers/adminController');
const upload = require('../config/multer');

const { Router } = express;

const router = Router();
const userRouter = Router();

// @desc    Register new student
// @route   POST /api/student
// @access  Public
userRouter
  .route(Paths.User.Register)
  .post(upload.single('picture'), registerStudent);

// @desc    Login user
// @route   POST /api/user
// @access  Public
userRouter.post(Paths.User.Login, loginStudent);

router.use(Paths.User.Base, userRouter);

module.exports = router;
