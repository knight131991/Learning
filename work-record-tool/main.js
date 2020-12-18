// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  Tray,
  Menu,
  nativeImage,
  ipcMain,
} = require("electron");
const path = require("path");

const debug = /--debug/.test(process.argv[2]);
let forceClose = false;

const ipcCreator = (mainWindow) => {
  const taskList = [];
  ipcMain.on("stopwatch-time-list", (event, arg) => {
    taskList.push(arg);
    mainWindow.webContents.send("stopwatch-time-list", arg);
  });
};

const trayCreator = (mainWindow) => {
  const iconPath = path.join(__dirname, "Google_Chrome_icon.png");
  const tray = new Tray(nativeImage.createFromPath(iconPath));
  tray.on("double-click", () => mainWindow.show());
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "close",
      click() {
        forceClose = true;
        mainWindow.close();
        tray.destroy();
      },
    },
  ]);
  tray.setToolTip("This is my application");
  tray.setContextMenu(contextMenu);
  mainWindow.tray = tray;
};

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");
  // mainWindow.removeMenu();
  trayCreator(mainWindow);

  mainWindow.on("close", (event) => {
    if (!forceClose) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  ipcCreator(mainWindow);
  debug && mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.setAppUserModelId(process.execPath);

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
