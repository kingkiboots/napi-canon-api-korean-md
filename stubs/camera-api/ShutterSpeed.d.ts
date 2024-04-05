import { PropertyValue } from './CameraProperty';
export declare class ShutterSpeed implements PropertyValue {
    private readonly value_;
    [Symbol.toStringTag]: string;
    private readonly seconds_;
    private readonly label_;
    constructor(value_: number);
    private static getLabelForSeconds;
    get label(): string;
    get value(): number;
    get seconds(): number;
    get stop(): string;
    [Symbol.toPrimitive](hint: string): string | number | null;
    toJSON(): {
        label: string;
        value: number;
        seconds: number;
        stop: string;
    };
    static findNearest(valueOrLabel: number | string, filter?: (aperture: ShutterSpeed) => boolean): ShutterSpeed | null;
    static forLabel(label: string): ShutterSpeed | null;
    static readonly ID: {
        [key: string]: number;
    };
    static readonly OneHalfValues: {
        [key: string]: number;
    };
    static readonly OneThirdValues: {
        [key: string]: number;
    };
    static readonly AllValues: {
        [key: string]: number;
    };
}
