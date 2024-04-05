import { EventCallback } from './CameraBrowser';
import { CameraProperty, PropertyValue } from './CameraProperty';
import { LiveViewImage } from './LiveViewImage';
import { Volume } from './Volume';
type PropertyIdentifier = string | number;
type PropertiesData = {
    [key in PropertyIdentifier]?: PropertyValue;
};
export declare class Camera {
    [Symbol.toStringTag]: string;
    constructor(indexOrPort?: number | string);
    setEventHandler(listener: EventCallback): void;
    get description(): string;
    get portName(): string;
    connect(shouldKeepAlive?: boolean): void;
    disconnect(): void;
    getProperty(propertyID: PropertyIdentifier, specifier?: number): CameraProperty;
    setProperty(propertyID: PropertyIdentifier, value: PropertyValue): void;
    setProperties(properties: PropertiesData): void;
    sendCommand(command: number, parameter?: number): void;
    takePicture(): void;
    isLiveViewActive(): boolean;
    startLiveView(): void;
    stopLiveView(): void;
    downloadLiveViewImage(): string;
    getLiveViewImage(): LiveViewImage;
    getVolumes(): Volume[];
    static readonly EventName: {
        [key: string]: string;
    };
    static readonly Command: {
        [key: string]: number;
    };
    static readonly PressShutterButton: {
        [key: string]: number;
    };
}
export {};
