// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const appendTaskToTaskList = require("./src/assets/append-task-to-task-list");
const createFolder = require("./src/assets/create-folder");
const { taskCardCreator } = require("./src/assets/create-task-card");
const { increaseIndex } = require("./src/assets/index-handler");
const updateSpecificTask = require("./src/assets/update-specific-task");
const updateTaskCard = require("./src/assets/update-task-card");

require("electron").ipcRenderer.on("stopwatch-time-list", (event, arg) => {
  if (!arg.id) {
    const taskId = increaseIndex();
    const taskItemCard = taskCardCreator({
      title: arg.taskName,
      timeList: arg.timeList,
      description: arg.taskDescription,
      id: taskId,
    });
    const taskViewerContainer = document.getElementById(
      "task-viewer-container"
    );
    taskViewerContainer.insertBefore(
      taskItemCard,
      taskViewerContainer.firstChild
    );

    appendTaskToTaskList("./data/task-list.json", { ...arg, id: taskId });
  } else {
    const taskId = arg.id;

    const allTaskInfo = JSON.parse(
      fs.readFileSync("./data/task-list.json", "utf-8") || "[]"
    );
    const taskInfo = allTaskInfo.filter(({ id }) => id === taskId).pop();
    const timeList = [...taskInfo.timeList, ...arg.timeList];

    updateTaskCard(taskId, {
      title: arg.taskName,
      description: arg.taskDescription,
      timeList,
    });

    updateSpecificTask(taskId, { ...arg, timeList });
  }
});

createFolder("./data/task-list.json");
createFolder("./data/index.json");
