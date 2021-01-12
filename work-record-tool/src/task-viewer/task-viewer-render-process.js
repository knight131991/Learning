const fs = require("fs");
const MySearch = require("../assets/searcher");
const { taskCardCreator } = require("../assets/create-task-card");

const searcher = new MySearch();
searcher.addIndex("taskName");
searcher.addIndex("taskDescription");

const getTaskListFromJson = () => {
  const data =
    fs.readFileSync(
      path.resolve(__dirname, "../../data/task-list.json"),
      "utf-8"
    ) || "[]";
  return JSON.parse(data);
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
    const divEle = document.createElement("div");
    divEle.classList.add(...["d-flex", "justify-content-center"]);
    divEle.style.marginTop = "24px";
    divEle.innerText = "沒有符合的內容";
    document
      .getElementById("task-viewer-task-list-container")
      .appendChild(divEle);
  }
};

const clearTaskList = () => {
  document.getElementById("task-viewer-task-list-container").innerHTML = "";
};

const handleSearchEvent = () => {
  const keywork = document.getElementById("task-viewer-seach-input").value;
  if (keywork) {
    search(keywork);
  } else {
    const dataObj = getTaskListFromJson();
    clearTaskList();
    appendListToListContainer(dataObj);
  }
};

const search = (keywork) => {
  const dataObj = getTaskListFromJson();
  searcher.addDocuments(dataObj);
  const searchResult = searcher.search(keywork);
  // console.log("search result", searchResult, dataObj);
  clearTaskList();
  appendListToListContainer(searchResult);
};

document
  .getElementById("task-viewer-seach-input")
  .addEventListener("search", () => handleSearchEvent());

document
  .getElementById("task-viewer-seach-btn")
  .addEventListener("click", () => handleSearchEvent());

const dataObj = getTaskListFromJson();
appendListToListContainer(dataObj);
