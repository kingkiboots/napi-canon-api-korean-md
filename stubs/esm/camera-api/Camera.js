var Camera = (function () {
    function Camera(indexOrPort) {
        if (indexOrPort === void 0) { indexOrPort = 0; }
        this[_a] = 'Camera';
        throw new Error('Not implemented - stub only.');
    }
    Camera.prototype.setEventHandler = function (listener) {
        throw new Error('Not implemented - stub only.');
    };
    Object.defineProperty(Camera.prototype, "description", {
        get: function () {
            throw new Error('Not implemented - stub only.');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "portName", {
        get: function () {
            throw new Error('Not implemented - stub only.');
        },
        enumerable: false,
        configurable: true
    });
    Camera.prototype.connect = function (shouldKeepAlive) {
        if (shouldKeepAlive === void 0) { shouldKeepAlive = false; }
        throw new Error('Not implemented - stub only.');
    };
    Camera.prototype.disconnect = function () {
        throw new Error('Not implemented - stub only.');
    };
    Camera.prototype.getProperty = function (propertyID, specifier) {
        if (specifier === void 0) { specifier = 0; }
        throw new Error('Not implemented - stub only.');
    };
    Camera.prototype.setProperty = function (propertyID, value) {
        throw new Error('Not implemented - stub only.');
    };
    Camera.prototype.setProperties = function (properties) {
        throw new Error('Not implemented - stub only.');
    };
    Camera.prototype.sendCommand = function (command, parameter) {
        if (parameter === void 0) { parameter = 0; }
        throw new Error('Not implemented - stub only.');
    };
    Camera.prototype.takePicture = function () {
        throw new Error('Not implemented - stub only.');
    };
    Camera.prototype.isLiveViewActive = function () {
        throw new Error('Not implemented - stub only.');
    };
    Camera.prototype.startLiveView = function () {
        throw new Error('Not implemented - stub only.');
    };
    Camera.prototype.stopLiveView = function () {
        throw new Error('Not implemented - stub only.');
    };
    Camera.prototype.downloadLiveViewImage = function () {
        throw new Error('Not implemented - stub only.');
    };
    Camera.prototype.getLiveViewImage = function () {
        throw new Error('Not implemented - stub only.');
    };
    Camera.prototype.getVolumes = function () {
        throw new Error('Not implemented - stub only.');
    };
    var _a;
    _a = Symbol.toStringTag;
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
    Camera.PressShutterButton = {
        Completely: 3,
        CompletelyNonAF: 65539,
        Halfway: 1,
        HalfwayNonAF: 65537,
        OFF: 0,
    };
    return Camera;
}());
export { Camera };
