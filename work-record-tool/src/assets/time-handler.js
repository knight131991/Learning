class MyDate {
  constructor(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    this.duration = end - start;
  }

  static getFormatedTime(inputTime, showSecond) {
    const time = new Date(inputTime);
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();
    return `${hour}:${minute}${showSecond ? `:${second}` : ""}`;
  }

  static getFormatedDate(inputTime, showTime) {
    const time = new Date(inputTime);
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    const hour = `0${time.getHours()}`.slice(-2);
    const minute = `0${time.getMinutes()}`.slice(-2);
    const second = `0${time.getSeconds()}`.slice(-2);
    return `${year}/${month}/${day}${
      showTime ? `  ${hour}:${minute}:${second}` : ""
    } `;
  }

  getDurationSecond() {
    return `0${Math.floor((this.duration / 1000) % 60)}`.slice(-2);
  }

  getDurationMinute() {
    return `0${Math.floor((this.duration / 1000 / 60) % 60)}`.slice(-2);
  }

  getDurationHour() {
    return `0${Math.floor(this.duration / 1000 / 60 / 60)}`.slice(-2);
  }

  getFormatedDuration(showSecond) {
    return `${this.getDurationHour()}:${this.getDurationMinute()}${
      showSecond ? `:${this.getDurationSecond()}` : ""
    }`;
  }
}

module.exports = MyDate;
