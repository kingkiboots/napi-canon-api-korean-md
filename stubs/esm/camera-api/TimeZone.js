var TimeZone = (function () {
    function TimeZone(value_) {
        this.value_ = value_;
        this[_a] = 'TimeZone';
        this.difference_ = 0;
        this.value_ = value_;
        this.zone_ = value_;
        this.label_ = TimeZone.Zones["".concat(value_)] || '';
    }
    Object.defineProperty(TimeZone.prototype, "label", {
        get: function () {
            return this.label_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeZone.prototype, "value", {
        get: function () {
            return this.value_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeZone.prototype, "zone", {
        get: function () {
            return this.zone_;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeZone.prototype, "difference", {
        get: function () {
            return this.difference_;
        },
        enumerable: false,
        configurable: true
    });
    TimeZone.prototype[(_a = Symbol.toStringTag, Symbol.toPrimitive)] = function (hint) {
        switch (hint) {
            case 'number':
                return this.value_;
            case 'string':
                return this.label_;
            default:
                return null;
        }
    };
    TimeZone.prototype.toJSON = function () {
        return {
            label: this.label,
            value: this.value,
            zone: this.zone,
            difference: this.difference,
        };
    };
    var _a;
    TimeZone.Zones = {
        '0': 'None',
        '1': 'Chatham Islands',
        '2': 'Wellington',
        '3': 'Solomon Island',
        '4': 'Sydney',
        '5': 'Adeladie',
        '6': 'Tokyo',
        '7': 'Hong Kong',
        '8': 'Bangkok',
        '9': 'Yangon',
        '10': 'Dacca',
        '11': 'Kathmandu',
        '12': 'Delhi',
        '13': 'Karachi',
        '14': 'Kabul',
        '15': 'Dubai',
        '16': 'Tehran',
        '17': 'Moscow',
        '18': 'Cairo',
        '19': 'Paris',
        '20': 'London',
        '21': 'Azores',
        '22': 'Fernando de Noronha',
        '23': 'São Paulo',
        '24': 'Newfoundland',
        '25': 'Santiago',
        '26': 'Caracas',
        '27': 'New York',
        '28': 'Chicago',
        '29': 'Denver',
        '30': 'Los Angeles',
        '31': 'Anchorage',
        '32': 'Honolulu',
        '33': 'Samoa',
        '34': 'Riyadh',
        '35': 'Manaus',
        '256': 'UTC',
        '65535': 'UTC',
    };
    return TimeZone;
}());
export { TimeZone };
