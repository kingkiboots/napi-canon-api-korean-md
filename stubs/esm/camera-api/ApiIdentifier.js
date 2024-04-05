var _a;
var ApiIdentifier = (function () {
    function ApiIdentifier(identifier_, labels) {
        this.identifier_ = identifier_;
        this.labels = labels;
        this[_a] = 'ApiIdentifier';
        this.label_ =
            Object.keys(labels).find(function (key) { return labels[key] === identifier_; }) ||
                "0x".concat(this.identifier_.toString(16).padStart(8, '0'));
    }
    Object.defineProperty(ApiIdentifier.prototype, "label", {
        get: function () {
            return this.label_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiIdentifier.prototype, "identifier", {
        get: function () {
            return this.identifier_;
        },
        enumerable: false,
        configurable: true
    });
    ApiIdentifier.prototype[(_a = Symbol.toStringTag, Symbol.toPrimitive)] = function (hint) {
        switch (hint) {
            case 'number':
                return this.identifier_;
            case 'string':
                return "0x".concat(this.identifier_.toString(16).padStart(8, '0'));
            default:
                return null;
        }
    };
    ApiIdentifier.prototype.equalTo = function (other) {
        return this.identifier_ === +other;
    };
    ApiIdentifier.prototype.toJSON = function () {
        return {
            identifier: this.identifier_,
            label: this.label_,
        };
    };
    return ApiIdentifier;
}());
export { ApiIdentifier };
