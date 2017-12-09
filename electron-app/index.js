const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain } = electron;
const Chapter = require('./classes/Chapter');
const fs = require('fs');


let mainWindow;
let developmentMode = true;
let mangaDirectory = '';

app.on('ready', () => {
    InitializeWindow();
});

/*************************************************************************/
/**
 * All Events
 */
ipcMain.on('app:fullscreen:toggle', (event) => {
    if (mainWindow.isFullScreen()) {
        mainWindow.setFullScreen(false);
        BuildMainMenu();
    }
    else {
        mainWindow.setFullScreen(true);
        DestroyMainMenu();
    }
});

ipcMain.on('app:directory:changed', (event, directoryPath) => {
    if (directoryPath) {
        fs.stat(directoryPath, (error, mainDirStat) => {
            if (error !== 'undefined') {
                if (mainDirStat.isDirectory())
                    mainWindow.webContents.send('app:directory:chapterList', PrepareChapters(directoryPath));
                else
                    SendError('Input path isn\'t a directory.');
            } else {
                SendError('Error while checking for the main directory. Please re-try selecting the directory again.');
            }
        });
    } else {
        return [{}];
    }
});

/*************************************************************************/

/**
 * Initializes the main window
 */
function InitializeWindow() {
    mainWindow = new BrowserWindow({
        show: false,
        width: 1120,
        height: 680,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false // required to open local images in browser
        }
    });

    if (developmentMode) {
        mainWindow.loadURL('http:\\localhost:4200');
    } else {
        mainWindow.loadURL(`file:\\\\\\${__dirname}\\dist\\index.html`);
    }

    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
        BuildMainMenu();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
        app.quit();
    });
}

/**
 * Builds & renders the main window's Menubar
 */
function BuildMainMenu() {
    let mainMenuTemplate = [];
    if (developmentMode) {
        mainMenuTemplate = [{
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forcereload' },
                { role: 'toggledevtools' },
                { type: 'separator' },
                { role: 'resetzoom' },
                { role: 'zoomin' },
                { role: 'zoomout' },
                { type: 'separator' },
                { role: 'togglefullscreen' },
                { type: 'separator' },
                {
                    role: 'quit',
                    accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q'
                }
            ]
        }]
    }

    if (process.platform === 'darwin') {
        mainMenuTemplate.unshift({
            label: app.getName(),
            submenu: [
                {
                    label: 'About the Developer',
                    accelerator: 'Command+I',
                    click() { OpenDeveloperPage(); }
                }
            ]
        });
    }
    else {
        mainMenuTemplate.push({
            label: 'About',
            submenu: [
                {
                    label: 'About the Developer',
                    accelerator: 'Ctrl+I',
                    click() { OpenDeveloperPage(); }
                }
            ]
        });
    }
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
}

/**
 * Destroys the main-menu
 */
function DestroyMainMenu() {
    Menu.setApplicationMenu(null);
}

/**
 * Opens the developer's page in the default browser
 */
function OpenDeveloperPage() {
    electron.shell.openExternal('https://github.com/gmastergreatee');
}

var allChapters = new Array();

function PrepareChapters(mainDirectory) {
    allChapters = new Array();
    getFilePaths(mainDirectory);
    const stuffToReturn = allChapters.map((chapter, index, allChaps) => {
        return {
            Id: null,
            'Name': chapter.Name,
            firstImageId: null,
            imageList: chapter.imageList,
            lastImageId: null
        };
    });
    return stuffToReturn;
}

function getFilePaths(mainDirectory = '') {
    let allFiles = fs.readdirSync(mainDirectory);

    for (let i = 0; i < allFiles.length; i++) {
        tempStat = fs.statSync(mainDirectory + '\\' + allFiles[i]);

        if (tempStat.isDirectory()) {
            let chapName = allFiles[i];

            let allImages = fs.readdirSync(mainDirectory + '\\' + allFiles[i]);
            const imgPaths = new Array();
            for (let j = 0; j < allImages.length; j++) {
                const tempImgStat = fs.statSync(mainDirectory + '\\' + chapName + '\\' + allImages[j]);
                if (!tempImgStat.isDirectory() && checkForImageValidity(allImages[j])) {
                    imgPaths.push(mainDirectory + '\\' + chapName + '\\' + allImages[j]);
                }
            }

            allChapters.push(new Chapter(chapName, imgPaths));
        }

    }
}

function checkForImageValidity(fileName = '') {
    let tempFile = fileName.substring(fileName.length - 5);
    if (tempFile.endsWith('jpeg') || tempFile.endsWith('png') || tempFile.endsWith('bmp') || tempFile.endsWith('jpg')) {
        return true;
    }
    return false;
}

/**
 * Send error messages to the angular app 
 */
function SendError(text = '') {
    mainWindow.webContents.send('app:error', text);
}