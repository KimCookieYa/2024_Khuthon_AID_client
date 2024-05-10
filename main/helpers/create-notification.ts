import {screen} from 'electron';
import path from 'path';
import {createWindow} from '@/main/helpers/create-window';


export async function createNotificationWindow(message) {
    console.log('create notification window');
    let notificationWindow = createWindow('notification', {
        width: 300,
        height: 100,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        frame: false,
    });

    const port = process.argv[2];
    // notificationWindow.loadFile(path.join(__dirname, '../notification.html'));
    await notificationWindow.loadURL(`http://localhost:${port}/notification?message=${message}`);

    const primaryDisplay = screen.getPrimaryDisplay();
    const {width, height} = primaryDisplay.workAreaSize;

    notificationWindow.setPosition(width - 300, height - 100);

    // Close the window after 3 seconds
    setTimeout(() => {
        notificationWindow.close();
    }, 3000);
}