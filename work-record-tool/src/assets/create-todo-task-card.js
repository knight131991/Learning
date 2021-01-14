const MyDate = require("./time-handler");

const createTodoTaskCard = ({ name, description, hintTime, id }) => {
  const cardContainer = document.createElement("div");
  cardContainer.id = `todo-task-card-${id}`;
  cardContainer.classList.add(...["card", "t-b-margin"]);

  const cardHeader = document.createElement("div");
  cardHeader.classList.add(["card-header"]);
  cardHeader.innerText = `${name}`;
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

  return cardContainer;
};

module.exports = createTodoTaskCard;
