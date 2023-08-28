const express = require("express");
const router = express.Router();


const{userLogin} = require("../controllers/users")

router.route("/").post(userLogin);


module.exports = router;