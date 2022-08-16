import { CachedClass } from "./CachedClass";
import AyayaLeague from '../LeagueReader';
import { OFFSET } from "../consts/Offsets";
import { readName } from "../StructureReader";

const Reader = AyayaLeague.reader;

export class Buff extends CachedClass {


    constructor(private address: number) { super(); }

    private get entry() {
        return this.use('entry', () => Reader.readProcessMemory(this.address + 0x8, "DWORD"))
    }

    get name() {
        return this.use('name', () => readName(this.entry + OFFSET.oBuffName, true));
    }

    get startTime() {
        return this.use('startTime', () => Reader.readProcessMemory(this.address + OFFSET.oBuffStartTime, "FLOAT"));
    }

    get endtime() {
        return this.use('endtime', () => Reader.readProcessMemory(this.address + OFFSET.oBuffEndTime, "FLOAT"));
    }

    get count(): number {
        return this.use('count', () => Reader.readProcessMemory(this.address + OFFSET.oBuffCount, "DWORD"));
    }


}