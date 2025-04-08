const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("MongoDb connected..");
  })
  .catch((err) => {
    console.error("Failed to connect DB", err.message);
  });
