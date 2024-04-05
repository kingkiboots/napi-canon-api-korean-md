import { DirectoryEntry } from './Directory';
export declare class Volume {
    constructor();
    [Symbol.toStringTag]: string;
    get label(): string;
    get storageType(): number;
    get isReadable(): boolean;
    get isWritable(): boolean;
    get freeCapacity(): number;
    get maximumCapacity(): number;
    get length(): number;
    getEntries(): DirectoryEntry[];
    [Symbol.iterator](): DirectoryEntry[];
    static readonly StorageType: {
        [key: string]: number;
    };
}
