const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { connectToDB , getUserCollection } = require("./db");
// const routes = require("./routes");


const app = express();
app.use(bodyParser.json());


app.post('/signup', async (req, res) => {
  const { email, mobileNumber,password,confirmpassword } = req.body;
  
  try {
    const collection = await getUserCollection();
    const emailExists = await collection.findOne({ email : email});
    const mobileExists = await collection.findOne({ mobileNumber : mobileNumber });
    console.log(emailExists,mobileExists)
  
    if (emailExists) {
      return res.status(400).json({ error: 'User email already exists' });
    }else if (mobileExists){
      return res.status(400).json({ error: 'User mobile number already exists' });
    }

    const newUser = new User({
      email,
      mobileNumber,
      password,
      confirmpassword
    });

    // await newUser.save();
    await collection.insertOne(newUser);
    console.log(newUser);
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' });
  }
});


// Start the server
const PORT = 3000;
connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
