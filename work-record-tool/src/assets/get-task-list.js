const getTaskList = () => {
  const data =
    fs.readFileSync(
      path.resolve(__dirname, "../../data/task-list.json"),
      "utf-8"
    ) || "[]";
  return JSON.parse(data);
};

module.exports = getTaskList;
