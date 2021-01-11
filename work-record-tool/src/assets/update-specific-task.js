const updateSpecificTask = (id, { taskName, taskDescription, timeList }) => {
  const data = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, "../../data/task-list.json"),
      "utf-8"
    ) || "[]"
  );

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
