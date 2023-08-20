const express = require("express");
const bodyParser = require("body-parser");
const { connectToDB, getUserCollection} = require("./db");
// const routes = require("./routes");

const app = express();
app.use(bodyParser.json());

// app.post("/login", async (req, res) => {
//   try {
//     const {emailId, password} = req.body;
//     if (!emailId){
//       res.status(400).json({  error:"Email is required." });
//     }

//     if (!password){
//       res.status(400).json({  error:"password is required." });
//     }
//     const collection= await getUserCollection();
//     const newUser ={
//       emailId:req.body.emailId,
//       password:req.body.password
//     };
//     console.log(emailId);
//     const userEmail = await collection.findOne({emailId : emailId})
//     const validPassword = await collection.findOne(password)
//     console.log(userEmail);
//     if(userEmail !== emailId){
//       res.status(404).json({message:"Email not matched"});
//     }
//       else if(userEmail.validPassword !== validPassword){
//         res.status(200).json({message:"Login successfull"})
//       }
      
//        else{
//         res.status(404).json({message:"Password not matched"});

//        }
    
//     res.status(201).json(newUser);
//   } catch (err) {
//     console.error("error login users:", err);
//     res.status(500).json({  error:"Failed to login users."});
//   }
// });




app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId) {
      return res.status(400).json({ error: "Email is required." });
    }else if (!password) {
      return res.status(400).json({ error: "Password is required." });
    }
    
    const collection = await getUserCollection();
    const userEmail = await collection.findOne({ emailId }); 

    if (!userEmail) {
      return res.status(404).json({ message: "Email not found" });
    }

    else if (userEmail.password !== password) {
      return res.status(401).json({ message: "Password not matched" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).json({ error: "Failed to login user." });
  }
});

// Start the server
const PORT = 3000;
connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
