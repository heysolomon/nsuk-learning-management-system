const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  instructor: {
    type: String,
    required: true,
  },
  enrollmentLimit: {
    type: Number,
    default: 0, // 0 means no limit
  },
  enrolledStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student', // Reference to the Student model
    },
  ],
  modules: [moduleSchema], // Array of module sub-documents
  // Add more fields as needed
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
