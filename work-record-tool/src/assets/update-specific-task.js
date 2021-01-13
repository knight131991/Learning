const getTaskList = require("./get-task-list");

const updateSpecificTask = (id, { taskName, taskDescription, timeList }) => {
  const data = getTaskList();

  const result = data.map((item) => {
    if (item.id === id) {
      return { ...item, taskName, taskDescription, timeList };
    }
    return item;
  });

  fs.writeFileSync(
    path.resolve(__dirname, "../../data/task-list.json"),
    JSON.stringify(result)
  );
};

module.exports = updateSpecificTask;
