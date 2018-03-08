const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;
//let optionsWindow;

////////////////////////////////////////////////////////////////////////////////////
// Main Window
app.on('ready', ()=>{
    mainWindow = new BrowserWindow({
        width: 1100, 
        height: 650,
        resizable: false,
        //frame: false,
        //show: false,
        fullscreen: true,
        //icon: __dirname + '/img/icon2.png'
    });
    mainWindow.loadURL(`file://${__dirname}/../src/index.html`);

    mainWindow.once('ready-to-show', () => { 
        mainWindow.show(); 
    });
});

ipcMain.on('quit', () => {
    app.quit();
});