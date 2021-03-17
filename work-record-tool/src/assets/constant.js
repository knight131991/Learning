const path = require("path");
const indexFilePath = path.resolve(__dirname, "../../data/index.json");
const taskListPath = path.resolve(__dirname, "../../data/task-list.json");
const todoListIndexFilePath = path.resolve(
  __dirname,
  "../../data/todo-task-index.json"
);
const todoListFilePath = path.resolve(__dirname, "../../data/todo-list.json");
const diaryListPath = path.resolve(__dirname, "../../data/diary-list.json");
const diaryListIndexPath = path.resolve(
  __dirname,
  "../../data/diary-list-index.json"
);

module.exports = {
  indexFilePath,
  todoListIndexFilePath,
  todoListFilePath,
  taskListPath,
  diaryListPath,
  diaryListIndexPath,
};
