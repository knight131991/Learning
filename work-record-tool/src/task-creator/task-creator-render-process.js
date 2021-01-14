const appendDataToFile = require("../assets/append-data-to-file");
const createStopwatchBrowser = require("../assets/create-stopwatch-browser");
const {
  todoListIndexFilePath,
  todoListFilePath,
} = require("../assets/constant");
const IndexHandler = require("../assets/index-handler");
const createTodoTaskCard = require("../assets/create-todo-task-card");
const MyDate = require("../assets/time-handler");

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
    const nameEle = document.getElementById("task-creator-todo-task-name");
    const descriptionEle = document.getElementById(
      "task-creator-todo-task-description"
    );
    const hintTimeEle = document.getElementById(
      "task-creator-todo-task-start-time"
    );

    if (!nameEle.value) {
      alert("請輸入代辦事項名稱");
      return;
    }

    const indexHandler = new IndexHandler(todoListIndexFilePath);

    const todoTaskInfo = {
      name: nameEle.value,
      description: descriptionEle.value,
      hintTime: hintTimeEle.value,
      id: indexHandler.increaseIndex(),
    };

    appendDataToFile(todoListFilePath, todoTaskInfo, true);

    const todoTaskCard = createTodoTaskCard(todoTaskInfo);
    document
      .getElementById("todo-task-viewer-list-container")
      .appendChild(todoTaskCard);
    nameEle.value = "";
    descriptionEle.value = "";
    hintTimeEle.value = "";
  });

document.getElementById(
  "task-creator-todo-task-start-time"
).value = MyDate.getFormatedDate(
  new Date().setDate(new Date().getDate() + 1)
).replace(/\//g, "-");
