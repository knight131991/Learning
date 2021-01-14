const fs = require("fs");
class FileInfoGetter {
  constructor() {}

  getTaskList = () => {
    const data =
      fs.readFileSync(
        path.resolve(__dirname, "../../data/task-list.json"),
        "utf-8"
      ) || "[]";
    return JSON.parse(data);
  };

  getTodoList = () => {
    const data = fs.readFileSync(todoListFilePath, "utf-8") || "[]";
    return JSON.parse(data);
  };
}

module.exports = FileInfoGetter;
