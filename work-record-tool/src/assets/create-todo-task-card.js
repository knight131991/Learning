const { todoListFilePath } = require("./constant");
const createIconBtn = require("./create-icon-button");
const createStopwatchBrowser = require("./create-stopwatch-browser");
const removeDataById = require("./removeDataById");
const MyDate = require("./time-handler");

const createCardHeader = (title, taskId, cardContainer) => {
  const cardHeader = document.createElement("div");
  cardHeader.classList.add(
    ...["card-header", "d-flex", "justify-content-between"]
  );

  const cardHeaderContent = document.createElement("div");
  cardHeaderContent.innerText = `${title}`;

  const deleteBtn = createIconBtn(
    path.resolve(__dirname, "../icons/trash.svg")
  );
  deleteBtn.setAttribute("data-toggle", "modal");
  deleteBtn.setAttribute("data-target", "#remove-todo-task-list-confirm-modal");

  deleteBtn.addEventListener("click", () => {
    const orgConfirmBtn = document.getElementById(
      "remove-todo-task-list-confirm-modal-confirm-button"
    );
    const clone = orgConfirmBtn.cloneNode(true);
    orgConfirmBtn.parentNode.replaceChild(clone, orgConfirmBtn);
    document
      .getElementById("remove-todo-task-list-confirm-modal-confirm-button")
      .addEventListener("click", () => {
        removeDataById(todoListFilePath, taskId);
        cardContainer.remove();
      });
  });

  cardHeader.appendChild(cardHeaderContent);
  cardHeader.appendChild(deleteBtn);

  return cardHeader;
};

const createTodoTaskCard = ({ name, description, hintTime, id }) => {
  const cardContainer = document.createElement("div");
  cardContainer.id = `todo-task-card-${id}`;
  cardContainer.classList.add(...["card", "t-b-margin"]);

  const cardHeader = createCardHeader(name, id, cardContainer);
  cardContainer.appendChild(cardHeader);

  const cardBody = document.createElement("div");
  cardBody.classList.add(["card-body"]);
  cardContainer.appendChild(cardBody);

  if (description) {
    const ele = document.createElement("h6");
    ele.id = `todo-task-card-description-${id}`;
    ele.innerText = description;
    cardBody.appendChild(ele);
  }

  const hintTimeEle = document.createElement("h6");
  hintTimeEle.id = `hint-time-${id}`;
  hintTimeEle.innerText = `進行時間 : ${MyDate.getFormatedDate(
    hintTime,
    true
  )}`;
  cardBody.appendChild(hintTimeEle);

  const startBtn = document.createElement("button");
  startBtn.classList.add(...["btn", "btn-info", "b-margin"]);
  startBtn.innerText = "開始任務";
  startBtn.addEventListener("click", () => {
    const win = createStopwatchBrowser();

    win.webContents.on("did-finish-load", () => {
      win.webContents.send("task-info", {
        taskName: name,
        taskDescription: description,
      });
      win.show();
    });

    cardContainer.remove();
    removeDataById(todoListFilePath, id);
  });
  cardBody.appendChild(startBtn);

  return cardContainer;
};

module.exports = createTodoTaskCard;
