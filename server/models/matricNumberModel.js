const mongoose = require('mongoose');

const matricNumberSchema = mongoose.Schema(
  {
    matric_number: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const MatricNumber = mongoose.model('MatricNumber', matricNumberSchema);

module.exports = MatricNumber;
