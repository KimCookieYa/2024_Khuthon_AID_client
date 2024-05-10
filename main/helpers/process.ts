import * as ps from 'ps-node';
import {IProcessInfo} from '@/renderer/types/process';


export function lookUpProcessInfo(processInfo: IProcessInfo[]) {
    ps.lookup({}, function (err, resultList) {
        if (err) {
            throw err;
        }

        for (const process of resultList) {
            if (process) {
                // console.log('PID: %s, COMMAND: %s, ARGUMENTS: %s, MEMORY USAGE: %s', process.pid, process.command, process.arguments);
                processInfo.push({
                    pid: process.pid,
                    command: process.command,
                    arguments: process.arguments
                });
            }
        }
    });
}