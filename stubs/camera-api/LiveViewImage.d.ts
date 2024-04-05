import { Option } from './Option';
interface Position {
    left: number;
    right: number;
}
interface Size {
    width: number;
    height: number;
}
interface Rectangle extends Position, Size {
}
interface Histogram {
    y: Uint32Array;
    r: Uint32Array;
    g: Uint32Array;
    b: Uint32Array;
}
export declare class LiveViewImage {
    constructor();
    [Symbol.toStringTag]: string;
    getDataURL(): string;
    get coordinateSystem(): Size;
    get histogram(): Histogram;
    get histogramStatus(): Option;
    get position(): Position;
    get visibleArea(): Rectangle;
    get zoom(): Option;
    get zoomPosition(): Position;
    get zoomArea(): Rectangle;
}
export {};
