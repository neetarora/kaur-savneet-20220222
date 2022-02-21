
'use strict';

const MONGOOSE = require('mongoose');
const SCHEMA = MONGOOSE.Schema;

const { docSchema } = require('../../mongo/schemas');

const emailValidator = require('email-validator');
const constants = require('./constant');

let userSchema = new SCHEMA({
  userType:{
    type: Number
  },
  username: {
    type: String,
    trim: true,
    search: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [emailValidator.validate, 'Invalid Email']
  },
  password: {
    type: String,
  },
  resetPasswordCode: {
    type: String,
    unique: true,
    sparse: true
  },
  passwordCodeGeneratedAt: {
    type: Date
  },
  profilePicture: {
    type: docSchema
  },
}, { timestamps: true });

let modelUser = MONGOOSE.model('user', userSchema);

module.exports = modelUser;
