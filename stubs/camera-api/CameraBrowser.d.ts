import { ApiError } from './ApiError';
import { Camera } from './Camera';
import { CameraFile } from './CameraFile';
import { CameraProperty } from './CameraProperty';
import { Directory } from './Directory';
import { ObjectEvent } from './ObjectEvent';
import { StateEvent } from './StateEvent';
import { Volume } from './Volume';
export declare class CameraBrowser {
    [Symbol.toStringTag]: string;
    constructor();
    setEventHandler(listener: EventCallback): void;
    initialize(): void;
    terminate(): void;
    triggerEvents(): void;
    getCamera(at?: string | number, exactOnly?: boolean): Camera;
    getCameras(): Camera[];
    update(): void;
    static readonly EventName: {
        [key: string]: string;
    };
}
export interface CameraDeviceEvent {
    camera: Camera;
}
export interface PropertyChangeEvent extends CameraDeviceEvent {
    camera: Camera;
    property: CameraProperty;
}
export interface FileChangeEvent extends CameraDeviceEvent {
    camera: Camera;
    file: CameraFile;
}
export interface DirectoryChangeEvent extends CameraDeviceEvent {
    camera: Camera;
    directory: Directory;
}
export interface VolumeChangeEvent extends CameraDeviceEvent {
    camera: Camera;
    volume: Volume;
}
export interface ObjectChangeEvent extends CameraDeviceEvent {
    camera: Camera;
    objectEvent: ObjectEvent;
}
export interface StateChangeEvent extends CameraDeviceEvent {
    camera: Camera;
    stateEvent: StateEvent;
}
export type EventCallback = (eventName: string, event: CameraDeviceEvent | ApiError) => void;
