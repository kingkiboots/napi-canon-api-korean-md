import { PropertyValue } from './CameraProperty';
export declare class Aperture implements PropertyValue {
    private readonly value_;
    [Symbol.toStringTag]: string;
    private readonly label_;
    private readonly aperture_;
    constructor(value_: number);
    get label(): string;
    get value(): number;
    get aperture(): number;
    get stop(): string;
    [Symbol.toPrimitive](hint: string): string | number | null;
    toJSON(): {
        label: string;
        value: number;
        aperture: number;
        stop: string;
    };
    static findNearest(valueOrLabel: number | string, filter?: (aperture: Aperture) => boolean): Aperture | null;
    static forLabel(label: string): Aperture | null;
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
