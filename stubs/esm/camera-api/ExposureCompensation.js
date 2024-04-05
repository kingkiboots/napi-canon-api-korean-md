var ExposureCompensation = (function () {
    function ExposureCompensation(value_) {
        this.value_ = value_;
        this[_a] = 'ExposureCompensation';
        this.compensation_ = ExposureCompensation.Values[value_] || 0;
        this.label_ = ExposureCompensation.getLabelForCompensation(this.compensation_);
    }
    ExposureCompensation.getLabelForCompensation = function (compensation) {
        var label = '';
        if (compensation === 0) {
            return '0';
        }
        var full = compensation > 0
            ? Math.floor(compensation)
            : Math.ceil(compensation);
        var fraction = Math.abs(compensation - full);
        label = full > 0 ? '+' + String(full) : String(full);
        if (fraction > 0.6) {
            label += ' 2/3';
        }
        else if (fraction > 0.49) {
            label += ' 1/2';
        }
        else if (fraction > 0.3) {
            label += ' 1/3';
        }
        return label;
    };
    Object.defineProperty(ExposureCompensation.prototype, "label", {
        get: function () {
            return this.label_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExposureCompensation.prototype, "value", {
        get: function () {
            return this.value_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExposureCompensation.prototype, "compensation", {
        get: function () {
            return this.compensation_;
        },
        enumerable: false,
        configurable: true
    });
    ExposureCompensation.prototype[(_a = Symbol.toStringTag, Symbol.toPrimitive)] = function (hint) {
        switch (hint) {
            case 'number':
                return this.value_;
            case 'string':
                return this.label_;
            default:
                return null;
        }
    };
    ExposureCompensation.findNearest = function (compensation) {
        var found = Object.keys(ExposureCompensation.Values).reduce(function (carry, key) {
            if (carry.difference < 0.001) {
                return carry;
            }
            var current = ExposureCompensation.Values[key];
            var difference = Math.abs(current - compensation);
            if (difference < carry.difference) {
                return {
                    value: +key,
                    difference: difference,
                };
            }
            return carry;
        }, {
            value: 0,
            difference: 100,
        });
        if (found) {
            return found.value;
        }
        return null;
    };
    ExposureCompensation.forLabel = function (label) {
        var match = label.match(/([+-]\d+)\s+(?:([12])\/([23]))?/);
        if (match) {
            var compensation = parseFloat(match[1]);
            if (match[2] && match[3]) {
                if (compensation < 0) {
                    compensation -= parseFloat(match[2]) / parseFloat(match[3]);
                }
                else {
                    compensation += parseFloat(match[2]) / parseFloat(match[3]);
                }
            }
            var value = ExposureCompensation.findNearest(compensation);
            if (value) {
                return new ExposureCompensation(value);
            }
        }
        return null;
    };
    var _a;
    ExposureCompensation.Values = {
        '0': 0,
        '3': 0.3333333333333333,
        '4': 0.5,
        '5': 0.6666666666666666,
        '8': 1,
        '11': 1.3333333333333333,
        '12': 1.5,
        '13': 1.6666666666666665,
        '16': 2,
        '19': 2.3333333333333335,
        '20': 2.5,
        '21': 2.6666666666666665,
        '24': 3,
        '27': 3.3333333333333335,
        '28': 3.5,
        '29': 3.6666666666666665,
        '32': 4,
        '35': 4.333333333333333,
        '36': 4.5,
        '37': 4.666666666666667,
        '40': 5,
        '216': -5,
        '219': -4.666666666666667,
        '220': -4.5,
        '221': -4.333333333333333,
        '224': -4,
        '227': -3.6666666666666665,
        '228': -3.5,
        '229': -3.3333333333333335,
        '232': -3,
        '235': -2.6666666666666665,
        '236': -2.5,
        '237': -2.3333333333333335,
        '240': -2,
        '243': -1.6666666666666665,
        '244': -1.5,
        '245': -1.3333333333333333,
        '248': -1,
        '251': -0.6666666666666666,
        '252': -0.5,
        '253': -0.3333333333333333,
    };
    return ExposureCompensation;
}());
export { ExposureCompensation };
