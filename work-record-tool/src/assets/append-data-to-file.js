const fs = require("fs");

const appendDataToFile = (pathName, data, reverse) => {
  const fileData = fs.readFileSync(pathName, "utf-8") || "[]";
  const fileDataObj = JSON.parse(fileData);
  reverse ? fileDataObj.splice(0, 0, { ...data }) : fileDataObj.push(data);
  fs.writeFileSync(pathName, JSON.stringify(fileDataObj));
};

module.exports = appendDataToFile;
