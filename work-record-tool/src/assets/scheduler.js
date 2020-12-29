var schedule = require("node-schedule");

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
