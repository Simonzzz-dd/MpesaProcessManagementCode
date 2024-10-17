const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require("validator");
const ldap = require('ldapjs');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  status: {
    enum: ['Active', 'Pending Active', 'Deactivated'],
    type: String,
    default: "Pending Active",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  department: {
    type: String,
  },
  ticketId: {
    type: String,
  },
  roles: {
    type: [String], // Array of strings for roles
    default: [], // Default to an empty array
  },
  groups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  }],
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Static signup method
userSchema.statics.signup = async function(email, username, department, ticketId) {
  // Validation
  if (!email || !username || !department || !ticketId) {
    throw Error('All fields must be filled');
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid');
  }

  const existingUser = await this.findOne({ $or: [{ email }, { ticketId }] });
  if (existingUser) {
    if (existingUser.status === 'Pending Active') {
      // Update the existing pending user
      existingUser.username = username;
      existingUser.department = department;
      existingUser.ticketId = ticketId;
      await existingUser.save();
      return existingUser;
    } else if (existingUser.status === 'Active' || existingUser.status === 'Deactivated') {
      throw Error('Account already registered');
    }
  }

  // Create a new user
  const user = await this.create({
    email,
    username,
    department,
    ticketId,
    status: 'Pending Active'
  });

  return user;
};



userSchema.statics.login = async function(email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  // Find the user in your database
  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Incorrect email');
  }

  // Check if the user's status is 'Active'
  if (user.status !== 'Active') {
    throw Error('User account is not active');
  }

  // Extract the username from the email by removing '@vm.co.mz'
  // Prod ----------------------------------------------------------------
  const emailPrefix = email.replace('@testad.voda', '');
  // Test -------------------------------------
  //  const emailPrefix = email.replace('@vm.co.mz', '');

  // LDAP server configuration
  const url = 'ldap://10.123.187.100:389'; // Use 'ldaps://' and port 636 if using LDAPS
  const client = ldap.createClient({
    url: url,
    timeout: 5000,
    connectTimeout: 10000,
  });

  // User's Distinguished Name (DN) in LDAP

  // Prod ----------------------------------------------------------------
  //  const userDN = `CN=${emailPrefix},OU=Standard,OU=Vodafone,OU=Users,OU=Vodacom Mozambique,DC=vm,DC=co,DC=mz`;
  // Test ------------------------------------
  const userDN = `CN=${emailPrefix},OU=Users,OU=Vodacom Mozambique,DC=testad,DC=voda`;

  // Attempt to bind (authenticate) with the provided credentials
  return new Promise((resolve, reject) => {
    client.bind(userDN, password, (err) => {
      // Always unbind after the operation
      client.unbind();

      if (err) {
        reject(Error('Incorrect password or authentication failed'));
      } else {
        resolve(user);
      }
    });
  });
};

// Create the User model using the specific database connection
const User = mongoose.model("User", userSchema);

module.exports = User;
