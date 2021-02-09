require("jquery");
require("bootstrap/js/dist/collapse");
require("bootstrap/js/dist/modal");
const MyDate = require("../assets/time-handler");
const { taskListPath } = require("./constant");
const createIconBtn = require("./create-icon-button");
const createStopwatchBrowser = require("./create-stopwatch-browser");
const FileInfoGetter = require("./file-info-getter");
const removeDataById = require("./removeDataById");

// module.exports = taskCardCreator = ({ title, timeList, description, id }) => `
//   <div class="card card-margin">
//     <div class="card-header">${title}</div>
//     <div class="card-body">
//       <h6>日期 : ${MyDate.getFormatedDate(timeList[0].start)}</h6>
//       ${description ? `<h6>描述 : ${description}</h6>` : ""}
//       <h6>進行時間 : ${new MyDate(
//         timeList[0].start,
//         timeList[timeList.length - 1].end
//       ).getFormatedDuration(true)}</h6>
//       <br/>
//       <button
//         type="button"
//         class="btn btn-info t-b-margin"
//         data-toggle="collapse"
//         data-target="#demo${id}"
//       >
//         顯示詳細工作時間
//       </button>
//       <button class = "append-time-list-btn">sssss</button>
//       <div id="demo${id}" class="collapse">
//         <ul class="list-group">
//           ${timeList.reduce((pre, { start, end }) => {
//             return pre.concat(
//               `
//               <li class="list-group-item">
//               <div class="d-flex justify-content-between">
//               <span>${MyDate.getFormatedTime(start, true)}</span>
//               <span>${MyDate.getFormatedTime(end, true)}</span>
//               <span>${new MyDate(start, end).getFormatedDuration(true)}</span>
//               </div></li>
//               `
//             );
//           }, "")}
//         </ul>
//       </div>
//     </div>
//   </div>
// `;

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

const createCardDescription = (id, description) => {
  const ele = document.createElement("h6");
  ele.id = `card-description-${id}`;
  ele.innerText = description;
  return ele;
};

const createCardTimeListEle = (timeList) => {
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
  deleteBtn.setAttribute("data-target", "#remove-task-list-confirm-modal");

  deleteBtn.addEventListener("click", () => {
    const orgConfirmBtn = document.getElementById(
      "remove-task-list-confirm-modal-confirm-button"
    );
    const clone = orgConfirmBtn.cloneNode(true);
    orgConfirmBtn.parentNode.replaceChild(clone, orgConfirmBtn);
    document
      .getElementById("remove-task-list-confirm-modal-confirm-button")
      .addEventListener("click", () => {
        removeDataById(taskListPath, taskId);
        cardContainer.remove();
      });
  });

  cardHeader.appendChild(cardHeaderContent);
  cardHeader.appendChild(deleteBtn);

  return cardHeader;
};

const taskCardCreator = ({ title, timeList, description, id }) => {
  const cardContainer = document.createElement("div");
  cardContainer.id = `task-card-${id}`;
  cardContainer.classList.add(...["card", "t-b-margin"]);

  const cardHeader = createCardHeader(title, id, cardContainer);
  cardContainer.appendChild(cardHeader);

  const cardBody = document.createElement("div");
  cardBody.classList.add(["card-body"]);
  cardContainer.appendChild(cardBody);

  if (description) {
    const titleDescrip = createCardDescription(id, description);
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

  const timeListEle = createCardTimeListEle(timeList);
  collapseCard.appendChild(timeListEle);

  return cardContainer;
};

module.exports = {
  createCardDescription,
  taskCardCreator,
  createCardTimeListEle,
};
