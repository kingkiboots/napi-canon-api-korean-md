var _a;
export class OutputDevice {
    /**
     * Boolean property value
     * @class Flag
     * @param {number | boolean} value
     */
    constructor(value) {
        this[_a] = 'OutputDevice';
        this.label_ = '';
        this.value_ = value;
        const deviceNames = [];
        for (const deviceName of Object.keys(OutputDevice.ID)) {
            if (OutputDevice.ID[deviceName] > 0 &&
                this.isEnabled(OutputDevice.ID[deviceName])) {
                deviceNames.push(deviceName);
            }
        }
        this.label_ = deviceNames.join(', ');
    }
    /**
     * @readonly
     * @type {string}
     */
    get label() {
        return this.label_ ? this.label_ : 'None';
    }
    /**
     * @readonly
     * @type {number}
     */
    get value() {
        return this.value_;
    }
    /**
     * Allows type cast to number - returns the value.
     * @param {string} hint
     * @return { number | string | null}
     */
    [(_a = Symbol.toStringTag, Symbol.toPrimitive)](hint) {
        switch (hint) {
            case 'number':
                return this.value_;
            case 'string':
                return this.label_;
            default:
                return null;
        }
    }
    /**
     * @param {number} deviceID
     * @return {boolean}
     */
    isEnabled(deviceID) {
        return deviceID > 0 && (this.value_ & deviceID) === deviceID;
    }
    /**
     * @returns {OutputDeviceStatusList}
     */
    getDevices() {
        const devices = {};
        for (const deviceName of Object.keys(OutputDevice.ID)) {
            if (OutputDevice.ID[deviceName] > 0) {
                devices[deviceName] = this.isEnabled(OutputDevice.ID[deviceName]);
            }
        }
        return devices;
    }
    /**
     * @return {{label: string, value: number, devices: OutputDeviceStatusList}}
     */
    toJSON() {
        return {
            label: this.label,
            value: this.value,
            devices: this.getDevices(),
        };
    }
    /**
     * Create instance for label.
     *
     * @param {string} label
     * @return {OutputDevice}
     */
    static forLabel(label) {
        const deviceNames = label.match(/[\w\d]+/g) || [];
        let value = OutputDevice.ID.None;
        for (const deviceName of deviceNames) {
            if (deviceName in OutputDevice.ID) {
                value |= OutputDevice.ID[deviceName];
            }
        }
        return new OutputDevice(value);
    }
}
// Generate: OutputDevice
/**
 * @readonly
 * @enum {number}
 */
OutputDevice.ID = {
    None: 0,
    PC: 2,
    PCSmall: 8,
    TFT: 1,
};
