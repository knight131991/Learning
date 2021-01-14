var schedule = require("node-schedule");
const FileInfoGetter = require("./file-info-getter");
const MyDate = require("./time-handler");

const setSchedule = (inputDate, execCallback, adjustHours = 9) => {
  const date = new Date(inputDate);
  adjustHours && date.setHours(adjustHours, 0, 0);
  schedule.scheduleJob(date, execCallback);
};

const setTodayTodoToSchedule = () => {
  const data = new FileInfoGetter().getTodoList();
  const todayList = data
    .map((item) => (MyDate.isToday(item.hintTime) ? item : ""))
    .filter((item) => item);
  const hintBody = todayList.reduce((pre, { name }, id) => {
    return pre.concat(`${id + 1}. ${name} \n`);
  }, "");

  const callback = () =>
    new Notification("今日代辦事項", {
      body: hintBody,
    });

  setSchedule(new Date(), callback);
};

schedule.scheduleJob("25 11 * * *", function () {
  new Notification("午餐時間要到啦!!!", {
    body: "記得將正在進行的工作停止\n記得將正在進行的工作停止",
  });
});

schedule.scheduleJob("20 17 * * *", function () {
  new Notification("下班時間要到啦!!!", {
    body:
      "記得將正在進行的工作停止\n記得將正在進行的工作停止\n\n下班愉快 明天見!!",
  });
});

setTodayTodoToSchedule();

module.exports = { setSchedule };
