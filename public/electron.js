const { app, BrowserWindow } = require('electron');
const isDev = require("electron-is-dev");
const path = require("path");

function createWindow () {

    const win = new BrowserWindow({
        width: 1280,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        },
        title: "Aplikacja do śledzenia kryptowalut",
    });

    win.loadURL(
        isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
    );

    win.setMinimumSize(1024, 768);

    if(isDev){
        win.webContents.openDevTools();
    } else {
        win.setMenu(null);
    }

}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
});