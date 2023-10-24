require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Lecturer = require('../models/lecturerModel');

const mongoURI = process.env.MONGO_URI;

const seedAdmin = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('DB CONNECTED SUCCESSFULLY:::');

    const adminData = {
      first_name: 'NSUK',
      last_name: 'Admin',
      email: 'admin@nsuk.edu.ng',
      password: 'Ash13burton', // This should ideally be input by the admin and not hard-coded
      role: 'admin',
    };

    // Check if admin already exists
    const existingAdmin = await Lecturer.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('Admin already exists in the database');
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminData.password, salt);

    adminData.password = hashedPassword;

    // Create admin user
    await Lecturer.create(adminData);
    console.log('Admin created successfully');
  } catch (error) {
    console.error('Error seeding admin:', error);
  } finally {
    // Close the database connection when done
    mongoose.connection.close();
  }
};

seedAdmin();
