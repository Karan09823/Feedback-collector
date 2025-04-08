require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Could not connect to MongoDB:", err.message);
    process.exit(1);
  }
};

const createAdmin = async () => {
  await connectDB();

  const existingAdmin = await Admin.findOne({ email: "abc@gmail.com" });
  if (existingAdmin) {
    console.log("⚠️ Admin with this email already exists");
    return mongoose.connection.close();
  }

  const hashedPassword = await bcrypt.hash("xyz123", 10);

  const admin = new Admin({
    fullName: "abc",
    email: "abc@gmail.com",
    password: hashedPassword,
    role: "admin",
  });

  try {
    await admin.save();
    console.log("✅ Admin created successfully");
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();
