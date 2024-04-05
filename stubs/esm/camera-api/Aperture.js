var Aperture = (function () {
    function Aperture(value_) {
        this.value_ = value_;
        this[_a] = 'Aperture';
        var name = Object.keys(Aperture.ID).find(function (key) { return Aperture.ID[key] === value_; });
        var formatAperture = function (aperture) {
            return 'f' + aperture.toFixed(1).replace(/\.0$/, '');
        };
        if (name) {
            this.label_ = name;
            this.aperture_ = 0;
        }
        else if ("".concat(value_) in Aperture.OneThirdValues) {
            this.aperture_ = Aperture.OneThirdValues[value_] || 0;
            this.label_ = formatAperture(this.aperture_) + ' (1/3)';
        }
        else {
            this.aperture_ = Aperture.OneHalfValues[value_] || 0;
            this.label_ = formatAperture(this.aperture_);
        }
    }
    Object.defineProperty(Aperture.prototype, "label", {
        get: function () {
            return this.label_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Aperture.prototype, "value", {
        get: function () {
            return this.value_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Aperture.prototype, "aperture", {
        get: function () {
            return this.aperture_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Aperture.prototype, "stop", {
        get: function () {
            return "".concat(this.value_) in Aperture.OneThirdValues ? '1/3' : '1/2';
        },
        enumerable: false,
        configurable: true
    });
    Aperture.prototype[(_a = Symbol.toStringTag, Symbol.toPrimitive)] = function (hint) {
        switch (hint) {
            case 'number':
                return this.value_;
            case 'string':
                return this.label_;
            default:
                return null;
        }
    };
    Aperture.prototype.toJSON = function () {
        return {
            label: this.label,
            value: this.value,
            aperture: this.aperture,
            stop: this.stop,
        };
    };
    Aperture.findNearest = function (valueOrLabel, filter) {
        var aperture;
        if (typeof valueOrLabel === 'string') {
            var a = Aperture.forLabel(valueOrLabel);
            if (!a) {
                return null;
            }
            aperture = a.aperture;
        }
        else {
            aperture = new Aperture(valueOrLabel).aperture;
        }
        var found = Object.keys(Aperture.AllValues).reduce(function (carry, key) {
            var current = Aperture.AllValues[key];
            var difference = Math.abs(current - aperture);
            if (!carry || difference < carry.difference) {
                if (filter && !filter(new Aperture(+key))) {
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
            return new Aperture(found.value);
        }
        return null;
    };
    Aperture.forLabel = function (label) {
        if (label in Aperture.ID) {
            return new Aperture(Aperture.ID[label]);
        }
        var match = label.match(/f?(\d+(?:\.\d+)?)\s*(.*)/);
        if (match) {
            var aperture_1 = parseFloat(match[1]) || 0.0;
            var isOneThird = match[2].indexOf('1/3') >= 0;
            var values_1 = isOneThird
                ? Aperture.OneThirdValues
                : Aperture.OneHalfValues;
            var value = Object.keys(values_1).find(function (straw) { return Math.abs(values_1[straw] - aperture_1) < 0.00001; });
            return new Aperture(+(value || -1));
        }
        return null;
    };
    var _a;
    Aperture.ID = {
        Auto: 0,
        NotValid: 4294967295,
    };
    Aperture.OneHalfValues = {
        '8': 1,
        '11': 1.1,
        '12': 1.2,
        '16': 1.4,
        '19': 1.6,
        '20': 1.8,
        '24': 2,
        '27': 2.2,
        '28': 2.5,
        '32': 2.8,
        '35': 3.2,
        '36': 3.5,
        '40': 4,
        '43': 4.5,
        '44': 4.5,
        '45': 5,
        '48': 5.6,
        '51': 6.3,
        '52': 6.7,
        '53': 7.1,
        '56': 8,
        '59': 9,
        '60': 9.5,
        '61': 10,
        '64': 11,
        '68': 13,
        '69': 14,
        '72': 16,
        '75': 18,
        '76': 19,
        '77': 20,
        '80': 22,
        '83': 25,
        '84': 27,
        '85': 29,
        '88': 32,
        '91': 36,
        '92': 38,
        '93': 40,
        '96': 45,
        '99': 51,
        '100': 54,
        '101': 57,
        '104': 64,
        '107': 72,
        '108': 76,
        '109': 80,
        '112': 91,
        '133': 3.4,
    };
    Aperture.OneThirdValues = {
        '13': 1.2,
        '21': 1.8,
        '29': 2.5,
        '37': 3.5,
        '67': 13,
    };
    Aperture.AllValues = {
        '8': 1,
        '11': 1.1,
        '12': 1.2,
        '13': 1.2,
        '16': 1.4,
        '19': 1.6,
        '20': 1.8,
        '21': 1.8,
        '24': 2,
        '27': 2.2,
        '28': 2.5,
        '29': 2.5,
        '32': 2.8,
        '35': 3.2,
        '36': 3.5,
        '37': 3.5,
        '40': 4,
        '43': 4.5,
        '44': 4.5,
        '45': 5,
        '48': 5.6,
        '51': 6.3,
        '52': 6.7,
        '53': 7.1,
        '56': 8,
        '59': 9,
        '60': 9.5,
        '61': 10,
        '64': 11,
        '67': 13,
        '68': 13,
        '69': 14,
        '72': 16,
        '75': 18,
        '76': 19,
        '77': 20,
        '80': 22,
        '83': 25,
        '84': 27,
        '85': 29,
        '88': 32,
        '91': 36,
        '92': 38,
        '93': 40,
        '96': 45,
        '99': 51,
        '100': 54,
        '101': 57,
        '104': 64,
        '107': 72,
        '108': 76,
        '109': 80,
        '112': 91,
        '133': 3.4,
    };
    return Aperture;
}());
export { Aperture };
