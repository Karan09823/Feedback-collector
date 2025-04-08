# Feedback Collector

A modern web application for collecting and managing user feedback. Built with a React frontend and an Express backend, this project enables users to submit feedback easily while providing an admin dashboard to review and manage submissions.

## Features

- 🎯 Submit feedback via a simple form
- 🔐 Admin dashboard to view and manage feedback
- 📦 Express backend API for feedback storage and retrieval
- 🌐 Fully responsive UI using Tailwind CSS


## Tech Stack

**Frontend:**
- React (with Vite )
- Tailwind CSS


**Backend:**
- Node.js + Express
- MongoDB 

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Karan09823/Feedback-collector.git
cd feedback-collector

```

## For adding admin

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

run node createAdmin.js 
