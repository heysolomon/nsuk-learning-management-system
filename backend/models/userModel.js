const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'Please add your first name'],
    },
    last_name: {
      type: String,
      required: [true, 'please enter last Name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
    },
    biometric: {
      type: String,
      required: [true, 'Please add a biometric']
    },
    picture: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
