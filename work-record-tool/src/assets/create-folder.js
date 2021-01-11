const fs = require("fs");
const path = require("path");

module.exports = (filePath) => {
  const dirName = path.dirname(filePath);
  dirName.split(/\\|\//).reduce((pre, cur) => {
    if (pre === "") {
      return cur;
    }
    if (cur !== ".") {
      const curPath = `${pre}/${cur}`;
      if (!fs.existsSync(curPath)) {
        fs.mkdirSync(curPath);
      }
    }
    return `${pre}/${cur}`;
  }, "");
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "");
  }
};
