import { PropertyValue } from './CameraProperty';
export declare class Option implements PropertyValue {
    private readonly propertyID_;
    private readonly value_;
    [Symbol.toStringTag]: string;
    private readonly label_;
    constructor(propertyID_: number, value_: number);
    get label(): string;
    get value(): number;
    get propertyID(): number;
    [Symbol.toPrimitive](hint: string): string | number | null;
    static forLabel(label: string): Option | null;
    static readonly AEMode: {
        [key: string]: number;
    };
    static readonly AEModeSelect: {
        [key: string]: number;
    };
    static readonly AFMode: {
        [key: string]: number;
    };
    static readonly BatteryQuality: {
        [key: string]: number;
    };
    static readonly Bracket: {
        [key: string]: number;
    };
    static readonly ColorSpace: {
        [key: string]: number;
    };
    static readonly DCStrobe: {
        [key: string]: number;
    };
    static readonly DriveMode: {
        [key: string]: number;
    };
    static readonly EvfAFMode: {
        [key: string]: number;
    };
    static readonly EvfHistogramStatus: {
        [key: string]: number;
    };
    static readonly EvfOutputDevice: {
        [key: string]: number;
    };
    static readonly EvfZoom: {
        [key: string]: number;
    };
    static readonly LensBarrelStatus: {
        [key: string]: number;
    };
    static readonly LensStatus: {
        [key: string]: number;
    };
    static readonly MeteringMode: {
        [key: string]: number;
    };
    static readonly MirrorUpStatus: {
        [key: string]: number;
    };
    static readonly MovieQuality: {
        [key: string]: number;
    };
    static readonly NoiseReduction: {
        [key: string]: number;
    };
    static readonly RedEye: {
        [key: string]: number;
    };
    static readonly Record: {
        [key: string]: number;
    };
    static readonly SaveTo: {
        [key: string]: number;
    };
    static readonly WhiteBalance: {
        [key: string]: number;
    };
}
