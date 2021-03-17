const FileInfoGetter = require("../assets/file-info-getter");
const ElementCreator = require("../assets/ElementCreator");

document.getElementById("todo-task-viewer-container").appendChild(
  new ElementCreator().createConfirmModal({
    modalId: "remove-todo-task-list-confirm-modal",
    title: "刪除代辦事項",
    content: "確認是否要刪除此代辦事項",
  })
);

const appendTodoListToContainer = (list) => {
  list.forEach((todoInfo) => {
    const taskCard = new ElementCreator().createTodoTaskCard(todoInfo);
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
