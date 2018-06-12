import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow | null;

const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

    return Promise.all(
        extensions.map(name => installer.default(installer[name], forceDownload))
    ).catch(console.log);
};

const createUrl = () => {
    if (process.env.NODE_ENV !== 'production') {
        return `http://localhost:2003`
    }
    return url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    })
}

const createWindow = async () => {
    if (process.env.NODE_ENV !== 'production') {
        await installExtensions();
    }

    win = new BrowserWindow({ width: 400, height: 150, frame: false, transparent: true, resizable: false });

    win.loadURL(createUrl())

    if (process.env.NODE_ENV !== 'production') {
        // Open DevTools
        win.webContents.openDevTools();
    }

    win.on('closed', () => {
        win = null;
    });
    // win.on('move', (event:any) => console.log(event.sender.getBounds()))
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});


// add open window from page app
ipcMain.on('open-window', (event: any, url: string) => {
    const winUrl: BrowserWindow = new BrowserWindow({ width: 800, height: 600, frame: false, transparent: true, })
    // winUrl.setMenu(null)
    winUrl.setAlwaysOnTop(true, "floating")
    winUrl.setVisibleOnAllWorkspaces(true)
    winUrl.setFullScreenable(false)
    winUrl.loadURL(createUrl() + `?openURL=${url}`)
})
