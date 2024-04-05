var _a;
export class ApiIdentifier {
    /**
     * Superclass for identifier wrappers. Provides the identifiers as class constants and string representations.
     *
     * @class ApiIdentifier
     * @param {number} identifier_
     * @param {Object.<number>} labels
     * @protected
     */
    constructor(identifier_, labels) {
        this.identifier_ = identifier_;
        this.labels = labels;
        this[_a] = 'ApiIdentifier';
        this.label_ =
            Object.keys(labels).find((key) => labels[key] === identifier_) ||
                `0x${this.identifier_.toString(16).padStart(8, '0')}`;
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
    get identifier() {
        return this.identifier_;
    }
    /**
     * Allows type cast to number and string.
     * The string will be a hexadecimal code representation of the number
     *
     * @name Symbol_toPrimitive
     * @memberOf ApiIdentifier
     * @instance
     * @function
     * @param {string} hint
     * @return {string|number|null}
     */
    [(_a = Symbol.toStringTag, Symbol.toPrimitive)](hint) {
        switch (hint) {
            case 'number':
                return this.identifier_;
            case 'string':
                return `0x${this.identifier_.toString(16).padStart(8, '0')}`;
            default:
                return null;
        }
    }
    /**
     * @param {number} other Value to compare with
     * @return {boolean}
     */
    equalTo(other) {
        return this.identifier_ === +other;
    }
    /**
     * @return {{identifier: number, label: string}}
     */
    toJSON() {
        return {
            identifier: this.identifier_,
            label: this.label_,
        };
    }
}
