import path from 'path'
import { app, ipcMain, Notification} from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import * as os from 'node:os';
import {lookUpProcessInfo} from '@/main/helpers/process';
import {createNotificationWindow} from '@/main/helpers/create-notification';

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })


    ipcMain.handle('get-system-info', async () => {
        const memoryInfo = {
            cpu: os.cpus(),
            totalMemory: os.totalmem(),
            freeMemory: os.freemem(),
        };
        const cpuInfo = os.cpus();
        return {memoryInfo, cpuInfo};
    });

    let processInfo = [];
    setTimeout(() => {
        //mainWindow.webContents.send('get-system-info', { memoryInfo: { cpu: os.cpus(), totalMemory: os.totalmem(), freeMemory: os.freemem() } });
        lookUpProcessInfo(processInfo)
        mainWindow.webContents.send('get-system-info', processInfo);
        createNotificationWindow('정신차려 동훈쿤!');
    }, 3000);


  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})
