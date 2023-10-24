const mongoose = require('mongoose');

const lecturerSchema = mongoose.Schema(
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
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    professional_summary: String,
    assignedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // Reference to the Course model
      },
    ],
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    role: {
      type: String,
      default: 'lecturer',
    },
  },
  {
    timestamps: true,
  },
);

const Lecturer = mongoose.model('Lecturer', lecturerSchema);

module.exports = Lecturer;
