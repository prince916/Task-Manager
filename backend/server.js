const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");

const app = express();

// Routes

app.get("/", (req, res) => {
  res.send("Home Page..");
});

// Create a Task
app.post("/api/tasks", async (req, res) => {
    console.log(req.body);
    res.send("Task Created");
});


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
