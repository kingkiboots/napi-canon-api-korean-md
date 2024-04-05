export interface DirectoryEntry {
    name: string;
}
export declare class Directory implements DirectoryEntry {
    private constructor();
    [Symbol.toStringTag]: string;
    get name(): string;
    get length(): number;
    getEntries(): DirectoryEntry[];
    [Symbol.iterator](): DirectoryEntry[];
}
