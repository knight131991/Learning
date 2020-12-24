const { ipcRenderer } = require("electron");

let startTime = new Date();
let timeList = [];
let name = "";
let description = "";
let taskId;

const startBtn = document.getElementById("start");
startBtn.addEventListener("click", () => {
  startTime = new Date();
});

const stopBtn = document.getElementById("stop");
stopBtn.addEventListener("click", () => {
  timeList.push({ start: startTime, end: new Date() });
  startTime = 0;
});

const leaveBtn = document.getElementById("finish");
leaveBtn.addEventListener("click", () => {
  if (startTime) {
    timeList.push({ start: startTime, end: new Date() });
    startTime = 0;
  }
  ipcRenderer.sendSync("stopwatch-time-list", {
    taskName: name,
    timeList,
    taskDescription: description,
    id: taskId,
  });
});

require("electron").ipcRenderer.on(
  "task-info",
  (event, { taskName, taskDescription, id }) => {
    document.getElementById("task-name").innerText = taskName;
    document.getElementById("task-description").innerText = taskDescription;
    document.getElementById("task-id").innerText = id;
    name = taskName;
    description = taskDescription;
    taskId = id;
  }
);
