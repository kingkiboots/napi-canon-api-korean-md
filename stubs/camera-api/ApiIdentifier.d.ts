export declare abstract class ApiIdentifier {
    private readonly identifier_;
    private readonly labels;
    [Symbol.toStringTag]: string;
    private readonly label_;
    protected constructor(identifier_: number, labels: {
        [label: string]: number;
    });
    get label(): string;
    get identifier(): number;
    [Symbol.toPrimitive](hint: string): string | number | null;
    equalTo(other: number): boolean;
    toJSON(): {
        identifier: number;
        label: string;
    };
}
