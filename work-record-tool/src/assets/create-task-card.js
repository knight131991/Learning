require("jquery");
require("bootstrap/js/dist/collapse");
const MyDate = require("../assets/time-handler");
const createStopwatchBrowser = require("./create-stopwatch-browser");

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

const taskCardCreator = ({ title, timeList, description, id }) => {
  const cardContainer = document.createElement("div");
  cardContainer.id = `task-card-${id}`;
  cardContainer.classList.add(...["card", "t-b-margin"]);

  const cardHeader = document.createElement("div");
  cardHeader.classList.add(["card-header"]);
  cardHeader.innerText = `${title}`;
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
