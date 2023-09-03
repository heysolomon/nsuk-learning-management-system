const express = require('express');
const Paths = require('./constants/Paths');
const { registerStudent } = require('../controllers/studentController');
const { addStudentMN } = require('../controllers/adminController');

const { Router } = express;

const router = Router();
const studentRouter = Router();
const adminRouter = Router();

studentRouter.route(Paths.Students.Register).post(registerStudent);

// admin routes
adminRouter.route(Paths.Admin.Student).post(addStudentMN);

router.use(Paths.Students.Base, studentRouter);
router.use(Paths.Admin.Base, adminRouter);

module.exports = router;
