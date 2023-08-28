const express = require("express");
const bcrypt = require('bcryptjs');

const usersignup = async (req, res) => {
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

    if (existingUserByEmail) {
      res.send("User email already exists");
    } else if (existingUserByMobile) {
      res.send("User mobile number already exists");
    } else {
      
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const hashedConfirmPassword = await bcrypt.hash(userData.confirmpassword, 10);
      userData.password = hashedPassword;
      userData.confirmpassword = hashedConfirmPassword;

      await collection.insertOne(userData);
      res.status(201).json(userData);
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("An error occurred during signup");
  }
};


module.exports = { usersignup };