import { PropertyValue } from './CameraProperty';
type OutputDeviceStatusList = {
    [deviceName: string]: boolean;
};
export declare class OutputDevice implements PropertyValue {
    [Symbol.toStringTag]: string;
    private readonly label_;
    private readonly value_;
    constructor(value: number);
    get label(): string;
    get value(): number;
    [Symbol.toPrimitive](hint: string): string | number | null;
    isEnabled(deviceID: number): boolean;
    getDevices(): OutputDeviceStatusList;
    toJSON(): {
        label: string;
        value: number;
        devices: OutputDeviceStatusList;
    };
    static forLabel(label: string): OutputDevice | null;
    static readonly ID: {
        [key: string]: number;
    };
}
export {};
