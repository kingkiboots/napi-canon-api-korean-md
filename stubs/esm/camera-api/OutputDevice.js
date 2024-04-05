var OutputDevice = (function () {
    function OutputDevice(value) {
        this[_a] = 'OutputDevice';
        this.label_ = '';
        this.value_ = value;
        var deviceNames = [];
        for (var _i = 0, _b = Object.keys(OutputDevice.ID); _i < _b.length; _i++) {
            var deviceName = _b[_i];
            if (OutputDevice.ID[deviceName] > 0 &&
                this.isEnabled(OutputDevice.ID[deviceName])) {
                deviceNames.push(deviceName);
            }
        }
        this.label_ = deviceNames.join(', ');
    }
    Object.defineProperty(OutputDevice.prototype, "label", {
        get: function () {
            return this.label_ ? this.label_ : 'None';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OutputDevice.prototype, "value", {
        get: function () {
            return this.value_;
        },
        enumerable: false,
        configurable: true
    });
    OutputDevice.prototype[(_a = Symbol.toStringTag, Symbol.toPrimitive)] = function (hint) {
        switch (hint) {
            case 'number':
                return this.value_;
            case 'string':
                return this.label_;
            default:
                return null;
        }
    };
    OutputDevice.prototype.isEnabled = function (deviceID) {
        return deviceID > 0 && (this.value_ & deviceID) === deviceID;
    };
    OutputDevice.prototype.getDevices = function () {
        var devices = {};
        for (var _i = 0, _b = Object.keys(OutputDevice.ID); _i < _b.length; _i++) {
            var deviceName = _b[_i];
            if (OutputDevice.ID[deviceName] > 0) {
                devices[deviceName] = this.isEnabled(OutputDevice.ID[deviceName]);
            }
        }
        return devices;
    };
    OutputDevice.prototype.toJSON = function () {
        return {
            label: this.label,
            value: this.value,
            devices: this.getDevices(),
        };
    };
    OutputDevice.forLabel = function (label) {
        var deviceNames = label.match(/[\w\d]+/g) || [];
        var value = OutputDevice.ID.None;
        for (var _i = 0, deviceNames_1 = deviceNames; _i < deviceNames_1.length; _i++) {
            var deviceName = deviceNames_1[_i];
            if (deviceName in OutputDevice.ID) {
                value |= OutputDevice.ID[deviceName];
            }
        }
        return new OutputDevice(value);
    };
    var _a;
    OutputDevice.ID = {
        None: 0,
        PC: 2,
        PCSmall: 8,
        TFT: 1,
    };
    return OutputDevice;
}());
export { OutputDevice };
