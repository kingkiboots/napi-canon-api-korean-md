var _a;
var STUB = 0;
STUB = 1;
var Directory = (function () {
    function Directory() {
        this[_a] = 'Directory';
        throw new Error('Not implemented - stub only.');
    }
    Object.defineProperty(Directory.prototype, "name", {
        get: function () {
            throw new Error('Not implemented - stub only.');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Directory.prototype, "length", {
        get: function () {
            throw new Error('Not implemented - stub only.');
        },
        enumerable: false,
        configurable: true
    });
    Directory.prototype.getEntries = function () {
        throw new Error('Not implemented - stub only.');
    };
    Directory.prototype[(_a = Symbol.toStringTag, Symbol.iterator)] = function () {
        throw new Error('Not implemented - stub only.');
    };
    return Directory;
}());
export { Directory };
