import { ApiIdentifier } from './ApiIdentifier';
export declare class ObjectEvent extends ApiIdentifier {
    [Symbol.toStringTag]: string;
    constructor(identifier: number);
    equalTo(other: number | ObjectEvent): boolean;
    static readonly ID: {
        [key: string]: number;
    };
}
