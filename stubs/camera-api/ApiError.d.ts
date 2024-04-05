import { ApiIdentifier } from './ApiIdentifier';
export declare class ApiError extends ApiIdentifier {
    [Symbol.toStringTag]: string;
    constructor(identifier: number);
    equalTo(other: number | ApiError): boolean;
    static readonly Code: {
        [key: string]: number;
    };
}
