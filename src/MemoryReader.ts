
import * as mem from 'memoryjs';
import * as fs from 'fs';
import * as path from 'path';

import type { Process } from './models/mem/Process';
import type { Module } from './models/mem/Module';
import { Vector3 } from './models/Vector';

export class AyayaMemoryReader {
    leagueProcess: Process;
    leagueModule: Module;
    private baseAddress: number;
    private handle: number;
    public hooked = false;
    public memInstance = mem;

    private mode: "LEAGUE" | "DUMP" = "LEAGUE";
    private dump: Buffer;
    private dumpInfo: { baseAddress: number };

    get baseAddr() { return this.baseAddress; }
    get pHandle() { return this.handle; }

    get dumpSize() { return this.dump ? this.dump.length : 0 }

    loadDump() {
        this.dump = fs.readFileSync('./dump/dump.hex');
        this.dumpInfo = JSON.parse(fs.readFileSync('./dump/dump.info', 'utf8'));
    }

    setMode(readMode: "LEAGUE" | "DUMP") {
        this.mode = readMode;
        console.log('Mode set to', this.mode)
    }

    getMode() {
        return this.mode;
    }

    hookLeagueProcess() {

        const processes: Process[] = mem.getProcesses();

        const league = processes.find(e => e.szExeFile == 'League of Legends.exe');
        if (!league) throw Error('League process not found');

        const pid = league.th32ProcessID;

        const leagueModule = mem.findModule('League of Legends.exe', pid);
        if (!leagueModule) throw Error('League module not found');
        this.leagueModule = leagueModule;

        this.leagueProcess = mem.openProcess(pid);
        this.baseAddress = this.leagueProcess.modBaseAddr;
        this.handle = this.leagueProcess.handle;
        this.hooked = true;
    }

    readProcessMemory(address: number, type: string, fromBaseAddress: boolean = false) {

        if (this.mode == "DUMP") {

            try {
                if (type == 'DWORD' || type == 'INT' || type == 'INT32' || type == 'PTR')
                    return this.dump.readInt32LE(address + (fromBaseAddress ? 0 : -this.dumpInfo.baseAddress));

                if (type == 'FLOAT')
                    return this.dump.readFloatLE(address + (fromBaseAddress ? 0 : -this.dumpInfo.baseAddress));

                if (type == 'BOOL')
                    return this.dump.at(address + (fromBaseAddress ? 0 : -this.dumpInfo.baseAddress)) == 1;

                if (type == 'STR' || type == 'STRING') {
                    const chars = [];

                    for (let i = 0; i < 50; i++) {
                        const target = this.dump.at(i + address + (fromBaseAddress ? 0 : -this.dumpInfo.baseAddress));
                        if (target == 0) break;
                        chars.push(String.fromCharCode(target));
                    }
                    return chars.join('');
                }

                if (type == 'VEC3') {
                    const result = new Vector3(
                        this.dump.readFloatLE(0 + address + (fromBaseAddress ? 0 : -this.dumpInfo.baseAddress)),
                        this.dump.readFloatLE(4 + address + (fromBaseAddress ? 0 : -this.dumpInfo.baseAddress)),
                        this.dump.readFloatLE(8 + address + (fromBaseAddress ? 0 : -this.dumpInfo.baseAddress)),
                    );
                    return result;
                }
            } catch (ex) {
                console.log('ERROR', ex);
                return 0;
            }

            throw Error('Type not implemented: ' + type);
        }

        if (!this.hooked && this.mode == "LEAGUE") throw Error('You need to hook league process before reading memory');

        if (type == 'STR' || type == 'STRING') {

            const chars = [];

            const buff = mem.readBuffer(this.handle, address + (fromBaseAddress ? this.baseAddress : 0), 50)
            for (let i = 0; i < buff.length; i++) {
                const target = buff.at(i);
                if (target == 0 && i > 0) break;
                chars.push(String.fromCharCode(target));
            }
            return chars.join('');
        }

        return mem.readMemory(this.handle, address + (fromBaseAddress ? this.baseAddress : 0), type);
    }

    readProcessMemoryBuffer(address: number, size: number, fromBaseAddress: boolean = false): Buffer {
        if (this.mode == "DUMP") {
            const start = address + (fromBaseAddress ? 0 : -this.dumpInfo.baseAddress);
            return this.dump.subarray(start, start + size)
        }
        if (!this.hooked && this.mode == "LEAGUE") throw Error('You need to hook league process before reading memory');
        return mem.readBuffer(this.handle, address + (fromBaseAddress ? this.baseAddress : 0), size);
    }

    callFunction(args, returnType, address) {
        return mem.callFunction(this.handle, args, returnType, address);
    }

    toHex(int: number) {
        return '0x' + int.toString(16).toUpperCase();
    }

}

const instance = new AyayaMemoryReader;

export default instance;
