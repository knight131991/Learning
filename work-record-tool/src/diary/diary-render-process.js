const remote = require("electron").remote;
const appendDataToFile = require("../assets/append-data-to-file");
const { diaryListPath, diaryListIndexPath } = require("../assets/constant");
const IndexHandler = require("../assets/index-handler");

document
  .getElementById("create-new-diary-btn")
  .addEventListener("click", () => {
    const idHandler = new IndexHandler(diaryListIndexPath);
    const curId = idHandler.increaseIndex();

    appendDataToFile(diaryListPath, {
      data: document.getElementById("diary-content").value,
      date: new Date(),
      id: curId,
    });

    remote.getCurrentWindow().close();
  });
