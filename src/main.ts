import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';

import createSaver from './lowLevel/saver';
const debounce = require('lodash.debounce');

const urlWinSaver = createSaver('openURL');

type URLWinSettings = {
    width: number;
    height: number;
    x: number;
    y: number;
};
let urlWinSettings: URLWinSettings = {
    width: 1280,
    height: 720,
    x: 0,
    y: 0
};
const urlWinSave = debounce(() => urlWinSaver.save(urlWinSettings), 200);

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
        return `http://localhost:2003/`;
    }
    return url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    });
};

const createWindow = async () => {
    if (process.env.NODE_ENV !== 'production') {
        await installExtensions();
    }

    win = new BrowserWindow({
        width: 400,
        height: 150,
        frame: false,
        transparent: true,
        resizable: false,
        show: false
    });

    win.loadURL(createUrl());

    try {
        urlWinSettings = (await urlWinSaver.load()) as URLWinSettings;
    } catch (e) {
        console.log(e);
    }
    win.show();

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
    const winUrl: BrowserWindow = new BrowserWindow({
        width: urlWinSettings.width,
        height: urlWinSettings.height,
        frame: false,
        transparent: true,
        x: urlWinSettings.x,
        y: urlWinSettings.y
    });
    // winUrl.setMenu(null)
    winUrl.setAlwaysOnTop(true, 'floating');
    winUrl.setVisibleOnAllWorkspaces(true);
    winUrl.setFullScreenable(false);
    winUrl.loadURL(createUrl() + `#openURL/${url}`);
    const updateSettings = (event: any) => {
        urlWinSettings = event.sender.getBounds();
        urlWinSave();
    };
    winUrl.on('resize', updateSettings);
    winUrl.on('move', updateSettings);
});
