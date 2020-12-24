const elect = require("electron").remote;
const { BrowserWindow } = require("electron").remote;

const createStopwatchBrowser = () => {
  const screenPos = elect.screen.getPrimaryDisplay().bounds;
  let win = new BrowserWindow({
    show: false,
    width: 450,
    height: 200,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
    frame: false,
  });
  const newWinPos = win.getBounds();
  win.on("close", () => {
    win = null;
  });
  win.loadURL(path.join("file://", __dirname, "../stopwatch/index.html"));
  win.setBounds({
    x: screenPos.width - newWinPos.width,
    y: screenPos.height - newWinPos.height - 50,
  });

  return win;
};

module.exports = createStopwatchBrowser;
