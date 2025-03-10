// app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const connectDB = require("./database/db");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const { MongoClient, ServerApiVersion } = require("mongodb");

connectDB();

const MONGO_URI = process.env.MONGO_URI;
const client = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
app.use("/api/auth", authRoutes);
app.use((err, req, res, next) => {

  console.error("Server Error: ", err); // Log the error stack
  res.status(500).send({ message: 'Something went wrong. Please try again later.' });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
