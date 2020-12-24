const appendTaskToTaskList = (pathName, data) => {
  const fileData = fs.readFileSync(pathName, "utf-8") || "[]";
  const fileDataObj = JSON.parse(fileData);
  fileDataObj.splice(0, 0, { ...data });
  fs.writeFileSync(pathName, JSON.stringify(fileDataObj));
};

module.exports = appendTaskToTaskList;
