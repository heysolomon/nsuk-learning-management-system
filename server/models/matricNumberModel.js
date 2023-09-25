const mongoose = require('mongoose');

const matricNumberSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    matric_number: {
      type: String,
      required: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const MatricNumber = mongoose.model('MatricNumber', matricNumberSchema);

module.exports = MatricNumber;
