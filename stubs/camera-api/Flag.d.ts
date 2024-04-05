import { PropertyValue } from './CameraProperty';
export declare class Flag implements PropertyValue {
    [Symbol.toStringTag]: string;
    private readonly label_;
    private readonly value_;
    constructor(value: number | boolean);
    get label(): string;
    get value(): number;
    get flag(): boolean;
    [Symbol.toPrimitive](hint: string): string | number | null;
    toJSON(): {
        label: string;
        value: number;
        flag: boolean;
    };
    static forLabel(label: string): Flag | null;
    static readonly True = 1;
    static readonly False = 0;
}
