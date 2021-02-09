const indexFilePath = path.resolve(__dirname, "../../data/index.json");
const taskListPath = path.resolve(__dirname, "../../data/task-list.json");
const todoListIndexFilePath = path.resolve(
  __dirname,
  "../../data/todo-task-index.json"
);
const todoListFilePath = path.resolve(__dirname, "../../data/todo-list.json");

module.exports = { indexFilePath, todoListIndexFilePath, todoListFilePath, taskListPath };
