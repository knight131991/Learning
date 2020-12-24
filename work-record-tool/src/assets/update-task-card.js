const {
  createCardDescription,
  createCardTimeListEle,
} = require("./create-task-card");

const updateTaskCard = (taskId, { title, description, timeList }) => {
  const taskCard = document.getElementById(`task-card-${taskId}`);

  if (title) {
    taskCard.querySelector(".card-header").textContent = title;
  }

  if (description) {
    const ele = taskCard.querySelector(`#card-description-${taskId}`);
    if (ele) {
      taskCard.querySelector(
        `#card-description-${taskId}`
      ).textContent = description;
    } else {
      const descriptEle = createCardDescription(taskId, description);
      const cardBody = taskCard.querySelector(".card-body");
      cardBody.insertBefore(
        descriptEle,
        cardBody.querySelector(`#duration-${taskId}`)
      );
    }
  }

  if (timeList) {
    const timeListEle = createCardTimeListEle(timeList);
    const collapsedArea = taskCard.querySelector(`#demo${taskId}`);
    collapsedArea.removeChild(collapsedArea.firstChild);
    collapsedArea.appendChild(timeListEle);
  }
};

module.exports = updateTaskCard;
