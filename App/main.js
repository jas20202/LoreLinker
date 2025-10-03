const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const fs = require('fs');
const { title } = require('process');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('App/lorelinker.html');
    win.webContents.openDevTools();
};

let openFilePath = ""

app.on('ready', () => {
    ipcMain.handle('openFile', async () => {
        const result = await dialog.showOpenDialog({
        properties: ['openFile'],
            filters: [{ name: 'JSON Files', extensions: ['json'] }]
        });

        if (result.canceled || result.filePaths.length === 0) {
            return null;
        }
        openFilePath = result.filePaths[0]
        return openFilePath;
    });

    ipcMain.handle('saveFile', async (event, data) => {
        console.log(openFilePath)
        if(!openFilePath) {
            const result = await dialog.showSaveDialog({
                filters: [{ name: 'JSON Files', extensions: ['json'] }]
            });
    
            if (result.canceled) {
                return false;
            }
            openFilePath = result.filePath
        }
        fs.writeFile(openFilePath, data, err =>{
            if(err) {
                dialog.showErrorBox({title: "Error while saving", content: err});
                return false;
            } else {
                return true;
            }
        })
    });

    createWindow();
});