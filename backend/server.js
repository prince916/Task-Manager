const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const Task = require("./models/taskModel");
const taskRoutes = require("./routes/taskRoute");

const app = express();


// Middleware

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/api/tasks", taskRoutes)

// .....Explained What is Middleware and its fuctionalities......
// const logger = (req, res, next) => {
//   console.log("Middleware ran...");
//   console.log(req.method);
//   next();
// };


// Routes
app.get("/", (req, res) => {
  res.send("Home Page..");
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
