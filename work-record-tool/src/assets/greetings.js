const fs = require("fs");
const MyDate = require("./time-handler");

const launchTimeFilePath = "./data/launch-time.json";
const isFileExist = fs.existsSync(launchTimeFilePath);

const greeting = () => {
  const greetingStr =
    new Date().getHours() > 8
      ? `大哥，現在都 ${MyDate.getFormatedTime(
          new Date()
        )} 了，你是不是有點晚才開機，加油好嗎...\n\n`
      : "\n";
  new Notification("早安", {
    body: `${greetingStr}希望你有充實的一天 `,
  });
};

if (isFileExist) {
  const data = JSON.parse(fs.readFileSync(launchTimeFilePath));
  if (new Date().getDate() !== new Date(data.launchTime).getDate()) {
    greeting();
  }
} else {
  const curTime = { launchTime: new Date().getTime() };
  fs.writeFileSync(launchTimeFilePath, JSON.stringify(curTime));
  greeting();
}
