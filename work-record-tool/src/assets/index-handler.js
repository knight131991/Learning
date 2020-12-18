const fs = require("fs");
const getIndex = () => {
  const data = fs.readFileSync("./data/index.json", "utf-8") || '{"index":0}';
  return JSON.parse(data).index;
};

const setIndex = (index) => {
  fs.writeFileSync("./data/index.json", JSON.stringify({ index }));
};

const increaseIndex = () => {
  const newIndex = getIndex() + 1;
  fs.writeFileSync("./data/index.json", JSON.stringify({ index: newIndex }));
  return newIndex;
};

module.exports = { getIndex, increaseIndex, setIndex };
