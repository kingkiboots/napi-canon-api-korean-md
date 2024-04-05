import { PropertyValue } from './CameraProperty';
export declare class ExposureCompensation implements PropertyValue {
    private readonly value_;
    [Symbol.toStringTag]: string;
    private readonly compensation_;
    private readonly label_;
    constructor(value_: number);
    private static getLabelForCompensation;
    get label(): string;
    get value(): number;
    get compensation(): number;
    [Symbol.toPrimitive](hint: string): string | number | null;
    private static findNearest;
    static forLabel(label: string): ExposureCompensation | null;
    static readonly Values: {
        [key: string]: number;
    };
}
