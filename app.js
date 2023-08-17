const express = require("express");
const bodyParser = require("body-parser");
const { connectToDB } = require("./db");
// const routes = require("./routes");

const app = express();
app.use(bodyParser.json());

// Start the server
const PORT = 3000;
connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
