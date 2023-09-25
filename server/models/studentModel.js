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
      type: String,
      required: [true, 'Please add your matric numbaer'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
    },
    current_level: {
      type: String,
      required: [true, 'Please add level'],
    },
    course_of_study: {
      type: String,
      default: 'B.sc Computer Science',
    },
    department: {
      type: String,
      default: 'Computer Science',
    },
    faculty: {
      type: String,
      default: 'Natural and Applied Science',
    },
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
