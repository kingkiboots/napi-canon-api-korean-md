var _a;
export class LiveViewImage {
    /**
     * Provided in {@link Camera#getLiveViewImage}. Allows to download the file from camera.
     * @class LiveViewImage
     */
    constructor() {
        this[_a] = 'LiveViewImage';
        throw new Error('Not implemented - stub only.');
    }
    /**
     * Return as data url, the image will be base64 encoded.
     *
     * @return {string} data url
     */
    getDataURL() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * Coordinate system of the live view image
     *
     * @readonly
     * @returns {Size}
     */
    get coordinateSystem() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * @readonly
     * @returns {Histogram}
     */
    get histogram() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * @readonly
     * @returns {Option}
     */
    get histogramStatus() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * Cropping position of the enlarged live view image
     * @readonly
     * @returns {Position}
     */
    get position() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * Visible area information according to Canon camera aspect settings
     *
     * @readonly
     * @returns {Rectangle}
     */
    get visibleArea() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * The zoom factor
     *
     * @readonly
     * @returns {Option}
     */
    get zoom() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * The focus and zoom border position
     *
     * @readonly
     * @returns {Position}
     */
    get zoomPosition() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * Focus and zoom border rectangle
     *
     * @readonly
     * @returns {Rectangle}
     */
    get zoomArea() {
        throw new Error('Not implemented - stub only.');
    }
}
_a = Symbol.toStringTag;
