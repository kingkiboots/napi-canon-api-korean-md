var _a;
export class CameraFile {
    /**
     * Provided in the {@link DownloadRequestEvent}. Allows to download the file from camera.
     * @class CameraFile
     * @implements DirectoryEntry
     */
    constructor() {
        this[_a] = 'CameraFile';
        throw new Error('Not implemented - stub only.');
    }
    /**
     * Camera provided file name (without path)
     * @readonly
     */
    get name() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * Local file name including path after download.
     * @readonly
     */
    get localFile() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * Multiple formats of the same picture share an ID
     * @readonly
     */
    get groupID() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * File/image size in bytes
     * @readonly
     */
    get size() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * Format
     * @readonly
     */
    get format() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * Download into a path using camera provided file name
     *
     * @param {string} path
     * @return {string} local file name
     */
    downloadToPath(path) {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * Download into a specific file
     *
     * @param {string} fileName
     * @return {string} local file name
     */
    downloadToFile(fileName) {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * Download into a base64 encoded string
     *
     * @return {string} base64 encoded string
     */
    downloadToString() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * Download thumbnail into a base64 encoded string
     *
     * @return {string} base64 encoded string
     */
    downloadThumbnailToString() {
        throw new Error('Not implemented - stub only.');
    }
}
_a = Symbol.toStringTag;
