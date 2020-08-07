'use strict'

import { app, Menu, BrowserWindow } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'
import initEventListener from './msgCommunicate'
import addon from "./clInfo"

const isDevelopment = process.env.NODE_ENV !== 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow

function createMainWindow() {
    const window = new BrowserWindow({ webPreferences: { nodeIntegration: true } })

    if (isDevelopment) {
        window.webContents.openDevTools()
    }

    if (isDevelopment) {
        window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
        //window.loadFile(path.resolve(path.join(__dirname, '../renderer/index.html')));
    }
    else {
        window.loadURL(formatUrl({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file',
            slashes: true
        }))
    }

    window.on('closed', () => {
        mainWindow = null
    })

    window.webContents.on('devtools-opened', () => {
        window.focus()
        setImmediate(() => {
            window.focus()
        })
    })

    // 初始化按钮区域
    // initWindowMenu()

    // 初始化主线程和渲染线程的事件交互
    initEventListener()

    return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
    // on macOS it is common for applications to stay open until the user explicitly quits
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // on macOS it is common to re-create a window even after all windows have been closed
    if (mainWindow === null) {
        mainWindow = createMainWindow()
    }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
    mainWindow = createMainWindow()
})

function initWindowMenu() {
    let menuItem =
        [
            {
                label: '文件',
                accelerator: 'ctrl+F',
                click: () => {
                    // 展示模态框
                    
                }
            },
            {
                label: '视图',
                accelerator: 'ctrl+G',
                submenu: [
                    {
                        label: '开发者工具',
                        click: () => {
                            mainWindow.webContents.openDevTools();
                        }
                    },
                    {label: '另存'}
                ],
                click: () => {
                    // 展示模态框
                    
                }
            },
        ]
    let tempMenu = Menu.buildFromTemplate(menuItem)
    Menu.setApplicationMenu(tempMenu);
}
