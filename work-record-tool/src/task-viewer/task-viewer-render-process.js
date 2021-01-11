const fs = require("fs");
const { taskCardCreator } = require("../assets/create-task-card");

const data =
  fs.readFileSync(path.resolve(__dirname, "../../data/task-list.json"), "utf-8") ||
  "[]";
const dataObj = JSON.parse(data);
dataObj.forEach(({ taskName, timeList, taskDescription, id }) => {
  const taskItemCard = taskCardCreator({
    title: taskName,
    description: taskDescription,
    timeList,
    id,
  });
  document.getElementById("task-viewer-container").appendChild(taskItemCard);
});
