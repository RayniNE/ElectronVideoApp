const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron

const mainUI = `file://${__dirname}/index.html`

let browserWindow;

app.on('ready', async () => {
    browserWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
    });
    await browserWindow.loadURL(mainUI);
})

ipcMain.on("video:submit", (event, path) => {
    ffmpeg.ffprobe(path, (err, metadata) => {
        
        browserWindow.webContents.send('video:metadata', metadata.format.duration)

    })
})

