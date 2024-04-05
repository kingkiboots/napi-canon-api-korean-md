import { PropertyValue } from './CameraProperty';
export declare class FileFormat implements PropertyValue {
    private readonly value_;
    [Symbol.toStringTag]: string;
    private readonly label_;
    constructor(value_: number);
    get label(): string;
    get value(): number;
    [Symbol.toPrimitive](hint: string): string | number | null;
    static readonly ID: {
        [key: string]: number;
    };
}
