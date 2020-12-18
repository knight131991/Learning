// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const appendTaskToTaskList = require("./src/assets/append-task-to-task-list");
const createFolder = require("./src/assets/create-folder");
const createTaskCard = require("./src/assets/create-task-card");
const { increaseIndex } = require("./src/assets/index-handler");

require("electron").ipcRenderer.on("stopwatch-time-list", (event, arg) => {
  appendTaskToTaskList("./data/task-list.json", arg);
  const taskItemStr = createTaskCard({
    title: arg.taskName,
    timeList: arg.timeList,
    description: arg.taskDescription,
    id: increaseIndex(),
  });
  const taskViewerContainer = document.getElementById("task-viewer-container");
  taskViewerContainer.insertBefore(
    document.createRange().createContextualFragment(taskItemStr),
    taskViewerContainer.firstChild
  );
});

createFolder("./data/task-list.json");
createFolder("./data/index.json");
