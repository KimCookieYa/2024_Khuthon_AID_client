import * as ps from 'ps-node';
import {IProcessInfo} from '@/renderer/types/process';
import si from 'systeminformation';


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

export function killProcess(pid: number) {
    ps.kill(pid, function (err) {
        if (err) {
            throw err;
        } else {
            console.log('Process %s has been killed!', pid);
        }
    });
}

export async function detectUnusedPrograms() {
    try {
        // 모든 프로세스 정보 가져오기
        const data = await si.processes();

        // 비활성으로 간주할 프로세스 목록
        const inactiveProcesses = data.list.filter(p => {
            // 예를 들어, CPU 시간이 매우 낮고 메모리 사용량이 높은 프로세스를 비활성으로 판단
            return p.cpu < 0.1 && p.mem > 0.5; // CPU 사용률이 0.1% 미만이고 메모리 사용량이 0.5% 이상인 프로세스
        }).map(p => ({
            name: p.name,
            started: p.started
        }));

        console.log('Potentially unused processe list:', inactiveProcesses);
        return inactiveProcesses;
    } catch (error) {
        console.error('Error fetching process list:', error);
    }
}

export async function detectOverloadedCpuPrograms() {
    try {
        const data = await si.processes();

        // CPU 과부하로 간주할 프로세스 목록
        const overloadedProcesses = data.list.filter(p => {
            // 예를 들어, CPU 시간이 매우 높은 프로세스를 CPU 과부하로 판단
            return p.cpu > 30; // CPU 사용률이 30% 이상인 프로세스
        }).map(p => ({
            name: p.name,
            cpu: p.cpu
        }));

        console.log('Potentially overloaded processe list:', overloadedProcesses);
        return overloadedProcesses;
    } catch (error) {
        console.error('Error fetching process list:', error);
    }
}