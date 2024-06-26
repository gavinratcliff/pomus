const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const sound = require("sound-play");

var mainWindow = null;

function timerDone() {
    mainWindow.show();
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false
    }

  });

  mainWindow.loadFile('index.html');
  mainWindow.setMenu(null);
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.on('timer-done', timerDone);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

