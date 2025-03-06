const Task = require("../models/Task")

// get task
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// add task
const addTask = async (req, res) => {
  const { title, description, deadline } = req.body
  try {
    const task = await Task.create({
      userId: req.user.id,
      title,
      description,
      deadline,
    })
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateTask = async (req, res) => {
  const { title, description, deadline, completed } = req.body
  try {
    const task = await Task.findById(req.params.id)
    if (!task) return res.status(404).json({ message: "Task not found" })

    task.title = title || task.title
    task.description = description || task.description
    task.deadline = deadline || task.deadline
    task.completed = completed ?? task.completed

    const updateTask = await task.save()
    res.json(updateTask)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    await task.remove();
    res.json({ message: "Task removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = { getTasks, addTask, updateTask, deleteTask }