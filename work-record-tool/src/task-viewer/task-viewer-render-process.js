const fs = require("fs");
const createStopwatchBrowser = require("../assets/create-stopwatch-browser");
const { taskCardCreator } = require("../assets/create-task-card");

const data = fs.readFileSync("./data/task-list.json", "utf-8") || "[]";
const dataObj = JSON.parse(data);
dataObj.forEach(({ taskName, timeList, taskDescription, id }) => {
  const taskItemCard = taskCardCreator({
    title: taskName,
    description: taskDescription,
    timeList,
    id,
  });
  const taskViewerContainer = document.getElementById("task-viewer-container");
  const appendTimeBtn = taskItemCard.querySelector(".append-time-list-btn");
  appendTimeBtn.addEventListener("click", () => {
    const win = createStopwatchBrowser();

    win.webContents.on("did-finish-load", () => {
      win.webContents.send("task-info", { taskName, taskDescription, id });
      win.show();
    });
  });
  taskViewerContainer.appendChild(taskItemCard);
});
