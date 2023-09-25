const express = require('express');
const Paths = require('./constants/Paths');
const {
  registerStudent,
  loginStudent,
} = require('../controllers/studentController');
const { addStudentMN } = require('../controllers/adminController');

const { Router } = express;

const router = Router();
const studentRouter = Router();
const adminRouter = Router();

// @desc    Register new student
// @route   POST /api/student
// @access  Public
studentRouter.route(Paths.Students.Register).post(registerStudent);

// @desc    Login student
// @route   POST /api/student
// @access  Public
studentRouter.post(Paths.Students.Login, loginStudent);

// admin routes

// @desc    add matric number to db
// @route   POST /api/admin/students
// @access  Private
adminRouter.route(Paths.Admin.Student).post(addStudentMN);

router.use(Paths.Students.Base, studentRouter);
router.use(Paths.Admin.Base, adminRouter);

module.exports = router;
