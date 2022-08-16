import Reader from './MemoryReader';
import { Entity } from './models/Entity';
import * as math from 'mathjs';



type EntityKey = keyof Entity;
type EntityKeys = (EntityKey)[];

export type EntityReadOptions = Partial<{ onlyProps: EntityKeys, skipProps: EntityKeys }>;



export function readName(address: number, forceFirstAddress: boolean = false): string {
    try {
        const length = Reader.readProcessMemory(address + 0x10, 'DWORD');
        if ((length < 16 && length > 0) || forceFirstAddress) return Reader.readProcessMemory(address, 'STR');
        const nameAddress = Reader.readProcessMemory(address, 'DWORD');
        const name = Reader.readProcessMemory(nameAddress, 'STR');

        if (name.startsWith(' ') || name.length == 0) {
            console.log('ERROR READING NAME AT', address);
        }
        return name;
    } catch (ex) {
        return "__NO_NAME__"
    }
}

export function readMap(rootNode: number, size?: number) {
    const checked = new Set<number>();
    const toCheck = new Set<number>();
    toCheck.add(rootNode);
    while (toCheck.size > 0) {
        const target: number = Array.from(toCheck.values())[0];
        checked.add(target);
        toCheck.delete(target);
        const nextObject1 = Reader.readProcessMemory(target + 0x0, "DWORD");
        if (!checked.has(nextObject1)) toCheck.add(nextObject1);
        if (size && checked.size >= size) break;
        const nextObject2 = Reader.readProcessMemory(target + 0x4, "DWORD");
        if (!checked.has(nextObject2)) toCheck.add(nextObject2);
        if (size && checked.size >= size) break;
        const nextObject3 = Reader.readProcessMemory(target + 0x8, "DWORD");
        if (!checked.has(nextObject3)) toCheck.add(nextObject3);
        if (size && checked.size >= size) break;
    }
    return Array.from(checked.values());
}


export function readMatrix(address: number): math.Matrix {
    const buffer = Reader.readProcessMemoryBuffer(address, 64, true);

    const matrix = math.matrix([
        [
            buffer.readFloatLE(0 * 4), buffer.readFloatLE(1 * 4),
            buffer.readFloatLE(2 * 4), buffer.readFloatLE(3 * 4)
        ],
        [
            buffer.readFloatLE(4 * 4), buffer.readFloatLE(5 * 4),
            buffer.readFloatLE(6 * 4), buffer.readFloatLE(7 * 4)
        ],
        [
            buffer.readFloatLE(8 * 4), buffer.readFloatLE(9 * 4),
            buffer.readFloatLE(10 * 4), buffer.readFloatLE(11 * 4)
        ],
        [
            buffer.readFloatLE(12 * 4), buffer.readFloatLE(13 * 4),
            buffer.readFloatLE(14 * 4), buffer.readFloatLE(15 * 4)
        ]
    ]);
    return matrix;
}
export function readVTable(address: number): number[] {
    const result: number[] = [];
    const list = Reader.readProcessMemory(address + 0x4, "DWORD");
    const size = Reader.readProcessMemory(address + 0x8, "DWORD");
    for (let i = 0; i < size; i++) {
        result.push(Reader.readProcessMemory(list + (i * 0x4), "DWORD"));
    }
    return result;

}