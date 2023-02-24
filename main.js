const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron')
const dog = require('./plugin/chkdog/chkdog.node')
const path = require('path')
const fs = require('fs')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  ipcMain.on('save-file', (event, text) => {
    saveFile(text)
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('getFingerprint', handleGetFingerprint)
  ipcMain.handle('updateFingerprint', handleUpdateFingerprint)
  createWindow()
  Menu.setApplicationMenu(null);
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

async function handleGetFingerprint() {
  const print = await dog.getFingerprint()
  return print
}

async function handleUpdateFingerprint(filePath) {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  if (canceled) {
    return true
  }

  const ok = await dog.updateFingerprint(filePaths[0])
  return ok
}

function saveFile(text) {
  const res = dialog.showSaveDialogSync({
    title: '保存文件',
    buttonLabel: '保存',
    defaultPath: 'license.c2v',
    filters: []
  })

  if (res == undefined) {
    return
  }

  fs.writeFileSync(res, text)
}