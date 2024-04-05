var ShutterSpeed = (function () {
    function ShutterSpeed(value_) {
        this.value_ = value_;
        this[_a] = 'ShutterSpeed';
        var name = Object.keys(ShutterSpeed.ID).find(function (key) { return ShutterSpeed.ID[key] === value_; });
        if (name) {
            this.label_ = name;
            this.seconds_ = 0;
        }
        else if ("".concat(value_) in ShutterSpeed.OneThirdValues) {
            this.seconds_ = ShutterSpeed.OneThirdValues[value_] || 0;
            this.label_ =
                ShutterSpeed.getLabelForSeconds(this.seconds_) + ' (1/3)';
        }
        else {
            this.seconds_ = ShutterSpeed.OneHalfValues[value_] || 0;
            this.label_ = ShutterSpeed.getLabelForSeconds(this.seconds_);
        }
    }
    ShutterSpeed.getLabelForSeconds = function (seconds) {
        var label = '';
        if (seconds > 0.2999) {
            label = seconds.toFixed(1).replace(/\.0+$/, '');
        }
        else if (seconds > 0.0) {
            label = "1/".concat(Math.round(1.0 / seconds));
        }
        return label;
    };
    Object.defineProperty(ShutterSpeed.prototype, "label", {
        get: function () {
            return this.label_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShutterSpeed.prototype, "value", {
        get: function () {
            return this.value_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShutterSpeed.prototype, "seconds", {
        get: function () {
            return this.seconds_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShutterSpeed.prototype, "stop", {
        get: function () {
            return "".concat(this.value_) in ShutterSpeed.OneThirdValues ? '1/3' : '1/2';
        },
        enumerable: false,
        configurable: true
    });
    ShutterSpeed.prototype[(_a = Symbol.toStringTag, Symbol.toPrimitive)] = function (hint) {
        switch (hint) {
            case 'number':
                return this.value_;
            case 'string':
                return this.label_;
            default:
                return null;
        }
    };
    ShutterSpeed.prototype.toJSON = function () {
        return {
            label: this.label,
            value: this.value,
            seconds: this.seconds,
            stop: this.stop,
        };
    };
    ShutterSpeed.findNearest = function (valueOrLabel, filter) {
        var seconds = 0;
        if (typeof valueOrLabel === 'string') {
            var speed = ShutterSpeed.forLabel(valueOrLabel);
            if (!speed) {
                return null;
            }
            seconds = speed.seconds;
        }
        else {
            seconds = new ShutterSpeed(valueOrLabel).seconds;
        }
        var found = Object.keys(ShutterSpeed.AllValues).reduce(function (carry, key) {
            var current = ShutterSpeed.AllValues[key];
            var difference = Math.abs(current - seconds);
            if (!carry || difference < carry.difference) {
                if (filter && !filter(new ShutterSpeed(+key))) {
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
            return new ShutterSpeed(found.value);
        }
        return null;
    };
    ShutterSpeed.forLabel = function (label) {
        if (label in ShutterSpeed.ID) {
            return new ShutterSpeed(ShutterSpeed.ID[label]);
        }
        var match = label.match(/(\d+(?:\.\d+)?)(?:\s*\/\s*(\d+))?(?:\s+(.*))?/);
        if (match) {
            var isOneThird = (match[3] || '').indexOf('1/3') >= 0;
            var seconds_1 = parseFloat(match[1]) || 0.0;
            if (match[2]) {
                seconds_1 /= parseFloat(match[2]);
            }
            var values_1 = isOneThird
                ? ShutterSpeed.OneThirdValues
                : ShutterSpeed.OneHalfValues;
            var value = Object.keys(values_1).find(function (straw) { return Math.abs(values_1[straw] - seconds_1) < 0.0000001; });
            return new ShutterSpeed(+(value || -1));
        }
        return null;
    };
    var _a;
    ShutterSpeed.ID = {
        Auto: 0,
        Bulb: 12,
        NotValid: 4294967295,
    };
    ShutterSpeed.OneHalfValues = {
        '16': 30,
        '19': 25,
        '20': 20,
        '24': 15,
        '27': 13,
        '28': 10,
        '32': 8,
        '36': 6,
        '37': 5,
        '40': 4,
        '43': 3.2,
        '44': 3,
        '45': 2.5,
        '48': 2,
        '51': 1.6,
        '52': 1.5,
        '53': 1.3,
        '56': 1,
        '59': 0.8,
        '60': 0.7,
        '61': 0.6,
        '64': 0.5,
        '67': 0.4,
        '68': 0.3,
        '72': 0.25,
        '75': 0.2,
        '76': 0.16666666666666666,
        '80': 0.125,
        '84': 0.1,
        '85': 0.07692307692307693,
        '88': 0.06666666666666667,
        '92': 0.05,
        '93': 0.04,
        '96': 0.03333333333333333,
        '99': 0.025,
        '100': 0.022222222222222223,
        '101': 0.02,
        '104': 0.016666666666666666,
        '107': 0.0125,
        '108': 0.011111111111111112,
        '109': 0.01,
        '112': 0.008,
        '115': 0.00625,
        '116': 0.005555555555555556,
        '117': 0.005,
        '120': 0.004,
        '123': 0.003125,
        '124': 0.002857142857142857,
        '125': 0.0025,
        '128': 0.002,
        '131': 0.0015625,
        '132': 0.0013333333333333333,
        '133': 0.00125,
        '136': 0.001,
        '139': 0.0008,
        '140': 0.0006666666666666666,
        '141': 0.000625,
        '144': 0.0005,
        '147': 0.0004,
        '148': 0.0003333333333333333,
        '149': 0.0003125,
        '152': 0.00025,
        '155': 0.0002,
        '156': 0.00016666666666666666,
        '157': 0.00015625,
        '160': 0.000125,
    };
    ShutterSpeed.OneThirdValues = {
        '21': 20,
        '29': 10,
        '35': 6,
        '69': 0.3,
        '77': 0.16666666666666666,
        '83': 0.1,
        '91': 0.05,
    };
    ShutterSpeed.AllValues = {
        '16': 30,
        '19': 25,
        '20': 20,
        '21': 20,
        '24': 15,
        '27': 13,
        '28': 10,
        '29': 10,
        '32': 8,
        '35': 6,
        '36': 6,
        '37': 5,
        '40': 4,
        '43': 3.2,
        '44': 3,
        '45': 2.5,
        '48': 2,
        '51': 1.6,
        '52': 1.5,
        '53': 1.3,
        '56': 1,
        '59': 0.8,
        '60': 0.7,
        '61': 0.6,
        '64': 0.5,
        '67': 0.4,
        '68': 0.3,
        '69': 0.3,
        '72': 0.25,
        '75': 0.2,
        '76': 0.16666666666666666,
        '77': 0.16666666666666666,
        '80': 0.125,
        '83': 0.1,
        '84': 0.1,
        '85': 0.07692307692307693,
        '88': 0.06666666666666667,
        '91': 0.05,
        '92': 0.05,
        '93': 0.04,
        '96': 0.03333333333333333,
        '99': 0.025,
        '100': 0.022222222222222223,
        '101': 0.02,
        '104': 0.016666666666666666,
        '107': 0.0125,
        '108': 0.011111111111111112,
        '109': 0.01,
        '112': 0.008,
        '115': 0.00625,
        '116': 0.005555555555555556,
        '117': 0.005,
        '120': 0.004,
        '123': 0.003125,
        '124': 0.002857142857142857,
        '125': 0.0025,
        '128': 0.002,
        '131': 0.0015625,
        '132': 0.0013333333333333333,
        '133': 0.00125,
        '136': 0.001,
        '139': 0.0008,
        '140': 0.0006666666666666666,
        '141': 0.000625,
        '144': 0.0005,
        '147': 0.0004,
        '148': 0.0003333333333333333,
        '149': 0.0003125,
        '152': 0.00025,
        '155': 0.0002,
        '156': 0.00016666666666666666,
        '157': 0.00015625,
        '160': 0.000125,
    };
    return ShutterSpeed;
}());
export { ShutterSpeed };
