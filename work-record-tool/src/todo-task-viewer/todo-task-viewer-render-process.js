const createTodoTaskCard = require("../assets/create-todo-task-card");
const FileInfoGetter = require("../assets/file-info-getter");
const ElementCreator = require("../assets/ElementCreator");

const appendTodoListToContainer = (list) => {
  list.forEach((todoInfo) => {
    const taskCard = createTodoTaskCard(todoInfo);
    document
      .getElementById("todo-task-viewer-list-container")
      .appendChild(taskCard);
  });

  if (list.length === 0) {
    const emptyHint = new ElementCreator().createEmptyHint();
    document
      .getElementById("todo-task-viewer-list-container")
      .appendChild(emptyHint);
  }
};

const dataObj = new FileInfoGetter().getTodoList();
appendTodoListToContainer(dataObj);
