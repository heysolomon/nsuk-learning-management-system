const mongoose = require('mongoose');

const studentSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'Please add your first name'],
    },
    middle_name: String,
    last_name: {
      type: String,
      required: [true, 'please enter last Name'],
    },
    matric_number: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MatricNumber',
      required: [true, 'Please add your matric numbaer'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    current_level: {
      type: String,
      required: [true, 'Please add level'],
      unique: true,
    },
    course_of_study: String,
    department: String,
    faculty: String,
    enrolled_courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  },
);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
