const express = require("express");
const Task = require("../models/taskModel");
const router = express.Router();
const { createTask, getTasks, getTask, deleteTask, updateTask } = require("../controllers/taskController");


router.post("/", createTask);    // Create a Task
router.get("/", getTasks);      // Get/Read Tasks
router.get("/:id", getTask);      // Get/Read single Task
router.delete("/:id", deleteTask);      // Get/Read single Task
router.put("/:id", updateTask);      // Get/Read single Task

module.exports = router;
