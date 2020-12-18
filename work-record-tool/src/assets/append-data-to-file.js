const appendDataToFile = (pathName, data) => {
  const fileData = fs.readFileSync(pathName, "utf-8") || "[]";
  const fileDataObj = JSON.parse(fileData);
  fileDataObj.push(data);
  fs.writeFileSync(pathName, JSON.stringify(fileDataObj));
};

module.exports = appendDataToFile;
