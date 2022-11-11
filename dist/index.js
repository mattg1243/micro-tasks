"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8081;
let taskTable;
app.use((0, cors_1.default)());
app.get('/tasks', (req, res, next) => {
    res.status(200).json(taskTable);
});
app.post('/new-task', (req, res, next) => {
    const { name } = req.body;
    const taskId = (0, uuid_1.v4)();
    const newTask = { name, complete: false };
    taskTable[`${taskId}`] = newTask;
    res.status(200).json(taskTable);
});
app.post('/complete-task', (req, res, next) => {
    const { taskId } = req.body;
    const task = taskTable[taskId];
    task.complete ? task.complete = false : task.complete = true;
    res.status(200).json(taskTable);
});
app.post('/delete-task', (req, res, next) => {
    const { taskId } = req.body;
    delete taskTable[taskId];
    res.status(200).json(taskTable);
});
app.listen(PORT, () => {
    console.log(`tasks server listening on port ${PORT}`);
});
