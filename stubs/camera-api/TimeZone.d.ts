import { PropertyValue } from './CameraProperty';
export declare class TimeZone implements PropertyValue {
    private readonly value_;
    [Symbol.toStringTag]: string;
    private readonly label_;
    private readonly difference_;
    private readonly zone_;
    constructor(value_: number);
    get label(): string;
    get value(): number;
    get zone(): number;
    get difference(): number;
    [Symbol.toPrimitive](hint: string): string | number | null;
    toJSON(): {
        label: string;
        value: number;
        zone: number;
        difference: number;
    };
    static readonly Zones: {
        [key: string]: string;
    };
}
