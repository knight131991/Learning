const fs = require("fs");
const taskCardCreator = require("../assets/create-task-card");

const data = fs.readFileSync("./data/task-list.json", "utf-8") || "[]";
const dataObj = JSON.parse(data);
dataObj.forEach(({ taskName, timeList, id }) => {
  const taskItemStr = taskCardCreator({ title: taskName, timeList, id });
  const taskViewerContainer = document.getElementById("task-viewer-container");
  taskViewerContainer.appendChild(
    document.createRange().createContextualFragment(taskItemStr)
  );
});
