import { DirectoryEntry } from './Directory';
import { FileFormat } from './FileFormat';
export declare class CameraFile implements DirectoryEntry {
    constructor();
    [Symbol.toStringTag]: string;
    get name(): string;
    get localFile(): string;
    get groupID(): number;
    get size(): number;
    get format(): FileFormat;
    downloadToPath(path: string): string;
    downloadToFile(fileName: string): string;
    downloadToString(): string;
    downloadThumbnailToString(): string;
}
