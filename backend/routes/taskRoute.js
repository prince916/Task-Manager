const express = require("express");
const Task = require("../models/taskModel");
const router = express.Router();
const { createTask, getTasks } = require("../controllers/taskController");



router.post("/api/tasks", createTask);    // Create a Task
router.get("/api/tasks", getTasks);      // Get/Read Tasks

module.exports = router;
