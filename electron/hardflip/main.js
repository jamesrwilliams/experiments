const { ipcMain, app, BrowserWindow } = require('electron');

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "HardFlip",
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadURL(`file://${__dirname}/dist/index.html`);

  //// uncomment below to open the DevTools.
  win.webContents.openDevTools();

  win.webContents.on('did-finish-load', () => {
    ipcMain.on('asynchronous-message', (event, arg) => {
      console.log(arg);
      event.returnValue('pong');
    });
  });

  // Event when the window is closed.
  win.on('closed', function () {
    win = null;
  });

}

// Create window on electron initialization
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('fromAngular', (event, data) => {
  const message = `Hello from the electron main process. You sent the message: ${data}`;
  event.sender.send('toAngular', {msg: message});
});

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow();
  }
});
