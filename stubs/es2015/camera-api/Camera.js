var _a;
export class Camera {
    /**
     * Camera device
     * @class Camera
     * @param {number|string} [indexOrPort=0]
     */
    constructor(indexOrPort = 0) {
        this[_a] = 'Camera';
        throw new Error('Not implemented - stub only.');
    }
    /**
     * Set event handler callback
     * @param {EventCallback} listener
     */
    setEventHandler(listener) {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * @readonly
     */
    get description() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * @readonly
     */
    get portName() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * Connect to device
     */
    connect(shouldKeepAlive = false) {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * Disconnect from device
     */
    disconnect() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * Fetch a camera property by ID or label
     * @param {number|string} propertyID
     * @param {number} specifier
     * @return {CameraProperty}
     */
    getProperty(propertyID, specifier = 0) {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * @param {PropertyIdentifier} propertyID
     * @param {PropertyValue} value
     */
    setProperty(propertyID, value) {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * @param {PropertiesData} properties
     */
    setProperties(properties) {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * @param {number} command
     * @param {number} parameter
     */
    sendCommand(command, parameter = 0) {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * Trigger picture shot, successful shot will trigger an object event
     */
    takePicture() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * Return true if the LiveView is currently active
     * @returns {boolean}
     */
    isLiveViewActive() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * Request LiveView start, triggers event on success
     */
    startLiveView() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * Request LiveView stop, triggers event on success
     */
    stopLiveView() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * @return {string}
     * @deprecated
     */
    downloadLiveViewImage() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * @return {LiveViewImage}
     */
    getLiveViewImage() {
        throw new Error('Not implemented - stub only.');
    }
    /**
     * @return {Volume[]}
     */
    getVolumes() {
        throw new Error('Not implemented - stub only.');
    }
}
_a = Symbol.toStringTag;
// Generate: Camera
/**
 * @readonly
 * @enum {string}
 */
Camera.EventName = {
    CameraConnect: 'CameraConnect',
    CameraDisconnect: 'CameraDisconnect',
    DirectoryCreate: 'DirectoryCreate',
    DownloadRequest: 'DownloadRequest',
    Error: 'Error',
    FileCreate: 'FileCreate',
    KeepAlive: 'KeepAlive',
    LiveViewStart: 'LiveViewStart',
    LiveViewStop: 'LiveViewStop',
    ObjectChange: 'ObjectChange',
    PropertyChangeOptions: 'PropertyChangeOptions',
    PropertyChangeValue: 'PropertyChangeValue',
    StateChange: 'StateChange',
    VolumeChange: 'VolumeChange',
};
/**
 * @readonly
 * @enum {number}
 */
Camera.Command = {
    BulbEnd: 3,
    BulbStart: 2,
    DoClickWBEvf: 260,
    DoEvfAf: 258,
    DriveLensEvf: 259,
    DrivePowerZoom: 269,
    ExtendShutDownTimer: 1,
    MovieSelectSwOFF: 264,
    MovieSelectSwON: 263,
    PressShutterButton: 4,
    RequestRollPitchLevel: 265,
    RequestSensorCleaning: 274,
    SetRemoteShootingMode: 271,
    TakePicture: 0,
};
/**
 * @readonly
 * @enum {number}
 */
Camera.PressShutterButton = {
    Completely: 3,
    CompletelyNonAF: 65539,
    Halfway: 1,
    HalfwayNonAF: 65537,
    OFF: 0,
};
