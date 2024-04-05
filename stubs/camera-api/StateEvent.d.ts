import { ApiIdentifier } from './ApiIdentifier';
export declare class StateEvent extends ApiIdentifier {
    [Symbol.toStringTag]: string;
    constructor(identifier: number);
    equalTo(other: number | StateEvent): boolean;
    static readonly ID: {
        [key: string]: number;
    };
}
