var FileFormat = (function () {
    function FileFormat(value_) {
        var _this = this;
        this.value_ = value_;
        this[_a] = 'FileFormat';
        this.label_ =
            Object.keys(FileFormat.ID).find(function (key) { return FileFormat.ID[key] === _this.value_; }) || "0x".concat(value_.toString(16).padStart(8, '0'));
    }
    Object.defineProperty(FileFormat.prototype, "label", {
        get: function () {
            return this.label_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileFormat.prototype, "value", {
        get: function () {
            return this.value_;
        },
        enumerable: false,
        configurable: true
    });
    FileFormat.prototype[(_a = Symbol.toStringTag, Symbol.toPrimitive)] = function (hint) {
        switch (hint) {
            case 'number':
                return this.value_;
            case 'string':
                return this.label;
            default:
                return null;
        }
    };
    var _a;
    FileFormat.ID = {
        CR2: 45315,
        CR3: 45320,
        HEIF_CODE: 45323,
        JPEG: 14337,
        MP4: 47490,
        Unknown: 0,
    };
    return FileFormat;
}());
export { FileFormat };
