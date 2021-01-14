class MyDate {
  constructor(startTime, endTime) {
    if (endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);
      this.duration = end - start;
    } else {
      this.duration = new Date(startTime);
    }
  }

  static getFormatedTime(inputTime, showSecond) {
    const time = new Date(inputTime);
    const hour = `0${time.getHours()}`.slice(-2);
    const minute = `0${time.getMinutes()}`.slice(-2);
    const second = `0${time.getSeconds()}`.slice(-2);
    return `${hour}:${minute}${showSecond ? `:${second}` : ""}`;
  }

  static getFormatedDate(inputTime, showTime) {
    const time = new Date(inputTime);
    const year = time.getFullYear();
    const month = `0${time.getMonth() + 1}`.slice(-2);
    const day = `0${time.getDate()}`.slice(-2);
    const hour = `0${time.getHours()}`.slice(-2);
    const minute = `0${time.getMinutes()}`.slice(-2);
    const second = `0${time.getSeconds()}`.slice(-2);
    return `${year}/${month}/${day}${
      showTime ? `  ${hour}:${minute}:${second}` : ""
    }`;
  }

  static isToday(inputDate) {
    const date = new Date(inputDate);
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }

  static getTimeListDuration(timeList) {
    const spentTime = timeList.reduce((pre, cur) => {
      const curDuration = new MyDate(cur.start, cur.end).getDuration();
      return pre + curDuration;
    }, 0);
    return new MyDate(spentTime);
  }

  getDuration() {
    return this.duration;
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
