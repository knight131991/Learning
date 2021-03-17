require("jquery");
require("bootstrap/js/dist/collapse");
require("bootstrap/js/dist/modal");
const { BrowserWindow } = require("electron").remote;
const createIconBtn = require("./create-icon-button");
const MyDate = require("../assets/time-handler");
const createStopwatchBrowser = require("../assets/create-stopwatch-browser");
const removeDataById = require("../assets/removeDataById");

class ElementCreator {
  constructor() {}

  createEmptyHint(id) {
    const divEle = document.createElement("div");
    if (id) divEle.id = id;
    divEle.classList.add(...["d-flex", "justify-content-center"]);
    divEle.style.marginTop = "24px";
    divEle.innerText = "沒有符合的內容";
    return divEle;
  }

  createDiaryWindow() {
    let win = new BrowserWindow({
      show: false,
      width: 500,
      height: 300,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
      },
      frame: false,
    });

    win.on("close", () => {
      win = null;
    });

    win.loadURL(path.join("file://", __dirname, "../diary/index.html"));

    return win;
  }

  createBasicCard({ cardId, contentSetter, title, deleteIconSetter }) {
    const headerCreator = (title, deleteIconSetter, cardContainer) => {
      const cardHeader = document.createElement("div");
      cardHeader.classList.add(
        ...["card-header", "d-flex", "justify-content-between"]
      );

      const cardHeaderContent = document.createElement("div");
      cardHeaderContent.id = 'card-header-title'
      cardHeaderContent.innerText = `${title}`;

      const deleteBtn = createIconBtn(
        path.resolve(__dirname, "../icons/trash.svg")
      );

      cardHeader.appendChild(cardHeaderContent);
      cardHeader.appendChild(deleteIconSetter(deleteBtn, cardContainer));

      return cardHeader;
    };

    const cardContainer = document.createElement("div");
    cardContainer.id = cardId;
    cardContainer.classList.add(...["card", "t-b-margin"]);

    const cardHeader = headerCreator(title, deleteIconSetter, cardContainer);
    cardContainer.appendChild(cardHeader);

    const cardBody = document.createElement("div");
    cardBody.classList.add(["card-body"]);
    cardContainer.appendChild(contentSetter(cardBody, cardContainer));

    return cardContainer;
  }

  createTaskCardDescription = (id, description) => {
    const ele = document.createElement("h6");
    ele.id = `card-description-${id}`;
    ele.innerText = description;
    return ele;
  };

  createTaskCardTimeListEle = (timeList) => {
    const ulEle = document.createElement("ul");
    ulEle.classList.add(["list-group"]);
    // collapseCard.appendChild(ulEle);

    timeList.forEach(({ start, end }) => {
      const liEle = document.createElement("li");
      liEle.classList.add(["list-group-item"]);
      ulEle.appendChild(liEle);

      const flexDiv = document.createElement("div");
      flexDiv.classList.add(...["d-flex", "justify-content-between"]);
      liEle.appendChild(flexDiv);

      const startTimeSpan = document.createElement("span");
      startTimeSpan.innerText = MyDate.getFormatedDate(start, true);
      flexDiv.appendChild(startTimeSpan);

      const endTimeSpan = document.createElement("span");
      endTimeSpan.innerText = MyDate.getFormatedDate(end, true);
      flexDiv.appendChild(endTimeSpan);

      const durationTimeSpan = document.createElement("span");
      durationTimeSpan.innerText = new MyDate(start, end).getFormatedDuration(
        true
      );
      flexDiv.appendChild(durationTimeSpan);
    });

    return ulEle;
  };

  createTaskCard({ title, timeList, description, id }) {
    const createEditableTimeListEle = (timeList) => {
      const ulEle = document.createElement("ul");
      ulEle.id = "task-edit-modal-time-list";
      ulEle.classList.add(["list-group"]);

      timeList.forEach(({ start, end }) => {
        const liEle = document.createElement("li");
        liEle.classList.add(["list-group-item"]);
        ulEle.appendChild(liEle);

        const flexDiv = document.createElement("div");
        flexDiv.classList.add(...["d-flex", "justify-content-between"]);
        liEle.appendChild(flexDiv);

        const startTimeInput = document.createElement("input");
        startTimeInput.id = "task-edit-modal-start-time";
        // startTimeSpan.classList.add(["form-control"]);
        startTimeInput.value = MyDate.getFormatedDate(start, true);
        flexDiv.appendChild(startTimeInput);

        const endTimeInput = document.createElement("input");
        endTimeInput.id = "task-edit-modal-end-time";
        // endTimeSpan.classList.add(["form-control"]);
        endTimeInput.value = MyDate.getFormatedDate(end, true);
        flexDiv.appendChild(endTimeInput);

        const deleteBtn = createIconBtn(
          path.resolve(__dirname, "../icons/trash.svg")
        );
        deleteBtn.addEventListener("click", () => {
          liEle.remove();
        });
        flexDiv.appendChild(deleteBtn);
      });

      return ulEle;
    };

    return this.createBasicCard({
      cardId: `task-card-${id}`,
      contentSetter: (cardBody) => {
        if (description) {
          const titleDescrip = this.createTaskCardDescription(id, description);
          cardBody.appendChild(titleDescrip);
        }

        const titleDuration = document.createElement("h6");
        titleDuration.id = `duration-${id}`;
        const totalDurtionTime = MyDate.getTimeListDuration(timeList);
        titleDuration.innerText = `進行時間 : ${totalDurtionTime.getFormatedDuration(
          true
        )}`;
        cardBody.appendChild(titleDuration);

        cardBody.appendChild(document.createElement("br"));

        const collapseBtn = document.createElement("button");

        collapseBtn.type = "button";
        collapseBtn.classList.add(...["btn", "btn-info", "b-margin"]);
        collapseBtn.setAttribute("data-toggle", "collapse");
        collapseBtn.setAttribute("data-target", `#demo${id}`);
        collapseBtn.innerText = "顯示詳細工作時間";
        cardBody.appendChild(collapseBtn);

        const edtionBtn = document.createElement("button");
        edtionBtn.classList.add(...["btn", "btn-info", "b-margin", "l-margin"]);
        edtionBtn.setAttribute("data-toggle", "modal");
        edtionBtn.setAttribute("data-target", "#editionModal");
        edtionBtn.innerText = "編輯";
        edtionBtn.addEventListener("click", () => {
          const data = new FileInfoGetter().getTaskList();
          const task = data.filter(({ id: taskId }) => taskId === id).pop();
          document.getElementById("task-edition-modal-task-name").value =
            task.taskName;
          document.getElementById("task-edition-modal-task-description").value =
            task.taskDescription;

          document.getElementById("task-edition-modal-task-id").innerText = id;

          const modalBody = document.getElementById("edition-modal-body");
          modalBody.lastChild.remove();
          modalBody.appendChild(createEditableTimeListEle(task.timeList));
        });
        cardBody.appendChild(edtionBtn);

        const appendTimeBtn = document.createElement("button");
        appendTimeBtn.classList.add(
          ...["append-time-list-btn", "btn", "btn-info", "b-margin", "l-margin"]
        );
        appendTimeBtn.innerText = "繼續計時!";
        appendTimeBtn.addEventListener("click", () => {
          const win = createStopwatchBrowser();

          win.webContents.on("did-finish-load", () => {
            win.webContents.send("task-info", {
              taskName: title,
              taskDescription: description,
              id,
            });
            win.show();
          });
        });
        cardBody.appendChild(appendTimeBtn);

        const collapseCard = document.createElement("div");
        collapseCard.id = `demo${id}`;
        collapseCard.classList.add(["collapse"]);
        cardBody.appendChild(collapseCard);

        const timeListEle = this.createTaskCardTimeListEle(timeList);
        collapseCard.appendChild(timeListEle);
        return cardBody;
      },
      title,
      deleteIconSetter: (deleteBtn, cardContainer) => {
        deleteBtn.setAttribute("data-toggle", "modal");
        deleteBtn.setAttribute(
          "data-target",
          "#remove-task-list-confirm-modal"
        );

        deleteBtn.addEventListener("click", () => {
          const orgConfirmBtn = document.getElementById(
            "remove-task-list-confirm-modal-confirm-button"
          );
          const clone = orgConfirmBtn.cloneNode(true);
          orgConfirmBtn.parentNode.replaceChild(clone, orgConfirmBtn);
          document
            .getElementById("remove-task-list-confirm-modal-confirm-button")
            .addEventListener("click", () => {
              removeDataById(taskListPath, id);
              cardContainer.remove();
            });
        });

        return deleteBtn;
      },
    });
  }

  createTodoTaskCard({ name, description, hintTime, id }) {
    const contentSetter = (cardBody, cardContainer) => {
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
      return cardBody;
    };

    const deleteIconSetter = (deleteBtn, cardContainer) => {
      deleteBtn.setAttribute("data-toggle", "modal");
      deleteBtn.setAttribute(
        "data-target",
        "#remove-todo-task-list-confirm-modal"
      );
      deleteBtn.addEventListener("click", () => {
        const orgConfirmBtn = document.getElementById(
          "remove-todo-task-list-confirm-modal-confirm-button"
        );
        const clone = orgConfirmBtn.cloneNode(true);
        orgConfirmBtn.parentNode.replaceChild(clone, orgConfirmBtn);
        document
          .getElementById("remove-todo-task-list-confirm-modal-confirm-button")
          .addEventListener("click", () => {
            removeDataById(todoListFilePath, id);
            cardContainer.remove();
          });
      });

      return deleteBtn;
    };

    return this.createBasicCard({
      cardId: `todo-task-card-${id}`,
      contentSetter,
      title: name,
      deleteIconSetter,
    });
  }

  createConfirmModal = ({ modalId, title, content, onOK = () => {} }) => {
    const modalEle = document.createElement("div");
    modalEle.id = modalId;
    modalEle.classList.add(...["modal", "fade"]);
    modalEle.tabIndex = "-1";
    modalEle.setAttribute("aria-labelledby", "editionModalLabel");
    modalEle.setAttribute("aria-hidden", "true");

    const modalContainer = document.createElement("div");
    modalContainer.classList.add(...["modal-dialog", "modal-dialog-centered"]);
    modalEle.appendChild(modalContainer);

    const modalContent = document.createElement("div");
    modalContent.classList.add(...["modal-content"]);
    modalContainer.appendChild(modalContent);

    const modalHeader = document.createElement("div");
    modalHeader.classList.add(["modal-header"]);
    modalContent.appendChild(modalHeader);

    const titleEle = document.createElement("h5");
    titleEle.classList.add(["modal-title"]);
    titleEle.innerText = title;
    modalHeader.appendChild(titleEle);

    const closeBtn = document.createElement("button");
    closeBtn.classList.add(["close"]);
    closeBtn.setAttribute("data-dismiss", "modal");
    closeBtn.setAttribute("aria-label", "Close");
    modalHeader.appendChild(closeBtn);

    const closeBtnContent = document.createElement("span");
    closeBtnContent.setAttribute("aria-hidden", true);
    closeBtnContent.innerHTML = "&times;";
    closeBtn.appendChild(closeBtnContent);

    const body = document.createElement("div");
    body.classList.add(["modal-body"]);
    modalContent.appendChild(body);

    const bodyContent = document.createElement("span");
    bodyContent.innerText = content;
    body.appendChild(bodyContent);

    const footer = document.createElement("div");
    footer.classList.add(["modal-footer"]);
    modalContent.appendChild(footer);

    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add(...["btn", "btn-secondary"]);
    cancelBtn.setAttribute("data-dismiss", "modal");
    cancelBtn.innerText = "取消";
    footer.appendChild(cancelBtn);

    const confirmBtn = document.createElement("button");
    confirmBtn.id = `${modalId}-confirm-button`;
    confirmBtn.classList.add(...["btn", "btn-primary"]);
    confirmBtn.setAttribute("data-dismiss", "modal");
    confirmBtn.innerText = "確認";
    confirmBtn.addEventListener("click", onOK);
    footer.appendChild(confirmBtn);

    return modalEle;
  };
}

module.exports = ElementCreator;
