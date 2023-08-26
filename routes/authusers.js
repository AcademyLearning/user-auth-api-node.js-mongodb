const express = require("express");
const router = express.Router();

const {usersignup} = require('../controllers/authusers');

// router.post('/signup', authusers.postSignup);

router.route("/signup").post(usersignup);

module.exports = router;
