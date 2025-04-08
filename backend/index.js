const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session"); 
const feedRouter = require("./routes/feedbackRoutes");
require("dotenv").config();
require("./models/db");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// CORS config
app.use(
  cors({
    origin: "https://karansahu-feedbackcollector.netlify.app",
    credentials: true,
  })
);
// Session configuration
app.use(
  session({
    secret: process.env.jwt_secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000, // 1 hour
    },
  })
);

// Routes
app.use("/api", feedRouter);

// Base route
app.get("/", (req, res) => {
  res.send("Hello from the feedback user server");
});



app.listen(5000, () => {
  console.log(`Server is running on Port: 5000`);
});
