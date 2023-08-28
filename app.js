const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { connectToDB, getUserCollection } = require("./db");
const bcrypt = require("bcryptjs");

const userroutes = require("./routes/users");

const app = express();
app.use(bodyParser.json());

//middleware or set to router
app.use("/api/users", userroutes);



const PORT = 3000;
connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
