// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const path = require("path");
const appendTaskToTaskList = require("./src/assets/append-task-to-task-list");
const {
  indexFilePath,
  todoListIndexFilePath,
  todoListFilePath,
  taskListPath,
  diaryListPath,
  diaryListIndexPath,
} = require("./src/assets/constant");
const createFolder = require("./src/assets/create-folder");
const { taskCardCreator } = require("./src/assets/create-task-card");
const FileInfoGetter = require("./src/assets/file-info-getter");
const IndexHandler = require("./src/assets/index-handler");
const { setTodayTodoToSchedule } = require("./src/assets/scheduler");
const updateSpecificTask = require("./src/assets/update-specific-task");
const updateTaskCard = require("./src/assets/update-task-card");
require("./src/assets/scheduler");
require("./src/assets/greetings");

require("electron").ipcRenderer.on("stopwatch-time-list", (event, arg) => {
  if (!arg.id) {
    const indexHandler = new IndexHandler(indexFilePath);
    const taskId = indexHandler.increaseIndex();
    const taskItemCard = taskCardCreator({
      title: arg.taskName,
      timeList: arg.timeList,
      description: arg.taskDescription,
      id: taskId,
    });
    const taskViewerContainer = document.getElementById(
      "task-viewer-task-list-container"
    );
    if (
      taskViewerContainer.childElementCount === 1 &&
      taskViewerContainer.firstChild.id === "task-viewer-empty-element"
    ) {
      taskViewerContainer.firstChild.remove();
    }
    taskViewerContainer.insertBefore(
      taskItemCard,
      taskViewerContainer.firstChild
    );

    appendTaskToTaskList(taskListPath, {
      ...arg,
      id: taskId,
    });
  } else {
    const taskId = arg.id;

    const infoGetter = new FileInfoGetter();
    const allTaskInfo = infoGetter.getTaskList();
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

createFolder(taskListPath);
createFolder(indexFilePath);
createFolder(todoListIndexFilePath);
createFolder(todoListFilePath);
createFolder(diaryListPath);
createFolder(diaryListIndexPath);
setTodayTodoToSchedule();
