const fs = require("fs");
const { taskListPath } = require("./constant");
class FileInfoGetter {
  constructor() {}

  getTaskList = () => {
    const data = fs.readFileSync(taskListPath, "utf-8") || "[]";
    return JSON.parse(data);
  };

  getTodoList = () => {
    const data = fs.readFileSync(todoListFilePath, "utf-8") || "[]";
    return JSON.parse(data);
  };
}

module.exports = FileInfoGetter;
