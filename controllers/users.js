 const express = require("express");
const bcrypt = require("bcryptjs");

const userLogin = async (req, res) =>{

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
      }
  
      const hashedPassword = await bcrypt.compare(password , userEmail.password);
  
       if (!hashedPassword) {
        return res.status(401).json({ message: "Password not matched" });
      }else {
      res.status(200).json({ message: "Login successful" });
      }
    } catch (err) {
      console.error("Error logging in user:", err);
      res.status(500).json({ error: "Failed to login user." });
    }
 
};

module.exports={userLogin}