var _a;
export class Volume {
    /**
     * @class Volume
     *
     * @example
     *
     * ```typescript
     * import { Camera, Directory, watchCameras } from '../';
     *
     * process.on('SIGINT', () => process.exit());
     *
     * try {
     *     const camera = new Camera();
     *     camera.connect();
     *
     *     for (const volume of camera.getVolumes()) {
     *         console.log(volume);
     *         for (const entry of volume.getEntries()) {
     *             console.log(entry);
     *         }
     *     }
     * } catch (e) {
     *     console.log(e);
     * }
     * ```
     */
    constructor() {
        this[_a] = 'Volume';
        throw new Error('Not implemented - stub only.');
    }
    /**
     * @readonly
     * @return {string}
     */
    get label() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * Storage type
     * @readonly
     * @see Volume.StorageType
     * @return {number}
     */
    get storageType() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * @return {boolean}
     */
    get isReadable() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * @return {boolean}
     */
    get isWritable() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * @return {number}
     */
    get freeCapacity() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * @return {number}
     */
    get maximumCapacity() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * Entry count
     * @return {number}
     */
    get length() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * @return {DirectoryEntry[]}
     */
    getEntries() {
        throw new Error('Not implemented - stub only.');
    }
    [(_a = Symbol.toStringTag, Symbol.iterator)]() {
        throw new Error('Not implemented - stub only.');
    }
}
// Generate: Volume
/**
 * @readonly
 * @enum {number}
 */
Volume.StorageType = {
    CFast: 5,
    CompactFlash: 1,
    HardDrive: 4,
    NoMemoryCard: 0,
    SDCard: 2,
};
