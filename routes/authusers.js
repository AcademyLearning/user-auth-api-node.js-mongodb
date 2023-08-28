const express = require("express");
const router = express.Router();

const {usersignup} = require('../controllers/authusers');

// router.post('/signup', usersignup);

router.route("/signup").post(usersignup);

module.exports = router;
