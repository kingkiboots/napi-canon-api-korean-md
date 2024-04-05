var _a;
export class FileFormat {
    /**
     * @class FileFormat
     * @param {number} value_
     */
    constructor(value_) {
        this.value_ = value_;
        this[_a] = 'FileFormat';
        this.label_ =
            Object.keys(FileFormat.ID).find((key) => FileFormat.ID[key] === this.value_) || `0x${value_.toString(16).padStart(8, '0')}`;
    }
    /**
     * @readonly
     * @type {string}
     */
    get label() {
        return this.label_;
    }
    /**
     * @readonly
     * @type {number}
     */
    get value() {
        return this.value_;
    }
    /**
     * Allows type cast to number - returns the value.
     * @param {string} hint
     * @return {number|string|null}
     */
    [(_a = Symbol.toStringTag, Symbol.toPrimitive)](hint) {
        switch (hint) {
            case 'number':
                return this.value_;
            case 'string':
                return this.label;
            default:
                return null;
        }
    }
}
// Generate: FileFormat
/**
 * @readonly
 * @enum {number}
 */
FileFormat.ID = {
    CR2: 45315,
    CR3: 45320,
    HEIF_CODE: 45323,
    JPEG: 14337,
    MP4: 47490,
    Unknown: 0,
};
