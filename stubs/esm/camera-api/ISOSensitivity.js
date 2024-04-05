var ISOSensitivity = (function () {
    function ISOSensitivity(value_) {
        this.value_ = value_;
        this[_a] = 'ISOSensitivity';
        if (value_ === 0) {
            this.label_ = 'Auto';
            this.sensitivity_ = 0;
        }
        else {
            this.sensitivity_ = ISOSensitivity.Values[value_] || 0;
            this.label_ = this.sensitivity_.toString();
        }
    }
    Object.defineProperty(ISOSensitivity.prototype, "label", {
        get: function () {
            return this.label_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ISOSensitivity.prototype, "value", {
        get: function () {
            return this.value_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ISOSensitivity.prototype, "sensitivity", {
        get: function () {
            return this.sensitivity_;
        },
        enumerable: false,
        configurable: true
    });
    ISOSensitivity.prototype[(_a = Symbol.toStringTag, Symbol.toPrimitive)] = function (hint) {
        switch (hint) {
            case 'number':
                return this.value_;
            case 'string':
                return this.label_;
            default:
                return null;
        }
    };
    ISOSensitivity.prototype.toJSON = function () {
        return {
            label: this.label,
            value: this.value,
            ISOSensitivity: this.sensitivity,
        };
    };
    ISOSensitivity.findNearest = function (valueOrLabel, filter) {
        var sensitivity;
        if (typeof valueOrLabel === 'string') {
            var iso = ISOSensitivity.forLabel(valueOrLabel);
            if (!iso) {
                return null;
            }
            sensitivity = iso.sensitivity;
        }
        else {
            sensitivity = new ISOSensitivity(valueOrLabel).sensitivity;
        }
        var found = Object.keys(ISOSensitivity.Values).reduce(function (carry, key) {
            var current = ISOSensitivity.Values[key];
            var difference = Math.abs(current - sensitivity);
            if (!carry || difference < carry.difference) {
                if (filter && !filter(new ISOSensitivity(+key))) {
                    return carry;
                }
                return {
                    value: +key,
                    difference: difference,
                };
            }
            return carry;
        }, null);
        if (found) {
            return new ISOSensitivity(found.value);
        }
        return null;
    };
    ISOSensitivity.forLabel = function (label) {
        if (label in ISOSensitivity.ID) {
            return new ISOSensitivity(ISOSensitivity.ID[label]);
        }
        var value = Object.keys(ISOSensitivity.Values).find(function (key) { return ISOSensitivity.Values[key] === +label; });
        if (value) {
            return new ISOSensitivity(+value);
        }
        return null;
    };
    var _a;
    ISOSensitivity.ID = {
        Auto: 0,
    };
    ISOSensitivity.Values = {
        '40': 6,
        '48': 12,
        '56': 25,
        '64': 50,
        '72': 100,
        '75': 125,
        '77': 160,
        '80': 200,
        '83': 250,
        '85': 320,
        '88': 400,
        '91': 500,
        '93': 640,
        '96': 800,
        '99': 1000,
        '101': 1250,
        '104': 1600,
        '107': 2000,
        '109': 2500,
        '112': 3200,
        '115': 4000,
        '117': 5000,
        '120': 6400,
        '123': 8000,
        '125': 10000,
        '128': 12800,
        '131': 16000,
        '133': 20000,
        '136': 25600,
        '139': 32000,
        '141': 40000,
        '144': 51200,
        '147': 64000,
        '149': 80000,
        '152': 102400,
        '160': 204800,
        '168': 409600,
        '176': 819200,
    };
    return ISOSensitivity;
}());
export { ISOSensitivity };
