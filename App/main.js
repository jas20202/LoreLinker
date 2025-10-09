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

    ipcMain.handle('join', (event, path1, path2) => {
        return path.join(path1, path2);
    });

    ipcMain.handle('emptyCurrent', () => {
        openFilePath = "";
    });

    ipcMain.handle('openFile', async () => {
        const result = await dialog.showOpenDialog({
            properties: ['openDirectory'],
        });

        if (result.canceled || result.filePaths.length === 0) {
            return null;
        }
        openFilePath = result.filePaths[0]
        return openFilePath;
    });

    ipcMain.handle('saveFileWithImage', async (event, {jsonData, u8arr, mime}) => {
        console.log(openFilePath)
        
        if(!openFilePath) {
            const result = await dialog.showOpenDialog({
                properties: ['openDirectory']
            });

            if (result.canceled || result.filePaths.length === 0) {
                return null;
            }
            openFilePath = result.filePaths[0]
        }
        fs.writeFile(path.join(openFilePath, "character_info.json"), jsonData, err =>{
            if(err) {
                dialog.showErrorBox({title: "Error while saving", content: err});
                return null;
            } 
        });
        fs.writeFile(path.join(openFilePath, "character_image.png"), u8arr, err =>{
            if(err) {
                dialog.showErrorBox({title: "Error while saving", content: err});
                return null;
            } else {
                return openFilePath;
            }
        });
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
            openFilePath = path.dirname(result.filePath);
        }
        fs.writeFile(path.join(openFilePath, "character_info.json"), data, err =>{
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