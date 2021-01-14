const fs = require("fs");

// const getIndex = () => {
//   const data =
//     fs.readFileSync(
//       path.resolve(__dirname, "../../data/index.json"),
//       "utf-8"
//     ) || '{"index":0}';
//   return JSON.parse(data).index;
// };

// const setIndex = (index) => {
//   fs.writeFileSync(
//     path.resolve(__dirname, "../../data/index.json"),
//     JSON.stringify({ index })
//   );
// };

// const increaseIndex = () => {
//   const newIndex = getIndex() + 1;
//   fs.writeFileSync(
//     path.resolve(__dirname, "../../data/index.json"),
//     JSON.stringify({ index: newIndex })
//   );
//   return newIndex;
// };

// module.exports = { getIndex, increaseIndex, setIndex };

class IndexHandler {
  constructor(pathName) {
    this.path = pathName;
  }
  getIndex() {
    const data = fs.readFileSync(this.path, "utf-8") || '{"index":-1}';
    return JSON.parse(data).index;
  }

  setIndex = (index) => {
    fs.writeFileSync(this.path, JSON.stringify({ index }));
  };

  increaseIndex = () => {
    const newIndex = this.getIndex() + 1;
    fs.writeFileSync(this.path, JSON.stringify({ index: newIndex }));
    return newIndex;
  };
}

module.exports = IndexHandler;
