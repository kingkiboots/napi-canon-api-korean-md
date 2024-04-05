import { PropertyValue } from './CameraProperty';
export declare class ISOSensitivity implements PropertyValue {
    private readonly value_;
    [Symbol.toStringTag]: string;
    private readonly label_;
    private readonly sensitivity_;
    constructor(value_: number);
    get label(): string;
    get value(): number;
    get sensitivity(): number;
    [Symbol.toPrimitive](hint: string): string | number | null;
    toJSON(): {
        label: string;
        value: number;
        ISOSensitivity: number;
    };
    static findNearest(valueOrLabel: number | string, filter?: (sensitivity: ISOSensitivity) => boolean): ISOSensitivity | null;
    static forLabel(label: string): ISOSensitivity | null;
    static readonly ID: {
        [key: string]: number;
    };
    static readonly Values: {
        [key: string]: number;
    };
}
