var Volume = (function () {
    function Volume() {
        this[_a] = 'Volume';
        throw new Error('Not implemented - stub only.');
    }
    Object.defineProperty(Volume.prototype, "label", {
        get: function () {
            throw new Error('Not implemented - stub only.');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Volume.prototype, "storageType", {
        get: function () {
            throw new Error('Not implemented - stub only.');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Volume.prototype, "isReadable", {
        get: function () {
            throw new Error('Not implemented - stub only.');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Volume.prototype, "isWritable", {
        get: function () {
            throw new Error('Not implemented - stub only.');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Volume.prototype, "freeCapacity", {
        get: function () {
            throw new Error('Not implemented - stub only.');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Volume.prototype, "maximumCapacity", {
        get: function () {
            throw new Error('Not implemented - stub only.');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Volume.prototype, "length", {
        get: function () {
            throw new Error('Not implemented - stub only.');
        },
        enumerable: false,
        configurable: true
    });
    Volume.prototype.getEntries = function () {
        throw new Error('Not implemented - stub only.');
    };
    Volume.prototype[(_a = Symbol.toStringTag, Symbol.iterator)] = function () {
        throw new Error('Not implemented - stub only.');
    };
    var _a;
    Volume.StorageType = {
        CFast: 5,
        CompactFlash: 1,
        HardDrive: 4,
        NoMemoryCard: 0,
        SDCard: 2,
    };
    return Volume;
}());
export { Volume };
