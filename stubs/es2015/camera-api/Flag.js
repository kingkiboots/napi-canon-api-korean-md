var _a;
export class Flag {
    /**
     * Boolean property value
     * @class Flag
     * @param {number | boolean} value
     */
    constructor(value) {
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
    /**
     * @readonly
     * @type {string}
     */
    get label() {
        return this.label_;
    }
    /**
     * @readonly
     * @type {number}
     */
    get value() {
        return this.value_;
    }
    /**
     * @readonly
     * @type {boolean}
     */
    get flag() {
        return this.value_ !== 0;
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
     * @return {{label: string, value: number, flag: boolean}}
     */
    toJSON() {
        return {
            label: this.label,
            value: this.value,
            flag: this.flag,
        };
    }
    /**
     * Create instance for label.
     *
     * @param {string} label
     * @return {Flag}
     */
    static forLabel(label) {
        if (['true', '1', 'yes', 'on'].indexOf(label.toLowerCase()) >= 0) {
            return new Flag(Flag.True);
        }
        return new Flag(Flag.False);
    }
}
// Generate: Flag
/**
 * @readonly
 * @type {number}
 */
Flag.True = 1;
/**
 * @readonly
 * @type {number}
 */
Flag.False = 0;
