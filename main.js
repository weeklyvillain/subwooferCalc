const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron')

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.on('ping', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})

ipcMain.on('speakerParams', (event, arg) => {
  console.log(arg) // prints "ping"
  let ebp = arg['fs'] / arg['qes'];
  let retVal = '';

  if (ebp <= 50){
    retVal = 'Best in Sealed Box';
  } else if (ebp > 50 && ebp < 90) {
    retVal = 'Flexible Box';
  } else if (ebp >= 90) {
    retVal = 'Best in Ported Box';
  }
  event.returnValue = retVal
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.