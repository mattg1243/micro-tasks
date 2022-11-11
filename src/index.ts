import express from 'express';
import {v4 as uuidv4 } from 'uuid';
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 8081

type Task = {name: string, complete: boolean};
let taskTable: {[id: string]: Task};

app.use(cors());

app.get('/tasks', (req, res, next) => {
  res.status(200).json(taskTable);
})

app.post('/new-task', (req, res, next) => {
  const { name } = req.body;
  const taskId = uuidv4();
  const newTask: Task = {name, complete: false};
  taskTable[`${taskId}`] = newTask;
  res.status(200).json(taskTable);
})

app.post('/complete-task', (req, res, next) => {
  const {taskId} = req.body;
  const task = taskTable[taskId];
  task.complete ? task.complete = false : task.complete = true;
  res.status(200).json(taskTable);
})

app.post('/delete-task', (req, res, next) => {
  const {taskId} = req.body;
  delete taskTable[taskId];
  res.status(200).json(taskTable);
})

app.listen(PORT, () => {
  console.log(`tasks server listening on port ${PORT}`)
})