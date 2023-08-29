// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User'); // Your User model import
const { secretKey } = require('../config/config');

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000; // Token valid for 1 hour
        await user.save();

        const transporter = nodemailer.createTransport({
            // Configure nodemailer to send emails (SMTP, Gmail, etc.)
        });

        const mailOptions = {
            from: 'nazimkhan71999@gmail.com',
            to: email,
            subject: 'Reset Password',
            html: `
                <p>You requested a password reset.</p>
                <p>Click <a href="http://localhost:3000/reset/${resetToken}">here</a> to reset your password.</p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: 'Reset token sent to email.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred.' });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { resetToken, newPassword } = req.body;

        const user = await User.findOne({
            resetToken,
            resetTokenExpiration: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired reset token.' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        res.json({ message: 'Password reset successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred.' });
    }
};


exports.signup = async (req, res) => {
  try {
      const { username, email, mobile, password, confirmPassword } = req.body;

      // Check if passwords match
      if (password !== confirmPassword) {
          return res.status(400).json({ error: 'Passwords do not match.' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
          username,
          email,
          mobile,
          password: hashedPassword
      });

      await newUser.save();
      res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
      res.status(500).json({ error: 'An error occurred.' });
  }
};


exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred.' });
    }
};
