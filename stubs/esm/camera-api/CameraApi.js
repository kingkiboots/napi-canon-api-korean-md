import { Aperture } from './Aperture';
import { ApiError } from './ApiError';
import { Camera } from './Camera';
import { CameraBrowser } from './CameraBrowser';
import { CameraFile } from './CameraFile';
import { CameraProperty } from './CameraProperty';
import { Directory } from './Directory';
import { ExposureCompensation } from './ExposureCompensation';
import { FileFormat } from './FileFormat';
import { Flag } from './Flag';
import { ImageQuality } from './ImageQuality';
import { ISOSensitivity } from './ISOSensitivity';
import { ObjectEvent } from './ObjectEvent';
import { Option } from './Option';
import { OutputDevice } from './OutputDevice';
import { ShutterSpeed } from './ShutterSpeed';
import { StateEvent } from './StateEvent';
import { TimeZone } from './TimeZone';
import { Volume } from './Volume';
export * from './Aperture';
export * from './ApiError';
export * from './Camera';
export * from './CameraBrowser';
export * from './CameraFile';
export * from './CameraProperty';
export * from './Directory';
export * from './ExposureCompensation';
export * from './FileFormat';
export * from './Flag';
export * from './ImageQuality';
export * from './ISOSensitivity';
export * from './ObjectEvent';
export * from './Option';
export * from './OutputDevice';
export * from './ShutterSpeed';
export * from './StateEvent';
export * from './TimeZone';
export * from './Volume';
var STUB = 1;
STUB = 1;
export var watchCameras = function (timeout) {
    if (timeout === void 0) { timeout = 1000; }
    throw new Error('Not implemented - stub only.');
};
export var cameraBrowser = new CameraBrowser();
var CameraApi = {
    Aperture: Aperture,
    ApiError: ApiError,
    Camera: Camera,
    CameraBrowser: CameraBrowser,
    CameraFile: CameraFile,
    CameraProperty: CameraProperty,
    Directory: Directory,
    ExposureCompensation: ExposureCompensation,
    FileFormat: FileFormat,
    Flag: Flag,
    ImageQuality: ImageQuality,
    ISOSensitivity: ISOSensitivity,
    ObjectEvent: ObjectEvent,
    Option: Option,
    OutputDevice: OutputDevice,
    ShutterSpeed: ShutterSpeed,
    StateEvent: StateEvent,
    TimeZone: TimeZone,
    Volume: Volume,
    cameraBrowser: cameraBrowser,
    watchCameras: watchCameras,
};
export default CameraApi;
