import { Camera } from './Camera';
export interface PropertyValue {
}
export interface MatchablePropertyValue extends PropertyValue {
    findNearest<T>(needle: number | string, filter: (value: T) => boolean): number | string;
}
export type CameraPropertyValue = string | number | number[] | PropertyValue;
export declare class CameraProperty {
    [Symbol.toStringTag]: string;
    constructor(camera: Camera, propertyID: number, propertySpecifier?: number);
    get label(): string;
    get identifier(): number;
    get specifier(): number;
    get available(): boolean;
    get value(): CameraPropertyValue;
    set value(value: CameraPropertyValue);
    get allowedValues(): CameraPropertyValue[];
    toJSON(): {
        label: string;
        identifier: number;
        specifier?: number;
        value: CameraPropertyValue;
    };
    static readonly ID: {
        [key: string]: number;
    };
}
