// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: String,
    resetTokenExpiration: Date
});

const User = mongoose.model('users', userSchema);

module.exports = User;
