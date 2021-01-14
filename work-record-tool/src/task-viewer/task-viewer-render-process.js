const fs = require("fs");
const MySearch = require("../assets/searcher");
const { taskCardCreator } = require("../assets/create-task-card");
const FileInfoGetter = require("../assets/file-info-getter");
const updateSpecificTask = require("../assets/update-specific-task");
const updateTaskCard = require("../assets/update-task-card");
const ElementCreator = require("../assets/ElementCreator");

const searcher = new MySearch();
searcher.addIndex("taskName");
searcher.addIndex("taskDescription");

const getTaskInfoFromModal = () => {
  const timeList = [];
  const taskName = document.getElementById("task-edition-modal-task-name")
    .value;
  const taskDescription = document.getElementById(
    "task-edition-modal-task-description"
  ).value;
  const taskId = document.getElementById("task-edition-modal-task-id")
    .innerText;
  const timeListEle = document.getElementById("task-edit-modal-time-list");
  const startTimeList = timeListEle.querySelectorAll(
    "#task-edit-modal-start-time"
  );
  const endTimeList = timeListEle.querySelectorAll("#task-edit-modal-end-time");
  for (let i = 0; i < startTimeList.length; i += 1) {
    timeList.push({
      start: new Date(startTimeList[i].value.replace(/\//g, "-")),
      end: new Date(endTimeList[i].value.replace(/\//g, "-")),
    });
  }
  return { taskName, taskDescription, timeList, id: taskId };
};

const appendListToListContainer = (list) => {
  list.forEach(({ taskName, timeList, taskDescription, id }) => {
    const taskItemCard = taskCardCreator({
      title: taskName,
      description: taskDescription,
      timeList,
      id,
    });
    document
      .getElementById("task-viewer-task-list-container")
      .appendChild(taskItemCard);
  });

  if (list.length === 0) {
    document
      .getElementById("task-viewer-task-list-container")
      .appendChild(new ElementCreator().createEmptyHint());
  }
};

const clearTaskList = () => {
  document.getElementById("task-viewer-task-list-container").innerHTML = "";
};

const search = (keywork) => {
  const dataObj = new FileInfoGetter().getTaskList();
  searcher.addDocuments(dataObj);
  const searchResult = searcher.search(keywork);
  // console.log("search result", searchResult, dataObj);
  clearTaskList();
  appendListToListContainer(searchResult);
};

const handleSearchEvent = () => {
  const keywork = document.getElementById("task-viewer-seach-input").value;
  if (keywork) {
    search(keywork);
  } else {
    const dataObj = new FileInfoGetter().getTaskList();
    clearTaskList();
    appendListToListContainer(dataObj);
  }
};

document
  .getElementById("task-viewer-seach-input")
  .addEventListener("search", () => handleSearchEvent());

document
  .getElementById("task-viewer-seach-btn")
  .addEventListener("click", () => handleSearchEvent());

document
  .getElementById("task-edition-modal-confirm-btn")
  .addEventListener("click", () => {
    const { id, ...restInfo } = getTaskInfoFromModal();
    updateTaskCard(id, {
      title: restInfo.taskName,
      description: restInfo.taskDescription,
      timeList: restInfo.timeList,
    });
    updateSpecificTask(Number(id), restInfo);
  });

const dataObj = new FileInfoGetter().getTaskList();
appendListToListContainer(dataObj);
