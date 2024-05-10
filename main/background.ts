import path from 'path';
import {app, ipcMain} from 'electron';
import serve from 'electron-serve';
import {createWindow} from './helpers';
import * as os from 'node:os';
import {detectOverloadedCpuPrograms, detectUnusedPrograms} from '@/main/helpers/process';
import {createNotificationWindow} from '@/main/helpers/create-notification';
import { checkBluetooth } from './helpers/checkBluetooth';
import { bluetoothDevices } from "systeminformation";
import { checkBattery } from './helpers/checkBattery';
import getOs from './helpers/getOs';


const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
    serve({directory: 'app'});
} else {
    app.setPath('userData', `${app.getPath('userData')} (development)`);
}

;(async () => {
    await app.whenReady();

    const mainWindow = createWindow('main', {
        width: 450,
        height: 628,
        show: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            backgroundThrottling: false // 백그라운드 성능 저하 방지
        }
    });

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
    setTimeout(async () => {
        // const unusedProcesses = await detectUnusedPrograms();
        // if (unusedProcesses?.length > 0) {
        //     createNotificationWindow('안 쓰는 프로그램 좀 삭제해줘!');
        // }

        createNotificationWindow('안 쓰는 프로그램 좀 삭제해줘!');
    }, 5000);

    setTimeout(async () => {
        // const overloadedCpuProcesses = await detectOverloadedCpuPrograms();
        // if (overloadedCpuProcesses?.length > 0) {
        //     createNotificationWindow('메일함 청소한지 좀 됐는데, 정리하자!');
        // }
        createNotificationWindow('메일함 청소한지 좀 됐는데, 정리하자!');
    }, 10000);

    if (isProd) {
        await mainWindow.loadURL('app://./home');
    } else {
        const port = process.argv[2];
        await mainWindow.loadURL(`http://localhost:${port}/main`);
        // mainWindow.webContents.openDevTools();
    }

    mainWindow.on('close', (event) => {

        event.preventDefault();
        mainWindow.hide(); // 윈도우를 닫지 않고 숨김

        return false;
    });

    global.mainWindow = mainWindow;
})();

app.on('window-all-closed', () => {
    app.quit();
});

ipcMain.on('message', async (event, arg) => {
    event.reply('message', `${arg} World!`);
});

ipcMain.on('open-main-window', async (event, arg) => {
    global.mainWindow.show();
});
