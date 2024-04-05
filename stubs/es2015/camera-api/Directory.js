var _a;
let STUB = 0;
/**
 * @interface DirectoryEntry
 * @property {string} name
 */
STUB = 1;
export class Directory {
    /**
     * @class Directory
     * @implements DirectoryEntry
     */
    constructor() {
        this[_a] = 'Directory';
        throw new Error('Not implemented - stub only.');
    }
    /**
     * @readonly
     * @return {string}
     */
    get name() {
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
