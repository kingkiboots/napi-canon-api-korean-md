import { PropertyValue } from './CameraProperty';
export interface ImageQualityProperties {
    format: number;
    size: number;
    quality: number;
}
export declare class ImageQuality implements PropertyValue {
    private readonly value_;
    [Symbol.toStringTag]: string;
    private readonly label_;
    constructor(value_: number);
    private static extractBits;
    get label(): string;
    get value(): number;
    get main(): ImageQualityProperties;
    get secondary(): ImageQualityProperties;
    [Symbol.toPrimitive](hint: string): string | number | null;
    static readonly ID: {
        [key: string]: number;
    };
    static readonly Format: {
        [key: string]: number;
    };
    static readonly Size: {
        [key: string]: number;
    };
    static readonly CompressionQuality: {
        [key: string]: number;
    };
}
