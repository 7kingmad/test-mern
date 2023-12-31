const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL);

const connection = mongoose.connection;

mongoose.connection.once("open", () => {
  console.log("mongoDB connection success!");
});

const studentRouter = require("./routes/students.js");

app.use("/student", studentRouter);

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
