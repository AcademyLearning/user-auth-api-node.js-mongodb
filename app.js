const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const { connectToDB , getUserCollection } = require("./db");
// const routes = require("./routes");


const app = express();
app.use(bodyParser.json());

app.post('/signup', async (req, res) => {
  const userData = {
      email: req.body.email,
      password: req.body.password,
      confirmpassword: req.body.confirmpassword
  }
  try {
    const collection = await getUserCollection();
      const existingUser = await collection.findOne({ email: userData.email });
      if (existingUser) {
          res.send("User details already exist");
      } else {
          await collection.insertOne(userData);
          console.log(userData);
          res.send("User registered successfully");
      }
  } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).send("An error occurred during signup");
  }
});


// Start the server
const PORT = 3000;
connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
