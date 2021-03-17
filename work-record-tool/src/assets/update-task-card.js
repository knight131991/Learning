const ElementCreator = require("./ElementCreator");
const MyDate = require("./time-handler");

const updateTaskCard = (taskId, { title, description, timeList }) => {
  const eleCreator = new ElementCreator();
  const taskCard = document.getElementById(`task-card-${taskId}`);

  if (title) {
    taskCard.querySelector("#card-header-title").textContent = title;
  }

  const ele = taskCard.querySelector(`#card-description-${taskId}`);
  if (description) {
    if (ele) {
      ele.textContent = description;
    } else {
      const descriptEle = eleCreator.createTaskCardDescription(
        taskId,
        description
      );
      const cardBody = taskCard.querySelector(".card-body");
      cardBody.insertBefore(
        descriptEle,
        cardBody.querySelector(`#duration-${taskId}`)
      );
    }
  } else {
    ele && ele.remove();
  }

  if (timeList) {
    const durationEle = taskCard.querySelector(`#duration-${taskId}`);
    const totalDurtionTime = MyDate.getTimeListDuration(timeList);
    durationEle.textContent = `進行時間 : ${totalDurtionTime.getFormatedDuration(
      true
    )}`;

    const timeListEle = eleCreator.createTaskCardTimeListEle(timeList);
    const collapsedArea = taskCard.querySelector(`#demo${taskId}`);
    collapsedArea.removeChild(collapsedArea.firstChild);
    collapsedArea.appendChild(timeListEle);
  }
};

module.exports = updateTaskCard;
