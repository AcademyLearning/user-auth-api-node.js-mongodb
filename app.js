// // index.js
// const express = require('express');
// const mongoose = require('mongoose');
// const { mongoURI } = require('./config/config');
// const authRoutes = require('./routes/authRoutes');
// const { verifyToken } = require('./utils/jwtUtils');

// const app = express();

// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('MongoDB connection error:', err));

// app.use(express.json());

// app.post('/secure-route', verifyToken, (req, res) => {
//     res.json({ message: 'Access granted.' });
// });

// app.use('/auth', authRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const config = require('./config/config');

const app = express();

// Configure body-parser middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/user', { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      console.log('Connected to MongoDB');
   })
   .catch(err => {
      console.error('Error connecting to MongoDB:', err);
   });

// Routes
app.use('/auth', authRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});

