const { ipcRenderer } = require("electron");

let startTime = new Date();
let timeList = [];
let name = "";
let description = "";

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
  });
});

require("electron").ipcRenderer.on(
  "task-info",
  (event, { taskName, taskDescription }) => {
    document.getElementById("task-name").innerText = taskName;
    document.getElementById("task-description").innerText = taskDescription;
    name = taskName;
    description = taskDescription;
  }
);
