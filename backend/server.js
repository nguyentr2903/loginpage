// app.js
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const bodyParser = require("body-parser");
const protectedRoute = require('./routes/protectedRoutes');
const cors = require('cors');
const connectDB = require('./database/db');
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');


require("dotenv").config();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/protected', protectedRoute);
app.use(cors());

connectDB();

const MONGO_URI = process.env.MONGO_URI;
const client = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});