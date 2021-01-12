const MyDate = require("./time-handler");

class MySearch {
  constructor() {
    this.data = [];
    this.index = [];
  }

  addIndex(index) {
    this.index.push(index);
  }

  addDocuments(doc) {
    this.data = doc;
  }

  search(keyword) {
    const searchResult = [];
    const regEx = new RegExp(keyword, "i");
    this.data.forEach((item) => {
      for (let i = 0; i < this.index.length; i += 1) {
        if (regEx.test(item[this.index[i]])) {
          searchResult.push(item);
          break;
        }
      }
    });
    return searchResult;
  }

  searchByTimeCond(timeCond) {
    const result = [];
    const regEx = /(<|>)?((?:0.)?[0-9]*)/;
    const match = regEx.exec(timeCond);
    if (match) {
      const condition = match[1];
      const inputMinute = Number(match[2]) * 60;
      this.data.forEach((item) => {
        const { timeList } = item;
        const totalMinute = new Date(
          MyDate.getTimeListDuration(timeList).getDuration()
        ).getSeconds();

        switch (condition) {
          case "<":
            totalMinute <= inputMinute && result.push(item);
            break;
          case ">":
            totalMinute >= inputMinute && result.push(item);
            break;
          case undefined:
            totalMinute === inputMinute && result.push(item);
            break;
          default:
          // alert("輸入有誤");
        }
      });
    }
    return result;
  }
}

module.exports = MySearch;
