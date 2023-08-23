const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { connectToDB, getUserCollection } = require("./db");
const bcrypt = require("bcryptjs");

// const routes = require("./routes");

const app = express();
app.use(bodyParser.json());

app.post("/signup", async (req, res) => {
  const userData = {
    email: req.body.email,
    mobileNumber: req.body.mobileNumber,
    password: req.body.password,
    confirmpassword: req.body.confirmpassword,
  };

  try {
    const collection = await getUserCollection();
    const existingUserByEmail = await collection.findOne({
      email: userData.email,
    });
    const existingUserByMobile = await collection.findOne({
      mobileNumber: userData.mobileNumber,
    });
    const existingUserByPassword = await collection.findOne({
      password: userData.password,
    });

    if (existingUserByEmail) {
      res.send("User email already exists");
    } else if (existingUserByMobile) {
      res.send("User mobile number already exists");
    } else if (existingUserByPassword) {
      res.send("User password already exists");
    } else {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
        const hashedPassword1 = await bcrypt.hash(userData.confirmpassword, 10);
        userData.confirmpassword = hashedPassword1;
      await collection.insertOne(userData);
      res.status(201).send("User registered successfully");
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("An error occurred during signup");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    } else if (!password) {
      return res.status(400).json({ error: "Password is required." });
    }

    const collection = await getUserCollection();
    const userEmail = await collection.findOne({ email });

    if (!userEmail) {
      return res.status(404).json({ message: "Email not found" });
    } else if (userEmail.password !== password) {
      return res.status(401).json({ message: "Password not matched" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).json({ error: "Failed to login user." });
  }
});


const PORT = 3000;
connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
