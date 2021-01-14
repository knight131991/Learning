const createStopwatchBrowser = require("../assets/create-stopwatch-browser");

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

  const win = createStopwatchBrowser();
  win.webContents.on("did-finish-load", () => {
    win.webContents.send("task-info", { taskName, taskDescription });
    document.getElementById("task-creator-task-name").value = "";
    taskName = "";
    document.getElementById("task-creator-task-description").value = "";
    taskDescription = "";
    win.show();
  });
});

document
  .getElementById("create-new-todo-task-btn")
  .addEventListener("click", () => {
    const name = document.getElementById("task-creator-todo-task-name").value;
    const description = document.getElementById(
      "task-creator-todo-task-description"
    ).value;
    const hintTime = document.getElementById(
      "task-creator-todo-task-start-time"
    ).value;

    if (!name) {
      alert("請輸入代辦事項名稱");
      return;
    }

    console.log("todo task", name, description, hintTime);
  });
