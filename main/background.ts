import path from 'path'
import { app, ipcMain, Notification} from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import * as os from 'node:os';
import {detectOverloadedCpuPrograms, detectUnusedPrograms, lookUpProcessInfo} from '@/main/helpers/process';
import {createNotificationWindow} from '@/main/helpers/create-notification';
import { checkBluetooth } from './helpers/checkBluetooth';
import { bluetoothDevices } from "systeminformation";
import { checkBattery } from './helpers/checkBattery';
import getOs from './helpers/getOs';

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  })

    let processInfo = [];
    // setTimeout(() => {
    //     //mainWindow.webContents.send('get-system-info', { memoryInfo: { cpu: os.cpus(), totalMemory: os.totalmem(), freeMemory: os.freemem() } });
    //     lookUpProcessInfo(processInfo)
    //     mainWindow.webContents.send('get-system-info', processInfo);
    //     createNotificationWindow('정신차려 동훈쿤!');
    // }, 3000);

    // setInterval(async ()=>{
    //   mainWindow.webContents.send('get-battery-info', await checkBattery());
    //   console.log(await getOs());
    // }, 5000)
    //
    // setTimeout(async () => {
    //     const unusedProcesses = await detectUnusedPrograms();
    //     if (unusedProcesses?.length > 0) {
    //         createNotificationWindow('사용하지 않는 프로세스가 감지되었습니다.');
    //     }
    // }, 5000);
    //
    // setInterval(async () => {
    //     const overloadedCpuProcesses = await detectOverloadedCpuPrograms();
    //     if (overloadedCpuProcesses?.length > 0) {
    //         createNotificationWindow('CPU 과부하가 감지되었습니다.');
    //     }
    //
    // }, 5000);

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
