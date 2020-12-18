const elect = require("electron").remote;
const { BrowserWindow } = require("electron").remote;

let taskName = "";
let taskDescription = "";

document
  .getElementById("task-creator-task-name")
  .addEventListener("change", (e) => {
    const { target } = e;
    taskName = target.value;
  });

document
  .getElementById("task-creator-task-description")
  .addEventListener("change", (e) => {
    taskDescription = e.target.value;
  });

document.getElementById("create-new-task-btn").addEventListener("click", () => {
  if (!taskName) {
    alert("請輸入任務名稱");
    return;
  }

  const screenPos = elect.screen.getPrimaryDisplay().bounds;
  let win = new BrowserWindow({
    show: false,
    width: 450,
    height: 200,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
    frame: false,
  });
  const newWinPos = win.getBounds();
  win.on("close", () => {
    win = null;
  });
  win.loadURL(path.join("file://", __dirname, "../stopwatch/index.html"));
  win.setBounds({
    x: screenPos.width - newWinPos.width,
    y: screenPos.height - newWinPos.height - 50,
  });
  win.webContents.on("did-finish-load", () => {
    win.webContents.send("task-info", { taskName, taskDescription });
    document.getElementById("task-creator-task-name").value = "";
    taskName = "";
    document.getElementById("task-creator-task-description").value = "";
    taskDescription = "";
  });
  win.show();
});
