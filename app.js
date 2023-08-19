const express = require("express");
const bodyParser = require("body-parser");
const { connectToDB, getUserCollection} = require("./db");
// const routes = require("./routes");

const app = express();
app.use(bodyParser.json());

app.post("/login", async (req, res) => {
  try {
    const {emailId, password} = req.body;
    if (!emailId){
      res.status(400).json({  error:"Email is required." });
    }

    if (!password){
      res.status(400).json({  error:"password is required." });
    }
    const collection= await getUserCollection();
    const newUser ={
      emailId:req.body.emailId,
      password:req.body.password
    };
    console.log(emailId);
    const userEmail = await collection.findOne(emailId)
    console.log(userEmail);
    if(!userEmail){
      res.status(404).json({message:"Email not matched"});
    }
      //const validPassword = await collection.findOne(userEmail.password)
      else if(userEmail.password === password){
        res.status(200).json({message:"Login successfull"})
      }
      //  if(!validPassword){
      //   res.status(404).json({message:"Password not matched"});
       else{
        res.status(404).json({message:"Password not matched"});

       }
    
    res.status(201).json(newUser);
  } catch (err) {
    console.error("error login users:", err);
    res.status(500).json({  error:"Failed to login users."});
  }
});

// Start the server
const PORT = 3000;
connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
