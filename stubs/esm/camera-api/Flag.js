var Flag = (function () {
    function Flag(value) {
        this[_a] = 'Flag';
        if (typeof value === 'boolean') {
            this.value_ = value ? Flag.True : Flag.False;
        }
        else if (value === Flag.True) {
            this.value_ = Flag.True;
        }
        else {
            this.value_ = Flag.False;
        }
        if (this.value_ === Flag.True) {
            this.label_ = 'true';
        }
        else {
            this.label_ = 'false';
        }
    }
    Object.defineProperty(Flag.prototype, "label", {
        get: function () {
            return this.label_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Flag.prototype, "value", {
        get: function () {
            return this.value_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Flag.prototype, "flag", {
        get: function () {
            return this.value_ !== 0;
        },
        enumerable: false,
        configurable: true
    });
    Flag.prototype[(_a = Symbol.toStringTag, Symbol.toPrimitive)] = function (hint) {
        switch (hint) {
            case 'number':
                return this.value_;
            case 'string':
                return this.label_;
            default:
                return null;
        }
    };
    Flag.prototype.toJSON = function () {
        return {
            label: this.label,
            value: this.value,
            flag: this.flag,
        };
    };
    Flag.forLabel = function (label) {
        if (['true', '1', 'yes', 'on'].indexOf(label.toLowerCase()) >= 0) {
            return new Flag(Flag.True);
        }
        return new Flag(Flag.False);
    };
    var _a;
    Flag.True = 1;
    Flag.False = 0;
    return Flag;
}());
export { Flag };
