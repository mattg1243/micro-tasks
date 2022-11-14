import express, { NextFunction, Request, Response } from 'express';
import {v4 as uuidv4 } from 'uuid';
import cors from 'cors'

let taskTable: Task[] = [];

const app = express();
const PORT = process.env.PORT || 8081

type Task = {id: string, name: string, complete: boolean};

app.use(cors());
app.use(express.json())

app.get('/tasks', (req, res, next) => {
  res.status(200).json(taskTable);
})

app.post('/new-task', (req: Request, res: Response, next: NextFunction) => {
  const name = req.body.name;
  const taskId = uuidv4();
  const newTask: Task = {id: taskId, name: name, complete: false};
  taskTable.push(newTask);
  // if (taskTable.length > 5) {
  //   delete taskTable[0];
  // }
  console.log(`task ${taskId} added`)
  res.status(200).json(taskTable);
})

app.post('/complete-task', (req, res, next) => {
  // const {taskId} = req.body;
  // const task = taskTable[taskId];
  // task.complete ? task.complete = false : task.complete = true;
  // res.status(200).json(taskTable);
})

app.post('/delete-task', (req, res, next) => {
  const {taskId} = req.body;
  delete taskTable[taskId];
  res.status(200).json(taskTable);
})

app.listen(PORT, () => {
  console.log(`tasks server listening on port ${PORT}`)
})