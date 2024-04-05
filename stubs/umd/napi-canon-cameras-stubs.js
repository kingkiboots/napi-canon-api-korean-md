(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["napi-canon-cameras-stubs"] = {}));
})(this, (function (exports) { 'use strict';

    var Aperture = (function () {
        function Aperture(value_) {
            this.value_ = value_;
            this[_a] = 'Aperture';
            var name = Object.keys(Aperture.ID).find(function (key) { return Aperture.ID[key] === value_; });
            var formatAperture = function (aperture) {
                return 'f' + aperture.toFixed(1).replace(/\.0$/, '');
            };
            if (name) {
                this.label_ = name;
                this.aperture_ = 0;
            }
            else if ("".concat(value_) in Aperture.OneThirdValues) {
                this.aperture_ = Aperture.OneThirdValues[value_] || 0;
                this.label_ = formatAperture(this.aperture_) + ' (1/3)';
            }
            else {
                this.aperture_ = Aperture.OneHalfValues[value_] || 0;
                this.label_ = formatAperture(this.aperture_);
            }
        }
        Object.defineProperty(Aperture.prototype, "label", {
            get: function () {
                return this.label_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Aperture.prototype, "value", {
            get: function () {
                return this.value_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Aperture.prototype, "aperture", {
            get: function () {
                return this.aperture_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Aperture.prototype, "stop", {
            get: function () {
                return "".concat(this.value_) in Aperture.OneThirdValues ? '1/3' : '1/2';
            },
            enumerable: false,
            configurable: true
        });
        Aperture.prototype[(_a = Symbol.toStringTag, Symbol.toPrimitive)] = function (hint) {
            switch (hint) {
                case 'number':
                    return this.value_;
                case 'string':
                    return this.label_;
                default:
                    return null;
            }
        };
        Aperture.prototype.toJSON = function () {
            return {
                label: this.label,
                value: this.value,
                aperture: this.aperture,
                stop: this.stop,
            };
        };
        Aperture.findNearest = function (valueOrLabel, filter) {
            var aperture;
            if (typeof valueOrLabel === 'string') {
                var a = Aperture.forLabel(valueOrLabel);
                if (!a) {
                    return null;
                }
                aperture = a.aperture;
            }
            else {
                aperture = new Aperture(valueOrLabel).aperture;
            }
            var found = Object.keys(Aperture.AllValues).reduce(function (carry, key) {
                var current = Aperture.AllValues[key];
                var difference = Math.abs(current - aperture);
                if (!carry || difference < carry.difference) {
                    if (filter && !filter(new Aperture(+key))) {
                        return carry;
                    }
                    return {
                        value: +key,
                        difference: difference,
                    };
                }
                return carry;
            }, null);
            if (found) {
                return new Aperture(found.value);
            }
            return null;
        };
        Aperture.forLabel = function (label) {
            if (label in Aperture.ID) {
                return new Aperture(Aperture.ID[label]);
            }
            var match = label.match(/f?(\d+(?:\.\d+)?)\s*(.*)/);
            if (match) {
                var aperture_1 = parseFloat(match[1]) || 0.0;
                var isOneThird = match[2].indexOf('1/3') >= 0;
                var values_1 = isOneThird
                    ? Aperture.OneThirdValues
                    : Aperture.OneHalfValues;
                var value = Object.keys(values_1).find(function (straw) { return Math.abs(values_1[straw] - aperture_1) < 0.00001; });
                return new Aperture(+(value || -1));
            }
            return null;
        };
        var _a;
        Aperture.ID = {
            Auto: 0,
            NotValid: 4294967295,
        };
        Aperture.OneHalfValues = {
            '8': 1,
            '11': 1.1,
            '12': 1.2,
            '16': 1.4,
            '19': 1.6,
            '20': 1.8,
            '24': 2,
            '27': 2.2,
            '28': 2.5,
            '32': 2.8,
            '35': 3.2,
            '36': 3.5,
            '40': 4,
            '43': 4.5,
            '44': 4.5,
            '45': 5,
            '48': 5.6,
            '51': 6.3,
            '52': 6.7,
            '53': 7.1,
            '56': 8,
            '59': 9,
            '60': 9.5,
            '61': 10,
            '64': 11,
            '68': 13,
            '69': 14,
            '72': 16,
            '75': 18,
            '76': 19,
            '77': 20,
            '80': 22,
            '83': 25,
            '84': 27,
            '85': 29,
            '88': 32,
            '91': 36,
            '92': 38,
            '93': 40,
            '96': 45,
            '99': 51,
            '100': 54,
            '101': 57,
            '104': 64,
            '107': 72,
            '108': 76,
            '109': 80,
            '112': 91,
            '133': 3.4,
        };
        Aperture.OneThirdValues = {
            '13': 1.2,
            '21': 1.8,
            '29': 2.5,
            '37': 3.5,
            '67': 13,
        };
        Aperture.AllValues = {
            '8': 1,
            '11': 1.1,
            '12': 1.2,
            '13': 1.2,
            '16': 1.4,
            '19': 1.6,
            '20': 1.8,
            '21': 1.8,
            '24': 2,
            '27': 2.2,
            '28': 2.5,
            '29': 2.5,
            '32': 2.8,
            '35': 3.2,
            '36': 3.5,
            '37': 3.5,
            '40': 4,
            '43': 4.5,
            '44': 4.5,
            '45': 5,
            '48': 5.6,
            '51': 6.3,
            '52': 6.7,
            '53': 7.1,
            '56': 8,
            '59': 9,
            '60': 9.5,
            '61': 10,
            '64': 11,
            '67': 13,
            '68': 13,
            '69': 14,
            '72': 16,
            '75': 18,
            '76': 19,
            '77': 20,
            '80': 22,
            '83': 25,
            '84': 27,
            '85': 29,
            '88': 32,
            '91': 36,
            '92': 38,
            '93': 40,
            '96': 45,
            '99': 51,
            '100': 54,
            '101': 57,
            '104': 64,
            '107': 72,
            '108': 76,
            '109': 80,
            '112': 91,
            '133': 3.4,
        };
        return Aperture;
    }());

    var _a$2;
    var ApiIdentifier = (function () {
        function ApiIdentifier(identifier_, labels) {
            this.identifier_ = identifier_;
            this.labels = labels;
            this[_a$2] = 'ApiIdentifier';
            this.label_ =
                Object.keys(labels).find(function (key) { return labels[key] === identifier_; }) ||
                    "0x".concat(this.identifier_.toString(16).padStart(8, '0'));
        }
        Object.defineProperty(ApiIdentifier.prototype, "label", {
            get: function () {
                return this.label_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ApiIdentifier.prototype, "identifier", {
            get: function () {
                return this.identifier_;
            },
            enumerable: false,
            configurable: true
        });
        ApiIdentifier.prototype[(_a$2 = Symbol.toStringTag, Symbol.toPrimitive)] = function (hint) {
            switch (hint) {
                case 'number':
                    return this.identifier_;
                case 'string':
                    return "0x".concat(this.identifier_.toString(16).padStart(8, '0'));
                default:
                    return null;
            }
        };
        ApiIdentifier.prototype.equalTo = function (other) {
            return this.identifier_ === +other;
        };
        ApiIdentifier.prototype.toJSON = function () {
            return {
                identifier: this.identifier_,
                label: this.label_,
            };
        };
        return ApiIdentifier;
    }());

    var __extends$2 = (window && window.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var ApiError = (function (_super) {
        __extends$2(ApiError, _super);
        function ApiError(identifier) {
            var _this = _super.call(this, identifier, ApiError.Code) || this;
            _this[_a] = 'ApiError';
            return _this;
        }
        ApiError.prototype.equalTo = function (other) {
            return _super.prototype.equalTo.call(this, +other);
        };
        var _a;
        _a = Symbol.toStringTag;
        ApiError.Code = {
            CANNOT_MAKE_OBJECT: 41220,
            CAPTURE_ALREADY_TERMINATED: 8216,
            COMM_BUFFER_FULL: 195,
            COMM_DEVICE_INCOMPATIBLE: 194,
            COMM_DISCONNECTED: 193,
            COMM_PORT_IS_IN_USE: 192,
            COMM_USB_BUS_ERR: 196,
            DEVICE_BUSY: 129,
            DEVICE_CF_GATE_CHANGED: 137,
            DEVICE_DIAL_CHANGED: 138,
            DEVICE_DISK_ERROR: 136,
            DEVICE_EMERGENCY: 131,
            DEVICE_INTERNAL_ERROR: 133,
            DEVICE_INVALID: 130,
            DEVICE_INVALID_PARAMETER: 134,
            DEVICE_MEMORY_FULL: 132,
            DEVICE_NO_DISK: 135,
            DEVICE_NOT_FOUND: 128,
            DEVICE_NOT_INSTALLED: 139,
            DEVICE_NOT_LAUNCHED: 228,
            DEVICE_NOT_RELEASED: 141,
            DEVICE_STAY_AWAKE: 140,
            DEVICEPROP_NOT_SUPPORTED: 8202,
            DIR_ENTRY_EXISTS: 67,
            DIR_ENTRY_NOT_FOUND: 66,
            DIR_IO_ERROR: 65,
            DIR_NOT_EMPTY: 68,
            DIR_NOT_FOUND: 64,
            ENUM_NA: 240,
            FILE_ALREADY_EXISTS: 43,
            FILE_CLOSE_ERROR: 36,
            FILE_DATA_CORRUPT: 45,
            FILE_DISK_FULL_ERROR: 42,
            FILE_FORMAT_UNRECOGNIZED: 44,
            FILE_IO_ERROR: 32,
            FILE_NAMING_NA: 46,
            FILE_NOT_FOUND: 34,
            FILE_OPEN_ERROR: 35,
            FILE_PERMISSION_ERROR: 41,
            FILE_READ_ERROR: 39,
            FILE_SEEK_ERROR: 37,
            FILE_TELL_ERROR: 38,
            FILE_TOO_MANY_OPEN: 33,
            FILE_WRITE_ERROR: 40,
            HANDLE_NOT_FOUND: 242,
            INCOMPATIBLE_VERSION: 6,
            INCOMPLETE_TRANSFER: 8199,
            INTERNAL_ERROR: 2,
            INVALID_CODE_FORMAT: 8214,
            INVALID_DEVICEPROP_FORMAT: 8219,
            INVALID_DEVICEPROP_VALUE: 8220,
            INVALID_FN_CALL: 241,
            INVALID_FN_POINTER: 101,
            INVALID_HANDLE: 97,
            INVALID_ID: 243,
            INVALID_INDEX: 99,
            INVALID_LENGTH: 100,
            INVALID_OBJECTFORMATCODE: 8203,
            INVALID_PARAMETER: 96,
            INVALID_PARENTOBJECT: 8218,
            INVALID_POINTER: 98,
            INVALID_SORT_FN: 102,
            INVALID_STRAGEID: 8200,
            INVALID_TRANSACTIONID: 8196,
            LENS_COVER_CLOSE: 40966,
            LOW_BATTERY: 41217,
            MEM_ALLOC_FAILED: 3,
            MEM_FREE_FAILED: 4,
            MEMORYSTATUS_NOTREADY: 41222,
            MISSING_SUBCOMPONENT: 10,
            NO_VALID_OBJECTINFO: 8213,
            NOT_CAMERA_SUPPORT_SDK_VERSION: 8225,
            NOT_SUPPORTED: 7,
            OBJECT_NOTREADY: 41218,
            OPERATION_CANCELLED: 5,
            OPERATION_REFUSED: 40965,
            PARTIAL_DELETION: 8210,
            PROPERTIES_MISMATCH: 81,
            PROPERTIES_NOT_LOADED: 83,
            PROPERTIES_UNAVAILABLE: 80,
            PROTECTION_VIOLATION: 9,
            PTP_DEVICE_BUSY: 8217,
            SELECTION_UNAVAILABLE: 11,
            SELF_TEST_FAILED: 8209,
            SESSION_ALREADY_OPEN: 8222,
            SESSION_NOT_OPEN: 8195,
            SPECIFICATION_BY_FORMAT_UNSUPPORTED: 8212,
            SPECIFICATION_OF_DESTINATION_UNSUPPORTED: 8224,
            STI_DEVICE_CREATE_ERROR: 226,
            STI_DEVICE_RELEASE_ERROR: 227,
            STI_INTERNAL_ERROR: 225,
            STI_UNKNOWN_ERROR: 224,
            STREAM_ALREADY_OPEN: 162,
            STREAM_BAD_OPTIONS: 171,
            STREAM_CLOSE_ERROR: 164,
            STREAM_COULDNT_BEGIN_THREAD: 170,
            STREAM_END_OF_STREAM: 172,
            STREAM_IO_ERROR: 160,
            STREAM_NOT_OPEN: 161,
            STREAM_OPEN_ERROR: 163,
            STREAM_PERMISSION_ERROR: 169,
            STREAM_READ_ERROR: 167,
            STREAM_SEEK_ERROR: 165,
            STREAM_TELL_ERROR: 166,
            STREAM_WRITE_ERROR: 168,
            TAKE_PICTURE_AF_NG: 36097,
            TAKE_PICTURE_CARD_NG: 36103,
            TAKE_PICTURE_CARD_PROTECT_NG: 36104,
            TAKE_PICTURE_LV_REL_PROHIBIT_MODE_NG: 36109,
            TAKE_PICTURE_MIRROR_UP_NG: 36099,
            TAKE_PICTURE_MOVIE_CROP_NG: 36105,
            TAKE_PICTURE_NO_CARD_NG: 36102,
            TAKE_PICTURE_NO_LENS_NG: 36107,
            TAKE_PICTURE_RESERVED: 36098,
            TAKE_PICTURE_SENSOR_CLEANING_NG: 36100,
            TAKE_PICTURE_SILENCE_NG: 36101,
            TAKE_PICTURE_SPECIAL_MOVIE_MODE_NG: 36108,
            TAKE_PICTURE_STROBO_CHARGE_NG: 36106,
            TRANSACTION_CANCELLED: 8223,
            UNEXPECTED_EXCEPTION: 8,
            UNIMPLEMENTED: 1,
            UNKNOWN_COMMAND: 40961,
            UNKNOWN_VENDOR_CODE: 8215,
            USB_DEVICE_LOCK_ERROR: 208,
            USB_DEVICE_UNLOCK_ERROR: 209,
            WAIT_TIMEOUT_ERROR: 244,
        };
        return ApiError;
    }(ApiIdentifier));

    var Camera = (function () {
        function Camera(indexOrPort) {
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
            throw new Error('Not implemented - stub only.');
        };
        Camera.prototype.disconnect = function () {
            throw new Error('Not implemented - stub only.');
        };
        Camera.prototype.getProperty = function (propertyID, specifier) {
            throw new Error('Not implemented - stub only.');
        };
        Camera.prototype.setProperty = function (propertyID, value) {
            throw new Error('Not implemented - stub only.');
        };
        Camera.prototype.setProperties = function (properties) {
            throw new Error('Not implemented - stub only.');
        };
        Camera.prototype.sendCommand = function (command, parameter) {
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

    var CameraBrowser = (function () {
        function CameraBrowser() {
            this[_a] = 'CameraBrowser';
            throw new Error('Not implemented - stub only.');
        }
        CameraBrowser.prototype.setEventHandler = function (listener) {
            throw new Error('Not implemented - stub only.');
        };
        CameraBrowser.prototype.initialize = function () {
            throw new Error('Not implemented - stub only.');
        };
        CameraBrowser.prototype.terminate = function () {
            throw new Error('Not implemented - stub only.');
        };
        CameraBrowser.prototype.triggerEvents = function () {
            throw new Error('Not implemented - stub only.');
        };
        CameraBrowser.prototype.getCamera = function (at, exactOnly) {
            throw new Error('Not implemented - stub only.');
        };
        CameraBrowser.prototype.getCameras = function () {
            throw new Error('Not implemented - stub only.');
        };
        CameraBrowser.prototype.update = function () {
            throw new Error('Not implemented - stub only.');
        };
        var _a;
        _a = Symbol.toStringTag;
        CameraBrowser.EventName = {
            CameraAdd: 'CameraAdd',
            CameraConnect: 'CameraConnect',
            CameraDisconnect: 'CameraDisconnect',
            CameraRemove: 'CameraRemove',
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
        return CameraBrowser;
    }());

    var _a$1;
    var CameraFile = (function () {
        function CameraFile() {
            this[_a$1] = 'CameraFile';
            throw new Error('Not implemented - stub only.');
        }
        Object.defineProperty(CameraFile.prototype, "name", {
            get: function () {
                throw new Error('Not implemented - stub only.');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CameraFile.prototype, "localFile", {
            get: function () {
                throw new Error('Not implemented - stub only.');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CameraFile.prototype, "groupID", {
            get: function () {
                throw new Error('Not implemented - stub only.');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CameraFile.prototype, "size", {
            get: function () {
                throw new Error('Not implemented - stub only.');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CameraFile.prototype, "format", {
            get: function () {
                throw new Error('Not implemented - stub only.');
            },
            enumerable: false,
            configurable: true
        });
        CameraFile.prototype.downloadToPath = function (path) {
            throw new Error('Not implemented - stub only.');
        };
        CameraFile.prototype.downloadToFile = function (fileName) {
            throw new Error('Not implemented - stub only.');
        };
        CameraFile.prototype.downloadToString = function () {
            throw new Error('Not implemented - stub only.');
        };
        CameraFile.prototype.downloadThumbnailToString = function () {
            throw new Error('Not implemented - stub only.');
        };
        return CameraFile;
    }());
    _a$1 = Symbol.toStringTag;

    var CameraProperty = (function () {
        function CameraProperty(camera, propertyID, propertySpecifier) {
            this[_a] = 'CameraProperty';
            throw new Error('Not implemented - stub only.');
        }
        Object.defineProperty(CameraProperty.prototype, "label", {
            get: function () {
                throw new Error('Not implemented - stub only.');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CameraProperty.prototype, "identifier", {
            get: function () {
                throw new Error('Not implemented - stub only.');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CameraProperty.prototype, "specifier", {
            get: function () {
                throw new Error('Not implemented - stub only.');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CameraProperty.prototype, "available", {
            get: function () {
                throw new Error('Not implemented - stub only.');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CameraProperty.prototype, "value", {
            get: function () {
                throw new Error('Not implemented - stub only.');
            },
            set: function (value) {
                throw new Error('Not implemented - stub only.');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CameraProperty.prototype, "allowedValues", {
            get: function () {
                throw new Error('Not implemented - stub only.');
            },
            enumerable: false,
            configurable: true
        });
        CameraProperty.prototype.toJSON = function () {
            throw new Error('Not implemented - stub only.');
        };
        var _a;
        _a = Symbol.toStringTag;
        CameraProperty.ID = {
            AEBracket: 1038,
            AEMode: 1024,
            AEModeSelect: 1078,
            AFMode: 1028,
            Artist: 1048,
            AutoPowerOffSetting: 16778334,
            Av: 1029,
            AvailableShots: 1034,
            BatteryLevel: 8,
            BatteryQuality: 16,
            BodyIDEx: 21,
            Bracket: 1035,
            CFn: 9,
            ColorSpace: 269,
            ColorTemperature: 263,
            Copyright: 1049,
            CurrentFolder: 13,
            CurrentStorage: 12,
            DateTime: 6,
            DC_Strobe: 1537,
            DC_Zoom: 1536,
            DepthOfField: 1051,
            DriveMode: 1025,
            EFCompensation: 1054,
            Evf_AFMode: 1294,
            Evf_ClickWBCoeffs: 16778502,
            Evf_ColorTemperature: 1283,
            Evf_CoordinateSystem: 1344,
            Evf_DepthOfFieldPreview: 1284,
            Evf_FocusAid: 1289,
            Evf_Histogram: 1290,
            Evf_HistogramB: 1304,
            Evf_HistogramG: 1303,
            Evf_HistogramR: 1302,
            Evf_HistogramStatus: 1292,
            Evf_HistogramY: 1301,
            Evf_ImageClipRect: 1349,
            Evf_ImagePosition: 1291,
            Evf_Mode: 1281,
            Evf_OutputDevice: 1280,
            Evf_PowerZoom_CurPosition: 1360,
            Evf_PowerZoom_MaxPosition: 1361,
            Evf_PowerZoom_MinPosition: 1362,
            EVF_RollingPitching: 16778564,
            Evf_WhiteBalance: 1282,
            Evf_Zoom: 1287,
            Evf_ZoomPosition: 1288,
            Evf_ZoomRect: 1345,
            ExposureCompensation: 1031,
            FEBracket: 1039,
            FirmwareVersion: 7,
            FixedMovie: 16778274,
            FlashCompensation: 1032,
            FlashMode: 1044,
            FlashOn: 1042,
            FocalLength: 1033,
            FocusInfo: 260,
            GPSAltitude: 2054,
            GPSAltitudeRef: 2053,
            GPSDateStamp: 2077,
            GPSLatitude: 2050,
            GPSLatitudeRef: 2049,
            GPSLongitude: 2052,
            GPSLongitudeRef: 2051,
            GPSMapDatum: 2066,
            GPSSatellites: 2056,
            GPSStatus: 2057,
            GPSTimeStamp: 2055,
            GPSVersionID: 2048,
            HDDirectoryStructure: 32,
            ICCProfile: 259,
            ImageQuality: 256,
            ISOBracket: 1040,
            ISOSpeed: 1026,
            JpegQuality: 257,
            LensBarrelStatus: 1541,
            LensName: 1037,
            LensStatus: 1046,
            MakerName: 5,
            ManualWhiteBalanceData: 16777732,
            MeteringMode: 1027,
            MirrorLockUpState: 16778273,
            MirrorUpSetting: 16778296,
            MovieParam: 16778275,
            MyMenu: 14,
            NoiseReduction: 1041,
            Orientation: 258,
            OwnerName: 4,
            PictureStyle: 276,
            PictureStyleCaption: 512,
            PictureStyleDescription: 277,
            PowerZoom_Speed: 1092,
            ProductName: 2,
            Record: 1296,
            RedEye: 1043,
            SaveTo: 11,
            SummerTimeSetting: 16777240,
            TemperatureStatus: 16778261,
            TimeZone: 16777239,
            Tv: 1030,
            UTCTime: 16777238,
            WhiteBalance: 262,
            WhiteBalanceBracket: 1036,
            WhiteBalanceShift: 264,
        };
        return CameraProperty;
    }());

    var _a;
    var Directory = (function () {
        function Directory() {
            this[_a] = 'Directory';
            throw new Error('Not implemented - stub only.');
        }
        Object.defineProperty(Directory.prototype, "name", {
            get: function () {
                throw new Error('Not implemented - stub only.');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Directory.prototype, "length", {
            get: function () {
                throw new Error('Not implemented - stub only.');
            },
            enumerable: false,
            configurable: true
        });
        Directory.prototype.getEntries = function () {
            throw new Error('Not implemented - stub only.');
        };
        Directory.prototype[(_a = Symbol.toStringTag, Symbol.iterator)] = function () {
            throw new Error('Not implemented - stub only.');
        };
        return Directory;
    }());

    var ExposureCompensation = (function () {
        function ExposureCompensation(value_) {
            this.value_ = value_;
            this[_a] = 'ExposureCompensation';
            this.compensation_ = ExposureCompensation.Values[value_] || 0;
            this.label_ = ExposureCompensation.getLabelForCompensation(this.compensation_);
        }
        ExposureCompensation.getLabelForCompensation = function (compensation) {
            var label = '';
            if (compensation === 0) {
                return '0';
            }
            var full = compensation > 0
                ? Math.floor(compensation)
                : Math.ceil(compensation);
            var fraction = Math.abs(compensation - full);
            label = full > 0 ? '+' + String(full) : String(full);
            if (fraction > 0.6) {
                label += ' 2/3';
            }
            else if (fraction > 0.49) {
                label += ' 1/2';
            }
            else if (fraction > 0.3) {
                label += ' 1/3';
            }
            return label;
        };
        Object.defineProperty(ExposureCompensation.prototype, "label", {
            get: function () {
                return this.label_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ExposureCompensation.prototype, "value", {
            get: function () {
                return this.value_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ExposureCompensation.prototype, "compensation", {
            get: function () {
                return this.compensation_;
            },
            enumerable: false,
            configurable: true
        });
        ExposureCompensation.prototype[(_a = Symbol.toStringTag, Symbol.toPrimitive)] = function (hint) {
            switch (hint) {
                case 'number':
                    return this.value_;
                case 'string':
                    return this.label_;
                default:
                    return null;
            }
        };
        ExposureCompensation.findNearest = function (compensation) {
            var found = Object.keys(ExposureCompensation.Values).reduce(function (carry, key) {
                if (carry.difference < 0.001) {
                    return carry;
                }
                var current = ExposureCompensation.Values[key];
                var difference = Math.abs(current - compensation);
                if (difference < carry.difference) {
                    return {
                        value: +key,
                        difference: difference,
                    };
                }
                return carry;
            }, {
                value: 0,
                difference: 100,
            });
            if (found) {
                return found.value;
            }
            return null;
        };
        ExposureCompensation.forLabel = function (label) {
            var match = label.match(/([+-]\d+)\s+(?:([12])\/([23]))?/);
            if (match) {
                var compensation = parseFloat(match[1]);
                if (match[2] && match[3]) {
                    if (compensation < 0) {
                        compensation -= parseFloat(match[2]) / parseFloat(match[3]);
                    }
                    else {
                        compensation += parseFloat(match[2]) / parseFloat(match[3]);
                    }
                }
                var value = ExposureCompensation.findNearest(compensation);
                if (value) {
                    return new ExposureCompensation(value);
                }
            }
            return null;
        };
        var _a;
        ExposureCompensation.Values = {
            '0': 0,
            '3': 0.3333333333333333,
            '4': 0.5,
            '5': 0.6666666666666666,
            '8': 1,
            '11': 1.3333333333333333,
            '12': 1.5,
            '13': 1.6666666666666665,
            '16': 2,
            '19': 2.3333333333333335,
            '20': 2.5,
            '21': 2.6666666666666665,
            '24': 3,
            '27': 3.3333333333333335,
            '28': 3.5,
            '29': 3.6666666666666665,
            '32': 4,
            '35': 4.333333333333333,
            '36': 4.5,
            '37': 4.666666666666667,
            '40': 5,
            '216': -5,
            '219': -4.666666666666667,
            '220': -4.5,
            '221': -4.333333333333333,
            '224': -4,
            '227': -3.6666666666666665,
            '228': -3.5,
            '229': -3.3333333333333335,
            '232': -3,
            '235': -2.6666666666666665,
            '236': -2.5,
            '237': -2.3333333333333335,
            '240': -2,
            '243': -1.6666666666666665,
            '244': -1.5,
            '245': -1.3333333333333333,
            '248': -1,
            '251': -0.6666666666666666,
            '252': -0.5,
            '253': -0.3333333333333333,
        };
        return ExposureCompensation;
    }());

    var FileFormat = (function () {
        function FileFormat(value_) {
            var _this = this;
            this.value_ = value_;
            this[_a] = 'FileFormat';
            this.label_ =
                Object.keys(FileFormat.ID).find(function (key) { return FileFormat.ID[key] === _this.value_; }) || "0x".concat(value_.toString(16).padStart(8, '0'));
        }
        Object.defineProperty(FileFormat.prototype, "label", {
            get: function () {
                return this.label_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FileFormat.prototype, "value", {
            get: function () {
                return this.value_;
            },
            enumerable: false,
            configurable: true
        });
        FileFormat.prototype[(_a = Symbol.toStringTag, Symbol.toPrimitive)] = function (hint) {
            switch (hint) {
                case 'number':
                    return this.value_;
                case 'string':
                    return this.label;
                default:
                    return null;
            }
        };
        var _a;
        FileFormat.ID = {
            CR2: 45315,
            CR3: 45320,
            HEIF_CODE: 45323,
            JPEG: 14337,
            MP4: 47490,
            Unknown: 0,
        };
        return FileFormat;
    }());

    var Flag = (function () {
        function Flag(value) {
            this[_a] = 'Flag';
            if (typeof value === 'boolean') {
                this.value_ = value ? Flag.True : Flag.False;
            }
            else if (value === Flag.True) {
                this.value_ = Flag.True;
            }
            else {
                this.value_ = Flag.False;
            }
            if (this.value_ === Flag.True) {
                this.label_ = 'true';
            }
            else {
                this.label_ = 'false';
            }
        }
        Object.defineProperty(Flag.prototype, "label", {
            get: function () {
                return this.label_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Flag.prototype, "value", {
            get: function () {
                return this.value_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Flag.prototype, "flag", {
            get: function () {
                return this.value_ !== 0;
            },
            enumerable: false,
            configurable: true
        });
        Flag.prototype[(_a = Symbol.toStringTag, Symbol.toPrimitive)] = function (hint) {
            switch (hint) {
                case 'number':
                    return this.value_;
                case 'string':
                    return this.label_;
                default:
                    return null;
            }
        };
        Flag.prototype.toJSON = function () {
            return {
                label: this.label,
                value: this.value,
                flag: this.flag,
            };
        };
        Flag.forLabel = function (label) {
            if (['true', '1', 'yes', 'on'].indexOf(label.toLowerCase()) >= 0) {
                return new Flag(Flag.True);
            }
            return new Flag(Flag.False);
        };
        var _a;
        Flag.True = 1;
        Flag.False = 0;
        return Flag;
    }());

    var ImageQuality = (function () {
        function ImageQuality(value_) {
            this.value_ = value_;
            this[_a] = 'ImageQuality';
            var name = Object.keys(ImageQuality.ID).find(function (key) { return ImageQuality.ID[key] === value_; });
            if (name) {
                this.label_ = name;
            }
            else {
                this.label_ = '0x' + value_.toString(16).padStart(8, '0');
            }
        }
        ImageQuality.extractBits = function (buffer, offset, length) {
            return ((1 << length) - 1) & (buffer >> offset);
        };
        Object.defineProperty(ImageQuality.prototype, "label", {
            get: function () {
                return this.label_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ImageQuality.prototype, "value", {
            get: function () {
                return this.value_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ImageQuality.prototype, "main", {
            get: function () {
                return {
                    format: ImageQuality.extractBits(this.value_, 24, 8),
                    size: ImageQuality.extractBits(this.value_, 20, 4),
                    quality: ImageQuality.extractBits(this.value_, 16, 4),
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ImageQuality.prototype, "secondary", {
            get: function () {
                return {
                    format: ImageQuality.extractBits(this.value_, 8, 4),
                    size: ImageQuality.extractBits(this.value_, 4, 4),
                    quality: ImageQuality.extractBits(this.value_, 0, 4),
                };
            },
            enumerable: false,
            configurable: true
        });
        ImageQuality.prototype[(_a = Symbol.toStringTag, Symbol.toPrimitive)] = function (hint) {
            switch (hint) {
                case 'number':
                    return this.value_;
                case 'string':
                    return this.label_;
                default:
                    return null;
            }
        };
        var _a;
        ImageQuality.ID = {
            CR: 6553359,
            CRHEIFL: 6488192,
            CRHEIFLF: 6488195,
            CRHEIFLN: 6488194,
            CRHEIFMF: 6488451,
            CRHEIFMN: 6488450,
            CRHEIFS1F: 6491779,
            CRHEIFS1N: 6491778,
            CRHEIFS2F: 6492035,
            CRLJ: 6488080,
            CRLJF: 6488083,
            CRLJN: 6488082,
            CRM1J: 6489360,
            CRM1JF: 6489363,
            CRM1JN: 6489362,
            CRM2J: 6489616,
            CRM2JF: 6489619,
            CRM2JN: 6489618,
            CRMJ: 6488336,
            CRMJF: 6488339,
            CRMJN: 6488338,
            CRS1J: 6491664,
            CRS1JF: 6491667,
            CRS1JN: 6491666,
            CRS2J: 6491920,
            CRS2JF: 6491923,
            CRS3JF: 6492179,
            CRSJ: 6488592,
            CRSJF: 6488595,
            CRSJN: 6488594,
            HEIFL: 8453903,
            HEIFLF: 8650511,
            HEIFLN: 8584975,
            HEIFMF: 25427727,
            HEIFMN: 25362191,
            HEIFS1F: 243531535,
            HEIFS1N: 243465999,
            HEIFS2F: 260308751,
            LargeJPEG: 1113871,
            LargeJPEGFine: 1310479,
            LargeJPEGNormal: 1244943,
            Middle1JPEG: 84999951,
            Middle2JPEG: 101777167,
            MiddleJPEG: 17891087,
            MiddleJPEGFine: 18087695,
            MiddleJPEGNormal: 18022159,
            MR: 23396111,
            MRLJ: 23330832,
            MRLJF: 23330835,
            MRLJN: 23330834,
            MRM1J: 23332112,
            MRM2J: 23332368,
            MRMJF: 23331091,
            MRMJN: 23331090,
            MRS1JF: 23334419,
            MRS1JN: 23334418,
            MRS2JF: 23334675,
            MRS3JF: 23334931,
            MRSJ: 23331344,
            MRSJF: 23331347,
            MRSJN: 23331346,
            RAW: 6618895,
            RAWAndLargeJPEG: 6553616,
            RAWAndLargeJPEGFine: 6553619,
            RAWAndLargeJPEGNormal: 6553618,
            RAWAndMiddle1JPEG: 6554896,
            RAWAndMiddle2JPEG: 6555152,
            RAWAndMiddleJPEG: 6553872,
            RAWAndMiddleJPEGFine: 6553875,
            RAWAndMiddleJPEGNormal: 6553874,
            RAWAndSmall1JPEG: 6557200,
            RAWAndSmall1JPEGFine: 6557203,
            RAWAndSmall1JPEGNormal: 6557202,
            RAWAndSmall2JPEG: 6557456,
            RAWAndSmall2JPEGFine: 6557459,
            RAWAndSmall3JPEGFine: 6557715,
            RAWAndSmallJPEG: 6554128,
            RAWAndSmallJPEGFine: 6554131,
            RAWAndSmallJPEGNormal: 6554130,
            RHEIFL: 6553728,
            RHEIFLF: 6553731,
            RHEIFLN: 6553730,
            RHEIFMF: 6553987,
            RHEIFMN: 6553986,
            RHEIFS1F: 6557315,
            RHEIFS1N: 6557314,
            RHEIFS2F: 6557571,
            Small1JPEGFine: 236191503,
            Small1JPEGNormal: 236125967,
            Small2JPEGFine: 252968719,
            Small3JPEGFine: 269745935,
            SmallJPEG: 34668303,
            SmallJPEG1: 235994895,
            SmallJPEG2: 252772111,
            SmallJPEGFine: 34864911,
            SmallJPEGNormal: 34799375,
            SR: 40173327,
            SRLJ: 40108048,
            SRLJF: 40108051,
            SRLJN: 40108050,
            SRM1J: 40109328,
            SRM2J: 40109584,
            SRMJF: 40108307,
            SRMJN: 40108306,
            SRS1JF: 40111635,
            SRS1JN: 40111634,
            SRS2JF: 40111891,
            SRS3JF: 40112147,
            SRSJ: 40108560,
            SRSJF: 40108563,
            SRSJN: 40108562,
            Unknown: 4294967295,
        };
        ImageQuality.Format = {
            CR2: 6,
            CRW: 2,
            HEIF: 8,
            JPEG: 1,
            RAW: 4,
            Unknown: 0,
        };
        ImageQuality.Size = {
            Large: 0,
            Middle: 1,
            Middle1: 5,
            Middle2: 6,
            Small: 2,
            Small1: 14,
            Small2: 15,
            Small3: 16,
            Unknown: 4294967295,
        };
        ImageQuality.CompressionQuality = {
            Fine: 3,
            Lossless: 4,
            Normal: 2,
            SuperFine: 5,
            Unknown: 4294967295,
        };
        return ImageQuality;
    }());

    var ISOSensitivity = (function () {
        function ISOSensitivity(value_) {
            this.value_ = value_;
            this[_a] = 'ISOSensitivity';
            if (value_ === 0) {
                this.label_ = 'Auto';
                this.sensitivity_ = 0;
            }
            else {
                this.sensitivity_ = ISOSensitivity.Values[value_] || 0;
                this.label_ = this.sensitivity_.toString();
            }
        }
        Object.defineProperty(ISOSensitivity.prototype, "label", {
            get: function () {
                return this.label_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ISOSensitivity.prototype, "value", {
            get: function () {
                return this.value_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ISOSensitivity.prototype, "sensitivity", {
            get: function () {
                return this.sensitivity_;
            },
            enumerable: false,
            configurable: true
        });
        ISOSensitivity.prototype[(_a = Symbol.toStringTag, Symbol.toPrimitive)] = function (hint) {
            switch (hint) {
                case 'number':
                    return this.value_;
                case 'string':
                    return this.label_;
                default:
                    return null;
            }
        };
        ISOSensitivity.prototype.toJSON = function () {
            return {
                label: this.label,
                value: this.value,
                ISOSensitivity: this.sensitivity,
            };
        };
        ISOSensitivity.findNearest = function (valueOrLabel, filter) {
            var sensitivity;
            if (typeof valueOrLabel === 'string') {
                var iso = ISOSensitivity.forLabel(valueOrLabel);
                if (!iso) {
                    return null;
                }
                sensitivity = iso.sensitivity;
            }
            else {
                sensitivity = new ISOSensitivity(valueOrLabel).sensitivity;
            }
            var found = Object.keys(ISOSensitivity.Values).reduce(function (carry, key) {
                var current = ISOSensitivity.Values[key];
                var difference = Math.abs(current - sensitivity);
                if (!carry || difference < carry.difference) {
                    if (filter && !filter(new ISOSensitivity(+key))) {
                        return carry;
                    }
                    return {
                        value: +key,
                        difference: difference,
                    };
                }
                return carry;
            }, null);
            if (found) {
                return new ISOSensitivity(found.value);
            }
            return null;
        };
        ISOSensitivity.forLabel = function (label) {
            if (label in ISOSensitivity.ID) {
                return new ISOSensitivity(ISOSensitivity.ID[label]);
            }
            var value = Object.keys(ISOSensitivity.Values).find(function (key) { return ISOSensitivity.Values[key] === +label; });
            if (value) {
                return new ISOSensitivity(+value);
            }
            return null;
        };
        var _a;
        ISOSensitivity.ID = {
            Auto: 0,
        };
        ISOSensitivity.Values = {
            '40': 6,
            '48': 12,
            '56': 25,
            '64': 50,
            '72': 100,
            '75': 125,
            '77': 160,
            '80': 200,
            '83': 250,
            '85': 320,
            '88': 400,
            '91': 500,
            '93': 640,
            '96': 800,
            '99': 1000,
            '101': 1250,
            '104': 1600,
            '107': 2000,
            '109': 2500,
            '112': 3200,
            '115': 4000,
            '117': 5000,
            '120': 6400,
            '123': 8000,
            '125': 10000,
            '128': 12800,
            '131': 16000,
            '133': 20000,
            '136': 25600,
            '139': 32000,
            '141': 40000,
            '144': 51200,
            '147': 64000,
            '149': 80000,
            '152': 102400,
            '160': 204800,
            '168': 409600,
            '176': 819200,
        };
        return ISOSensitivity;
    }());

    var __extends$1 = (window && window.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var ObjectEvent = (function (_super) {
        __extends$1(ObjectEvent, _super);
        function ObjectEvent(identifier) {
            var _this = _super.call(this, identifier, ObjectEvent.ID) || this;
            _this[_a] = 'ObjectEvent';
            return _this;
        }
        ObjectEvent.prototype.equalTo = function (other) {
            return _super.prototype.equalTo.call(this, +other);
        };
        var _a;
        _a = Symbol.toStringTag;
        ObjectEvent.ID = {
            All: 512,
            DirItemCancelTransferDT: 522,
            DirItemContentChanged: 519,
            DirItemCreated: 516,
            DirItemInfoChanged: 518,
            DirItemRemoved: 517,
            DirItemRequestTransfer: 520,
            DirItemRequestTransferDT: 521,
            FolderUpdateItems: 515,
            VolumeAdded: 524,
            VolumeInfoChanged: 513,
            VolumeRemoved: 525,
            VolumeUpdateItems: 514,
        };
        return ObjectEvent;
    }(ApiIdentifier));

    var Option = (function () {
        function Option(propertyID_, value_) {
            this.propertyID_ = propertyID_;
            this.value_ = value_;
            this[_a] = 'Option';
            this.label_ = "0x".concat(value_.toString(16).padStart(8, '0'));
            var propertyLabel = Object.keys(CameraProperty.ID).find(function (key) { return CameraProperty.ID[key] === propertyID_; });
            if (propertyLabel && propertyLabel in Option) {
                var optionLabels_1 = Option[propertyLabel];
                var optionLabel = Object.keys(optionLabels_1).find(function (key) { return optionLabels_1[key] === value_; });
                if (optionLabel) {
                    this.label_ = propertyLabel + '.' + optionLabel;
                }
            }
        }
        Object.defineProperty(Option.prototype, "label", {
            get: function () {
                return this.label_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Option.prototype, "value", {
            get: function () {
                return this.value_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Option.prototype, "propertyID", {
            get: function () {
                return this.propertyID_;
            },
            enumerable: false,
            configurable: true
        });
        Option.prototype[(_a = Symbol.toStringTag, Symbol.toPrimitive)] = function (hint) {
            switch (hint) {
                case 'number':
                    return this.value_;
                case 'string':
                    return this.label_;
                default:
                    return null;
            }
        };
        Option.forLabel = function (label) {
            var _b = label.split('.', 2), propertyLabel = _b[0], optionLabel = _b[1];
            var propertyID = CameraProperty.ID[propertyLabel] || null;
            if (propertyID &&
                propertyLabel in Option &&
                optionLabel in Option[propertyLabel]) {
                return new Option(propertyID, Option[propertyLabel][optionLabel]);
            }
            return null;
        };
        var _a;
        Option.AEMode = {
            A_DEP: 5,
            Av: 2,
            BackgroundBlur: 62,
            BacklitScenes: 24,
            Bulb: 4,
            CandlelightPortraits: 28,
            Children: 26,
            Closeup: 14,
            CreativeAuto: 19,
            CreativeFilter: 29,
            Custom: 7,
            DEP: 6,
            Fireworks: 57,
            Fisheye: 33,
            FlashOff: 15,
            Flexible: 55,
            Food: 27,
            Green: 9,
            GroupPhoto: 46,
            Hdr_Bold: 38,
            Hdr_Embossed: 39,
            Hdr_Standard: 36,
            Hdr_Vivid: 37,
            Landscape: 13,
            Lock: 8,
            Manual: 3,
            Miniature: 35,
            Movie: 20,
            Movie_DirectMono: 43,
            Movie_Fantasy: 40,
            Movie_Memory: 42,
            Movie_Mini: 44,
            Movie_Old: 41,
            Myself: 50,
            NightPortrait: 10,
            NightScenes: 23,
            OilPainting: 56,
            PanningAssist: 45,
            Panorama: 53,
            PhotoInMovie: 21,
            PlusMovieAuto: 51,
            Portrait: 12,
            ProgramAE: 0,
            RoughMonoChrome: 30,
            SceneIntelligentAuto: 22,
            SCN: 25,
            Silent: 54,
            SmoothSkin: 52,
            SoftFocus: 31,
            Sports: 11,
            StarNightScape: 59,
            StarPortrait: 58,
            StarTimelapseMovie: 61,
            StarTrails: 60,
            ToyCamera: 32,
            Tv: 1,
            Unknown: 4294967295,
            VideoBlog: 63,
            WaterColor: 34,
        };
        Option.AEModeSelect = {
            A_DEP: 5,
            Av: 2,
            BackgroundBlur: 62,
            BacklitScenes: 24,
            Bulb: 4,
            CandlelightPortraits: 28,
            Children: 26,
            Closeup: 14,
            CreativeAuto: 19,
            CreativeFilter: 29,
            Custom: 7,
            Custom2: 16,
            Custom3: 17,
            DEP: 6,
            Fireworks: 57,
            Fisheye: 33,
            FlashOff: 15,
            Flexible: 55,
            Food: 27,
            Green: 9,
            GroupPhoto: 46,
            Hdr_Bold: 38,
            Hdr_Embossed: 39,
            Hdr_Standard: 36,
            Hdr_Vivid: 37,
            Landscape: 13,
            Lock: 8,
            Manual: 3,
            Miniature: 35,
            Movie: 20,
            Movie_DirectMono: 43,
            Movie_Fantasy: 40,
            Movie_Memory: 42,
            Movie_Mini: 44,
            Movie_Old: 41,
            Myself: 50,
            NightPortrait: 10,
            NightScenes: 23,
            OilPainting: 56,
            PanningAssist: 45,
            Panorama: 53,
            PhotoInMovie: 21,
            PlusMovieAuto: 51,
            Portrait: 12,
            ProgramAE: 0,
            RoughMonoChrome: 30,
            SceneIntelligentAuto: 22,
            SCN: 25,
            Silent: 54,
            SmoothSkin: 52,
            SoftFocus: 31,
            Sports: 11,
            StarNightScape: 59,
            StarPortrait: 58,
            StarTimelapseMovie: 61,
            StarTrails: 60,
            ToyCamera: 32,
            Tv: 1,
            Unknown: 4294967295,
            WaterColor: 34,
        };
        Option.AFMode = {
            AIFocus: 2,
            AIServo: 1,
            ManualFocus: 3,
            NotValid: 4294967295,
            OneShot: 0,
        };
        Option.BatteryQuality = {
            Full: 3,
            Half: 1,
            High: 2,
            Low: 0,
        };
        Option.Bracket = {
            AEBracket: 1,
            BracketOff: 4294967295,
            FEBracket: 8,
            ISOBracket: 2,
            WBBracket: 4,
        };
        Option.ColorSpace = {
            AdobeRGB: 2,
            sRGB: 1,
            Unknown: 4294967295,
        };
        Option.DCStrobe = {
            Auto: 0,
            Off: 3,
            On: 1,
            SlowSynchro: 2,
        };
        Option.DriveMode = {
            ContinuousShooting: 1,
            HighSpeedContinuous: 4,
            LowSpeedContinuous: 5,
            SelfTimer2sec: 17,
            SelfTimer10sec: 16,
            SelfTimerContinuous: 7,
            SilentContinuousShooting: 20,
            SilentHSContinuous: 21,
            SilentLSContinuous: 22,
            SilentSingleShooting: 19,
            SingleShooting: 0,
            SingleSilentShooting: 6,
            SuperHighSpeed14fps: 18,
            Video: 2,
        };
        Option.EvfAFMode = {
            ExpandAFAreaAround: 6,
            ExpandAFAreaCross: 5,
            FaceTracking: 2,
            FlexiZoneMulti: 3,
            LargeZoneAFHorizontal: 7,
            LargeZoneAFVertical: 8,
            OnePointAF: 1,
            Quick: 0,
            SpotAF: 10,
            TrackingAF: 9,
            ZoneAF: 4,
        };
        Option.EvfHistogramStatus = {
            Grayout: 2,
            Hide: 0,
            Normal: 1,
        };
        Option.EvfOutputDevice = {
            None: 0,
            PC: 2,
            SmallPC: 8,
            TFT: 1,
        };
        Option.EvfZoom = {
            Fit: 1,
            x5: 5,
            x10: 10,
        };
        Option.LensBarrelStatus = {
            Inner: 0,
            Outer: 1,
        };
        Option.LensStatus = {
            Attached: 1,
            NotAttached: 0,
        };
        Option.MeteringMode = {
            CenterWeightedAverage: 5,
            Evaluative: 3,
            NotValid: 4294967295,
            Partial: 4,
            Spot: 1,
        };
        Option.MirrorUpStatus = {
            Disable: 0,
            DuringShooting: 2,
            Enable: 1,
        };
        Option.MovieQuality = {
            '23.98fps (RAW)': 668272,
            '24.00fps (RAW)': 668528,
            '25.00fps (RAW)': 668784,
            '29.97fps (RAW)': 669040,
            '50.00fps (RAW)': 669296,
            '59.94fps (RAW)': 669552,
            '640x480 25.00fps': 132096,
            '640x480 29.97ffps': 132352,
            '1280x720 25.00fps Standard(IPB)': 70704,
            '1280x720 29.97fps Light(IPB)': 70961,
            '1280x720 29.97fps Standard(IPB)': 70960,
            '1280x720 50.00fps': 67072,
            '1280x720 50.00fps For editing(ALL-I)': 71184,
            '1280x720 50.00fps Standard(IPB)': 71216,
            '1280x720 59.94fps': 67328,
            '1280x720 59.94fps For editing(ALL-I)': 71440,
            '1280x720 59.94fps Standard(IPB)': 71472,
            '1280x720 100.0fps For editing(ALL-I)': 71696,
            '1280x720 100.0fps Standard(IPB)': 71728,
            '1280x720 119.9fps For editing(ALL-I)': 71952,
            '1280x720 119.9fps Standard(IPB)': 71984,
            '1920x1080 23.98fps': 512,
            '1920x1080 23.98fps For editing(ALL-I)': 4624,
            '1920x1080 23.98fps For editing(ALL-I)Crop': 134222352,
            '1920x1080 23.98fps Standard(IPB)': 4656,
            '1920x1080 23.98fps Standard(IPB)Crop': 134222384,
            '1920x1080 24.00fps For editing(ALL-I)': 4880,
            '1920x1080 24.00fps For editing(ALL-I)Crop': 134222864,
            '1920x1080 24.00fps Standard(IPB)': 4912,
            '1920x1080 24.00fps Standard(IPB)Crop': 134222896,
            '1920x1080 25.00fps': 1024,
            '1920x1080 25.00fps For editing(ALL-I)': 5136,
            '1920x1080 25.00fps For editing(ALL-I)Crop': 134222897,
            '1920x1080 25.00fps Light(IPB)': 5169,
            '1920x1080 25.00fps Standard(IPB)': 5168,
            '1920x1080 25.00fps Standard(IPB)Crop': 134223120,
            '1920x1080 29.94fps Standard(IPB)Crop': 134223153,
            '1920x1080 29.97fps': 1280,
            '1920x1080 29.97fps For editing(ALL-I)': 1296,
            '1920x1080 29.97fps For editing(ALL-I)Crop': 134223152,
            '1920x1080 29.97fps Light(IPB)': 5425,
            '1920x1080 29.97fps Standard(IPB)': 5424,
            '1920x1080 50.00fps For editing(ALL-I)': 5648,
            '1920x1080 50.00fps For editing(ALL-I)Crop': 134223376,
            '1920x1080 50.00fps Standard(IPB)': 5680,
            '1920x1080 50.00fps Standard(IPB)Crop': 134223408,
            '1920x1080 59.94fps For editing(ALL-I)': 5904,
            '1920x1080 59.94fps For editing(ALL-I)Crop': 134223632,
            '1920x1080 59.94fps Standard(IPB)': 5936,
            '1920x1080 59.94fps Standard(IPB)Crop': 134223664,
            '1920x1080 100.0fps For editing(ALL-I)': 6160,
            '1920x1080 119.9fps For editing(ALL-I)': 6416,
            '3840x2160 23.98fps For editing(ALL-I)': 134550032,
            '3840x2160 23.98fps Standard(IPB)': 134550064,
            '3840x2160 24.00fps For editing(ALL-I)': 332560,
            '3840x2160 24.00fps Standard(IPB)': 332592,
            '3840x2160 25.00fps For editing(ALL-I)': 134550544,
            '3840x2160 25.00fps Standard(IPB)': 134550576,
            '3840x2160 29.97fps For editing(ALL-I)': 134550800,
            '3840x2160 29.97fps Standard(IPB)': 134550832,
            '3840x2160 50.00fps For editing(ALL-I)': 134551056,
            '3840x2160 50.00fps Standard(IPB)': 134551088,
            '3840x2160 59.94fps For editing(ALL-I)': 134551312,
            '3840x2160 59.94fps Standard(IPB)': 134551344,
            '3840x2160 100.0fps For editing(ALL-I)': 333840,
            '3840x2160 119.9fps For editing(ALL-I)': 334096,
            '4096x2160 23.98fps For editing(ALL-I)': 201232,
            '4096x2160 23.98fps For editing(ALL-I) Crop': 134418960,
            '4096x2160 23.98fps Motion JPEG': 197184,
            '4096x2160 23.98fps Standard(IPB)': 201264,
            '4096x2160 23.98fps Standard(IPB)Crop': 134418992,
            '4096x2160 24.00fps For editing(ALL-I)': 201488,
            '4096x2160 24.00fps For editing(ALL-I)Crop': 134419216,
            '4096x2160 24.00fps Motion JPEG': 197440,
            '4096x2160 24.00fps Standard(IPB)': 201520,
            '4096x2160 24.00fps Standard(IPB)Crop': 134419248,
            '4096x2160 25.00fps For editing(ALL-I)': 201744,
            '4096x2160 25.00fps For editing(ALL-I)Crop': 134419472,
            '4096x2160 25.00fps Motion JPEG': 197696,
            '4096x2160 25.00fps Standard(IPB)': 201776,
            '4096x2160 25.00fps Standard(IPB)Crop': 134419504,
            '4096x2160 29.94fps Standard(IPB)Crop': 134419760,
            '4096x2160 29.97fps For editing(ALL-I)': 202000,
            '4096x2160 29.97fps For editing(ALL-I)Crop': 134419728,
            '4096x2160 29.97fps Motion JPEG': 197952,
            '4096x2160 29.970fps Standard(IPB)': 202032,
            '4096x2160 50.00fps For editing(ALL-I)': 202256,
            '4096x2160 50.00fps For editing(ALL-I)Crop': 134419984,
            '4096x2160 50.00fps Standard(IPB)': 202288,
            '4096x2160 50.00fps Standard(IPB)Crop': 134420016,
            '4096x2160 59.94fps For editing(ALL-I)': 202512,
            '4096x2160 59.94fps For editing(ALL-I)Crop': 134420240,
            '4096x2160 59.94fps Standard(IPB)': 202544,
            '4096x2160 59.94fps Standard(IPB)Crop': 134420272,
            '4096x2160 100.0fps For editing(ALL-I)': 202768,
            '4096x2160 119.9fps For editing(ALL-I)': 203024,
            '7680x4320 23.98fps For editing(ALL-I)': 594448,
            '7680x4320 23.98fps Standard(IPB)': 594480,
            '7680x4320 25.00fps For editing(ALL-I)': 594960,
            '7680x4320 25.00fps Standard(IPB)': 594992,
            '7680x4320 29.97fps For editing(ALL-I)': 595216,
            '7680x4320 29.97fps Standard(IPB)': 595248,
            '8192x4320 23.98fps For editing(ALL-I)': 528912,
            '8192x4320 23.98fps Standard(IPB)': 528944,
            '8192x4320 24.00fps For editing(ALL-I)': 529168,
            '8192x4320 24.00fps Standard(IPB)': 529200,
            '8192x4320 25.00fps For editing(ALL-I)': 529424,
            '8192x4320 25.00fps Standard(IPB)': 529456,
            '8192x4320 29.97fps For editing(ALL-I)': 529680,
            '8192x4320 29.97fps Standard(IPB)': 529712,
        };
        Option.NoiseReduction = {
            Auto: 4,
            Off: 0,
            On1: 1,
            On2: 2,
            On3: 3,
        };
        Option.RedEye = {
            Invalid: 4294967295,
            Off: 0,
            On: 1,
        };
        Option.Record = {
            Begin: 4,
            End: 0,
        };
        Option.SaveTo = {
            Both: 3,
            Camera: 1,
            Host: 2,
        };
        Option.WhiteBalance = {
            AutoAmbiencePriority: 0,
            AutoWhitePriority: 23,
            Click: 4294967295,
            Cloudy: 2,
            ColorTemperature: 9,
            CustomPC1: 10,
            CustomPC2: 11,
            CustomPC3: 12,
            CustomPC4: 20,
            CustomPC5: 21,
            Daylight: 1,
            Flash: 5,
            Fluorescent: 4,
            Pasted: 4294967294,
            Shade: 8,
            Tungsten: 3,
            WhitePaper: 6,
            WhitePaper2: 15,
            WhitePaper3: 16,
            WhitePaper4: 18,
            WhitePaper5: 19,
        };
        return Option;
    }());

    var OutputDevice = (function () {
        function OutputDevice(value) {
            this[_a] = 'OutputDevice';
            this.label_ = '';
            this.value_ = value;
            var deviceNames = [];
            for (var _i = 0, _b = Object.keys(OutputDevice.ID); _i < _b.length; _i++) {
                var deviceName = _b[_i];
                if (OutputDevice.ID[deviceName] > 0 &&
                    this.isEnabled(OutputDevice.ID[deviceName])) {
                    deviceNames.push(deviceName);
                }
            }
            this.label_ = deviceNames.join(', ');
        }
        Object.defineProperty(OutputDevice.prototype, "label", {
            get: function () {
                return this.label_ ? this.label_ : 'None';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OutputDevice.prototype, "value", {
            get: function () {
                return this.value_;
            },
            enumerable: false,
            configurable: true
        });
        OutputDevice.prototype[(_a = Symbol.toStringTag, Symbol.toPrimitive)] = function (hint) {
            switch (hint) {
                case 'number':
                    return this.value_;
                case 'string':
                    return this.label_;
                default:
                    return null;
            }
        };
        OutputDevice.prototype.isEnabled = function (deviceID) {
            return deviceID > 0 && (this.value_ & deviceID) === deviceID;
        };
        OutputDevice.prototype.getDevices = function () {
            var devices = {};
            for (var _i = 0, _b = Object.keys(OutputDevice.ID); _i < _b.length; _i++) {
                var deviceName = _b[_i];
                if (OutputDevice.ID[deviceName] > 0) {
                    devices[deviceName] = this.isEnabled(OutputDevice.ID[deviceName]);
                }
            }
            return devices;
        };
        OutputDevice.prototype.toJSON = function () {
            return {
                label: this.label,
                value: this.value,
                devices: this.getDevices(),
            };
        };
        OutputDevice.forLabel = function (label) {
            var deviceNames = label.match(/[\w\d]+/g) || [];
            var value = OutputDevice.ID.None;
            for (var _i = 0, deviceNames_1 = deviceNames; _i < deviceNames_1.length; _i++) {
                var deviceName = deviceNames_1[_i];
                if (deviceName in OutputDevice.ID) {
                    value |= OutputDevice.ID[deviceName];
                }
            }
            return new OutputDevice(value);
        };
        var _a;
        OutputDevice.ID = {
            None: 0,
            PC: 2,
            PCSmall: 8,
            TFT: 1,
        };
        return OutputDevice;
    }());

    var ShutterSpeed = (function () {
        function ShutterSpeed(value_) {
            this.value_ = value_;
            this[_a] = 'ShutterSpeed';
            var name = Object.keys(ShutterSpeed.ID).find(function (key) { return ShutterSpeed.ID[key] === value_; });
            if (name) {
                this.label_ = name;
                this.seconds_ = 0;
            }
            else if ("".concat(value_) in ShutterSpeed.OneThirdValues) {
                this.seconds_ = ShutterSpeed.OneThirdValues[value_] || 0;
                this.label_ =
                    ShutterSpeed.getLabelForSeconds(this.seconds_) + ' (1/3)';
            }
            else {
                this.seconds_ = ShutterSpeed.OneHalfValues[value_] || 0;
                this.label_ = ShutterSpeed.getLabelForSeconds(this.seconds_);
            }
        }
        ShutterSpeed.getLabelForSeconds = function (seconds) {
            var label = '';
            if (seconds > 0.2999) {
                label = seconds.toFixed(1).replace(/\.0+$/, '');
            }
            else if (seconds > 0.0) {
                label = "1/".concat(Math.round(1.0 / seconds));
            }
            return label;
        };
        Object.defineProperty(ShutterSpeed.prototype, "label", {
            get: function () {
                return this.label_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ShutterSpeed.prototype, "value", {
            get: function () {
                return this.value_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ShutterSpeed.prototype, "seconds", {
            get: function () {
                return this.seconds_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ShutterSpeed.prototype, "stop", {
            get: function () {
                return "".concat(this.value_) in ShutterSpeed.OneThirdValues ? '1/3' : '1/2';
            },
            enumerable: false,
            configurable: true
        });
        ShutterSpeed.prototype[(_a = Symbol.toStringTag, Symbol.toPrimitive)] = function (hint) {
            switch (hint) {
                case 'number':
                    return this.value_;
                case 'string':
                    return this.label_;
                default:
                    return null;
            }
        };
        ShutterSpeed.prototype.toJSON = function () {
            return {
                label: this.label,
                value: this.value,
                seconds: this.seconds,
                stop: this.stop,
            };
        };
        ShutterSpeed.findNearest = function (valueOrLabel, filter) {
            var seconds = 0;
            if (typeof valueOrLabel === 'string') {
                var speed = ShutterSpeed.forLabel(valueOrLabel);
                if (!speed) {
                    return null;
                }
                seconds = speed.seconds;
            }
            else {
                seconds = new ShutterSpeed(valueOrLabel).seconds;
            }
            var found = Object.keys(ShutterSpeed.AllValues).reduce(function (carry, key) {
                var current = ShutterSpeed.AllValues[key];
                var difference = Math.abs(current - seconds);
                if (!carry || difference < carry.difference) {
                    if (filter && !filter(new ShutterSpeed(+key))) {
                        return carry;
                    }
                    return {
                        value: +key,
                        difference: difference,
                    };
                }
                return carry;
            }, null);
            if (found) {
                return new ShutterSpeed(found.value);
            }
            return null;
        };
        ShutterSpeed.forLabel = function (label) {
            if (label in ShutterSpeed.ID) {
                return new ShutterSpeed(ShutterSpeed.ID[label]);
            }
            var match = label.match(/(\d+(?:\.\d+)?)(?:\s*\/\s*(\d+))?(?:\s+(.*))?/);
            if (match) {
                var isOneThird = (match[3] || '').indexOf('1/3') >= 0;
                var seconds_1 = parseFloat(match[1]) || 0.0;
                if (match[2]) {
                    seconds_1 /= parseFloat(match[2]);
                }
                var values_1 = isOneThird
                    ? ShutterSpeed.OneThirdValues
                    : ShutterSpeed.OneHalfValues;
                var value = Object.keys(values_1).find(function (straw) { return Math.abs(values_1[straw] - seconds_1) < 0.0000001; });
                return new ShutterSpeed(+(value || -1));
            }
            return null;
        };
        var _a;
        ShutterSpeed.ID = {
            Auto: 0,
            Bulb: 12,
            NotValid: 4294967295,
        };
        ShutterSpeed.OneHalfValues = {
            '16': 30,
            '19': 25,
            '20': 20,
            '24': 15,
            '27': 13,
            '28': 10,
            '32': 8,
            '36': 6,
            '37': 5,
            '40': 4,
            '43': 3.2,
            '44': 3,
            '45': 2.5,
            '48': 2,
            '51': 1.6,
            '52': 1.5,
            '53': 1.3,
            '56': 1,
            '59': 0.8,
            '60': 0.7,
            '61': 0.6,
            '64': 0.5,
            '67': 0.4,
            '68': 0.3,
            '72': 0.25,
            '75': 0.2,
            '76': 0.16666666666666666,
            '80': 0.125,
            '84': 0.1,
            '85': 0.07692307692307693,
            '88': 0.06666666666666667,
            '92': 0.05,
            '93': 0.04,
            '96': 0.03333333333333333,
            '99': 0.025,
            '100': 0.022222222222222223,
            '101': 0.02,
            '104': 0.016666666666666666,
            '107': 0.0125,
            '108': 0.011111111111111112,
            '109': 0.01,
            '112': 0.008,
            '115': 0.00625,
            '116': 0.005555555555555556,
            '117': 0.005,
            '120': 0.004,
            '123': 0.003125,
            '124': 0.002857142857142857,
            '125': 0.0025,
            '128': 0.002,
            '131': 0.0015625,
            '132': 0.0013333333333333333,
            '133': 0.00125,
            '136': 0.001,
            '139': 0.0008,
            '140': 0.0006666666666666666,
            '141': 0.000625,
            '144': 0.0005,
            '147': 0.0004,
            '148': 0.0003333333333333333,
            '149': 0.0003125,
            '152': 0.00025,
            '155': 0.0002,
            '156': 0.00016666666666666666,
            '157': 0.00015625,
            '160': 0.000125,
        };
        ShutterSpeed.OneThirdValues = {
            '21': 20,
            '29': 10,
            '35': 6,
            '69': 0.3,
            '77': 0.16666666666666666,
            '83': 0.1,
            '91': 0.05,
        };
        ShutterSpeed.AllValues = {
            '16': 30,
            '19': 25,
            '20': 20,
            '21': 20,
            '24': 15,
            '27': 13,
            '28': 10,
            '29': 10,
            '32': 8,
            '35': 6,
            '36': 6,
            '37': 5,
            '40': 4,
            '43': 3.2,
            '44': 3,
            '45': 2.5,
            '48': 2,
            '51': 1.6,
            '52': 1.5,
            '53': 1.3,
            '56': 1,
            '59': 0.8,
            '60': 0.7,
            '61': 0.6,
            '64': 0.5,
            '67': 0.4,
            '68': 0.3,
            '69': 0.3,
            '72': 0.25,
            '75': 0.2,
            '76': 0.16666666666666666,
            '77': 0.16666666666666666,
            '80': 0.125,
            '83': 0.1,
            '84': 0.1,
            '85': 0.07692307692307693,
            '88': 0.06666666666666667,
            '91': 0.05,
            '92': 0.05,
            '93': 0.04,
            '96': 0.03333333333333333,
            '99': 0.025,
            '100': 0.022222222222222223,
            '101': 0.02,
            '104': 0.016666666666666666,
            '107': 0.0125,
            '108': 0.011111111111111112,
            '109': 0.01,
            '112': 0.008,
            '115': 0.00625,
            '116': 0.005555555555555556,
            '117': 0.005,
            '120': 0.004,
            '123': 0.003125,
            '124': 0.002857142857142857,
            '125': 0.0025,
            '128': 0.002,
            '131': 0.0015625,
            '132': 0.0013333333333333333,
            '133': 0.00125,
            '136': 0.001,
            '139': 0.0008,
            '140': 0.0006666666666666666,
            '141': 0.000625,
            '144': 0.0005,
            '147': 0.0004,
            '148': 0.0003333333333333333,
            '149': 0.0003125,
            '152': 0.00025,
            '155': 0.0002,
            '156': 0.00016666666666666666,
            '157': 0.00015625,
            '160': 0.000125,
        };
        return ShutterSpeed;
    }());

    var __extends = (window && window.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var StateEvent = (function (_super) {
        __extends(StateEvent, _super);
        function StateEvent(identifier) {
            var _this = _super.call(this, identifier, StateEvent.ID) || this;
            _this[_a] = 'StateEvent';
            return _this;
        }
        StateEvent.prototype.equalTo = function (other) {
            return _super.prototype.equalTo.call(this, +other);
        };
        var _a;
        _a = Symbol.toStringTag;
        StateEvent.ID = {
            AfResult: 777,
            All: 768,
            BulbExposureTime: 784,
            CaptureError: 773,
            InternalError: 774,
            JobStatusChanged: 770,
            PowerZoomInfoChanged: 785,
            Shutdown: 769,
            ShutDownTimerUpdate: 772,
            WillSoonShutDown: 771,
        };
        return StateEvent;
    }(ApiIdentifier));

    var TimeZone = (function () {
        function TimeZone(value_) {
            this.value_ = value_;
            this[_a] = 'TimeZone';
            this.difference_ = 0;
            this.value_ = value_;
            this.zone_ = value_;
            this.label_ = TimeZone.Zones["".concat(value_)] || '';
        }
        Object.defineProperty(TimeZone.prototype, "label", {
            get: function () {
                return this.label_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TimeZone.prototype, "value", {
            get: function () {
                return this.value_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TimeZone.prototype, "zone", {
            get: function () {
                return this.zone_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TimeZone.prototype, "difference", {
            get: function () {
                return this.difference_;
            },
            enumerable: false,
            configurable: true
        });
        TimeZone.prototype[(_a = Symbol.toStringTag, Symbol.toPrimitive)] = function (hint) {
            switch (hint) {
                case 'number':
                    return this.value_;
                case 'string':
                    return this.label_;
                default:
                    return null;
            }
        };
        TimeZone.prototype.toJSON = function () {
            return {
                label: this.label,
                value: this.value,
                zone: this.zone,
                difference: this.difference,
            };
        };
        var _a;
        TimeZone.Zones = {
            '0': 'None',
            '1': 'Chatham Islands',
            '2': 'Wellington',
            '3': 'Solomon Island',
            '4': 'Sydney',
            '5': 'Adeladie',
            '6': 'Tokyo',
            '7': 'Hong Kong',
            '8': 'Bangkok',
            '9': 'Yangon',
            '10': 'Dacca',
            '11': 'Kathmandu',
            '12': 'Delhi',
            '13': 'Karachi',
            '14': 'Kabul',
            '15': 'Dubai',
            '16': 'Tehran',
            '17': 'Moscow',
            '18': 'Cairo',
            '19': 'Paris',
            '20': 'London',
            '21': 'Azores',
            '22': 'Fernando de Noronha',
            '23': 'São Paulo',
            '24': 'Newfoundland',
            '25': 'Santiago',
            '26': 'Caracas',
            '27': 'New York',
            '28': 'Chicago',
            '29': 'Denver',
            '30': 'Los Angeles',
            '31': 'Anchorage',
            '32': 'Honolulu',
            '33': 'Samoa',
            '34': 'Riyadh',
            '35': 'Manaus',
            '256': 'UTC',
            '65535': 'UTC',
        };
        return TimeZone;
    }());

    var Volume = (function () {
        function Volume() {
            this[_a] = 'Volume';
            throw new Error('Not implemented - stub only.');
        }
        Object.defineProperty(Volume.prototype, "label", {
            get: function () {
                throw new Error('Not implemented - stub only.');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Volume.prototype, "storageType", {
            get: function () {
                throw new Error('Not implemented - stub only.');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Volume.prototype, "isReadable", {
            get: function () {
                throw new Error('Not implemented - stub only.');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Volume.prototype, "isWritable", {
            get: function () {
                throw new Error('Not implemented - stub only.');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Volume.prototype, "freeCapacity", {
            get: function () {
                throw new Error('Not implemented - stub only.');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Volume.prototype, "maximumCapacity", {
            get: function () {
                throw new Error('Not implemented - stub only.');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Volume.prototype, "length", {
            get: function () {
                throw new Error('Not implemented - stub only.');
            },
            enumerable: false,
            configurable: true
        });
        Volume.prototype.getEntries = function () {
            throw new Error('Not implemented - stub only.');
        };
        Volume.prototype[(_a = Symbol.toStringTag, Symbol.iterator)] = function () {
            throw new Error('Not implemented - stub only.');
        };
        var _a;
        Volume.StorageType = {
            CFast: 5,
            CompactFlash: 1,
            HardDrive: 4,
            NoMemoryCard: 0,
            SDCard: 2,
        };
        return Volume;
    }());

    var watchCameras = function (timeout) {
        throw new Error('Not implemented - stub only.');
    };
    var cameraBrowser = new CameraBrowser();

    exports.Aperture = Aperture;
    exports.ApiError = ApiError;
    exports.Camera = Camera;
    exports.CameraBrowser = CameraBrowser;
    exports.CameraFile = CameraFile;
    exports.CameraProperty = CameraProperty;
    exports.Directory = Directory;
    exports.ExposureCompensation = ExposureCompensation;
    exports.FileFormat = FileFormat;
    exports.Flag = Flag;
    exports.ISOSensitivity = ISOSensitivity;
    exports.ImageQuality = ImageQuality;
    exports.ObjectEvent = ObjectEvent;
    exports.Option = Option;
    exports.OutputDevice = OutputDevice;
    exports.ShutterSpeed = ShutterSpeed;
    exports.StateEvent = StateEvent;
    exports.TimeZone = TimeZone;
    exports.Volume = Volume;
    exports.cameraBrowser = cameraBrowser;
    exports.watchCameras = watchCameras;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFwaS1jYW5vbi1jYW1lcmFzLXN0dWJzLmpzIiwic291cmNlcyI6WyIuLi9lc20vY2FtZXJhLWFwaS9BcGVydHVyZS5qcyIsIi4uL2VzbS9jYW1lcmEtYXBpL0FwaUlkZW50aWZpZXIuanMiLCIuLi9lc20vY2FtZXJhLWFwaS9BcGlFcnJvci5qcyIsIi4uL2VzbS9jYW1lcmEtYXBpL0NhbWVyYS5qcyIsIi4uL2VzbS9jYW1lcmEtYXBpL0NhbWVyYUJyb3dzZXIuanMiLCIuLi9lc20vY2FtZXJhLWFwaS9DYW1lcmFGaWxlLmpzIiwiLi4vZXNtL2NhbWVyYS1hcGkvQ2FtZXJhUHJvcGVydHkuanMiLCIuLi9lc20vY2FtZXJhLWFwaS9EaXJlY3RvcnkuanMiLCIuLi9lc20vY2FtZXJhLWFwaS9FeHBvc3VyZUNvbXBlbnNhdGlvbi5qcyIsIi4uL2VzbS9jYW1lcmEtYXBpL0ZpbGVGb3JtYXQuanMiLCIuLi9lc20vY2FtZXJhLWFwaS9GbGFnLmpzIiwiLi4vZXNtL2NhbWVyYS1hcGkvSW1hZ2VRdWFsaXR5LmpzIiwiLi4vZXNtL2NhbWVyYS1hcGkvSVNPU2Vuc2l0aXZpdHkuanMiLCIuLi9lc20vY2FtZXJhLWFwaS9PYmplY3RFdmVudC5qcyIsIi4uL2VzbS9jYW1lcmEtYXBpL09wdGlvbi5qcyIsIi4uL2VzbS9jYW1lcmEtYXBpL091dHB1dERldmljZS5qcyIsIi4uL2VzbS9jYW1lcmEtYXBpL1NodXR0ZXJTcGVlZC5qcyIsIi4uL2VzbS9jYW1lcmEtYXBpL1N0YXRlRXZlbnQuanMiLCIuLi9lc20vY2FtZXJhLWFwaS9UaW1lWm9uZS5qcyIsIi4uL2VzbS9jYW1lcmEtYXBpL1ZvbHVtZS5qcyIsIi4uL2VzbS9jYW1lcmEtYXBpL0NhbWVyYUFwaS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQXBlcnR1cmUgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQXBlcnR1cmUodmFsdWVfKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZV8gPSB2YWx1ZV87XHJcbiAgICAgICAgdGhpc1tfYV0gPSAnQXBlcnR1cmUnO1xyXG4gICAgICAgIHZhciBuYW1lID0gT2JqZWN0LmtleXMoQXBlcnR1cmUuSUQpLmZpbmQoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gQXBlcnR1cmUuSURba2V5XSA9PT0gdmFsdWVfOyB9KTtcclxuICAgICAgICB2YXIgZm9ybWF0QXBlcnR1cmUgPSBmdW5jdGlvbiAoYXBlcnR1cmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdmJyArIGFwZXJ0dXJlLnRvRml4ZWQoMSkucmVwbGFjZSgvXFwuMCQvLCAnJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAobmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsXyA9IG5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMuYXBlcnR1cmVfID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoXCJcIi5jb25jYXQodmFsdWVfKSBpbiBBcGVydHVyZS5PbmVUaGlyZFZhbHVlcykge1xyXG4gICAgICAgICAgICB0aGlzLmFwZXJ0dXJlXyA9IEFwZXJ0dXJlLk9uZVRoaXJkVmFsdWVzW3ZhbHVlX10gfHwgMDtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbF8gPSBmb3JtYXRBcGVydHVyZSh0aGlzLmFwZXJ0dXJlXykgKyAnICgxLzMpJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBlcnR1cmVfID0gQXBlcnR1cmUuT25lSGFsZlZhbHVlc1t2YWx1ZV9dIHx8IDA7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfID0gZm9ybWF0QXBlcnR1cmUodGhpcy5hcGVydHVyZV8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcGVydHVyZS5wcm90b3R5cGUsIFwibGFiZWxcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYWJlbF87XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFwZXJ0dXJlLnByb3RvdHlwZSwgXCJ2YWx1ZVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlXztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXBlcnR1cmUucHJvdG90eXBlLCBcImFwZXJ0dXJlXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBlcnR1cmVfO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcGVydHVyZS5wcm90b3R5cGUsIFwic3RvcFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiLmNvbmNhdCh0aGlzLnZhbHVlXykgaW4gQXBlcnR1cmUuT25lVGhpcmRWYWx1ZXMgPyAnMS8zJyA6ICcxLzInO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIEFwZXJ0dXJlLnByb3RvdHlwZVsoX2EgPSBTeW1ib2wudG9TdHJpbmdUYWcsIFN5bWJvbC50b1ByaW1pdGl2ZSldID0gZnVuY3Rpb24gKGhpbnQpIHtcclxuICAgICAgICBzd2l0Y2ggKGhpbnQpIHtcclxuICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlXztcclxuICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxhYmVsXztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBBcGVydHVyZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGxhYmVsOiB0aGlzLmxhYmVsLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcclxuICAgICAgICAgICAgYXBlcnR1cmU6IHRoaXMuYXBlcnR1cmUsXHJcbiAgICAgICAgICAgIHN0b3A6IHRoaXMuc3RvcCxcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIEFwZXJ0dXJlLmZpbmROZWFyZXN0ID0gZnVuY3Rpb24gKHZhbHVlT3JMYWJlbCwgZmlsdGVyKSB7XHJcbiAgICAgICAgdmFyIGFwZXJ0dXJlO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWVPckxhYmVsID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB2YXIgYSA9IEFwZXJ0dXJlLmZvckxhYmVsKHZhbHVlT3JMYWJlbCk7XHJcbiAgICAgICAgICAgIGlmICghYSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXBlcnR1cmUgPSBhLmFwZXJ0dXJlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYXBlcnR1cmUgPSBuZXcgQXBlcnR1cmUodmFsdWVPckxhYmVsKS5hcGVydHVyZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZvdW5kID0gT2JqZWN0LmtleXMoQXBlcnR1cmUuQWxsVmFsdWVzKS5yZWR1Y2UoZnVuY3Rpb24gKGNhcnJ5LCBrZXkpIHtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSBBcGVydHVyZS5BbGxWYWx1ZXNba2V5XTtcclxuICAgICAgICAgICAgdmFyIGRpZmZlcmVuY2UgPSBNYXRoLmFicyhjdXJyZW50IC0gYXBlcnR1cmUpO1xyXG4gICAgICAgICAgICBpZiAoIWNhcnJ5IHx8IGRpZmZlcmVuY2UgPCBjYXJyeS5kaWZmZXJlbmNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyICYmICFmaWx0ZXIobmV3IEFwZXJ0dXJlKCtrZXkpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXJyeTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICtrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgZGlmZmVyZW5jZTogZGlmZmVyZW5jZSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGNhcnJ5O1xyXG4gICAgICAgIH0sIG51bGwpO1xyXG4gICAgICAgIGlmIChmb3VuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEFwZXJ0dXJlKGZvdW5kLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG4gICAgQXBlcnR1cmUuZm9yTGFiZWwgPSBmdW5jdGlvbiAobGFiZWwpIHtcclxuICAgICAgICBpZiAobGFiZWwgaW4gQXBlcnR1cmUuSUQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcGVydHVyZShBcGVydHVyZS5JRFtsYWJlbF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbWF0Y2ggPSBsYWJlbC5tYXRjaCgvZj8oXFxkKyg/OlxcLlxcZCspPylcXHMqKC4qKS8pO1xyXG4gICAgICAgIGlmIChtYXRjaCkge1xyXG4gICAgICAgICAgICB2YXIgYXBlcnR1cmVfMSA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pIHx8IDAuMDtcclxuICAgICAgICAgICAgdmFyIGlzT25lVGhpcmQgPSBtYXRjaFsyXS5pbmRleE9mKCcxLzMnKSA+PSAwO1xyXG4gICAgICAgICAgICB2YXIgdmFsdWVzXzEgPSBpc09uZVRoaXJkXHJcbiAgICAgICAgICAgICAgICA/IEFwZXJ0dXJlLk9uZVRoaXJkVmFsdWVzXHJcbiAgICAgICAgICAgICAgICA6IEFwZXJ0dXJlLk9uZUhhbGZWYWx1ZXM7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IE9iamVjdC5rZXlzKHZhbHVlc18xKS5maW5kKGZ1bmN0aW9uIChzdHJhdykgeyByZXR1cm4gTWF0aC5hYnModmFsdWVzXzFbc3RyYXddIC0gYXBlcnR1cmVfMSkgPCAwLjAwMDAxOyB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcGVydHVyZSgrKHZhbHVlIHx8IC0xKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfTtcclxuICAgIHZhciBfYTtcclxuICAgIEFwZXJ0dXJlLklEID0ge1xyXG4gICAgICAgIEF1dG86IDAsXHJcbiAgICAgICAgTm90VmFsaWQ6IDQyOTQ5NjcyOTUsXHJcbiAgICB9O1xyXG4gICAgQXBlcnR1cmUuT25lSGFsZlZhbHVlcyA9IHtcclxuICAgICAgICAnOCc6IDEsXHJcbiAgICAgICAgJzExJzogMS4xLFxyXG4gICAgICAgICcxMic6IDEuMixcclxuICAgICAgICAnMTYnOiAxLjQsXHJcbiAgICAgICAgJzE5JzogMS42LFxyXG4gICAgICAgICcyMCc6IDEuOCxcclxuICAgICAgICAnMjQnOiAyLFxyXG4gICAgICAgICcyNyc6IDIuMixcclxuICAgICAgICAnMjgnOiAyLjUsXHJcbiAgICAgICAgJzMyJzogMi44LFxyXG4gICAgICAgICczNSc6IDMuMixcclxuICAgICAgICAnMzYnOiAzLjUsXHJcbiAgICAgICAgJzQwJzogNCxcclxuICAgICAgICAnNDMnOiA0LjUsXHJcbiAgICAgICAgJzQ0JzogNC41LFxyXG4gICAgICAgICc0NSc6IDUsXHJcbiAgICAgICAgJzQ4JzogNS42LFxyXG4gICAgICAgICc1MSc6IDYuMyxcclxuICAgICAgICAnNTInOiA2LjcsXHJcbiAgICAgICAgJzUzJzogNy4xLFxyXG4gICAgICAgICc1Nic6IDgsXHJcbiAgICAgICAgJzU5JzogOSxcclxuICAgICAgICAnNjAnOiA5LjUsXHJcbiAgICAgICAgJzYxJzogMTAsXHJcbiAgICAgICAgJzY0JzogMTEsXHJcbiAgICAgICAgJzY4JzogMTMsXHJcbiAgICAgICAgJzY5JzogMTQsXHJcbiAgICAgICAgJzcyJzogMTYsXHJcbiAgICAgICAgJzc1JzogMTgsXHJcbiAgICAgICAgJzc2JzogMTksXHJcbiAgICAgICAgJzc3JzogMjAsXHJcbiAgICAgICAgJzgwJzogMjIsXHJcbiAgICAgICAgJzgzJzogMjUsXHJcbiAgICAgICAgJzg0JzogMjcsXHJcbiAgICAgICAgJzg1JzogMjksXHJcbiAgICAgICAgJzg4JzogMzIsXHJcbiAgICAgICAgJzkxJzogMzYsXHJcbiAgICAgICAgJzkyJzogMzgsXHJcbiAgICAgICAgJzkzJzogNDAsXHJcbiAgICAgICAgJzk2JzogNDUsXHJcbiAgICAgICAgJzk5JzogNTEsXHJcbiAgICAgICAgJzEwMCc6IDU0LFxyXG4gICAgICAgICcxMDEnOiA1NyxcclxuICAgICAgICAnMTA0JzogNjQsXHJcbiAgICAgICAgJzEwNyc6IDcyLFxyXG4gICAgICAgICcxMDgnOiA3NixcclxuICAgICAgICAnMTA5JzogODAsXHJcbiAgICAgICAgJzExMic6IDkxLFxyXG4gICAgICAgICcxMzMnOiAzLjQsXHJcbiAgICB9O1xyXG4gICAgQXBlcnR1cmUuT25lVGhpcmRWYWx1ZXMgPSB7XHJcbiAgICAgICAgJzEzJzogMS4yLFxyXG4gICAgICAgICcyMSc6IDEuOCxcclxuICAgICAgICAnMjknOiAyLjUsXHJcbiAgICAgICAgJzM3JzogMy41LFxyXG4gICAgICAgICc2Nyc6IDEzLFxyXG4gICAgfTtcclxuICAgIEFwZXJ0dXJlLkFsbFZhbHVlcyA9IHtcclxuICAgICAgICAnOCc6IDEsXHJcbiAgICAgICAgJzExJzogMS4xLFxyXG4gICAgICAgICcxMic6IDEuMixcclxuICAgICAgICAnMTMnOiAxLjIsXHJcbiAgICAgICAgJzE2JzogMS40LFxyXG4gICAgICAgICcxOSc6IDEuNixcclxuICAgICAgICAnMjAnOiAxLjgsXHJcbiAgICAgICAgJzIxJzogMS44LFxyXG4gICAgICAgICcyNCc6IDIsXHJcbiAgICAgICAgJzI3JzogMi4yLFxyXG4gICAgICAgICcyOCc6IDIuNSxcclxuICAgICAgICAnMjknOiAyLjUsXHJcbiAgICAgICAgJzMyJzogMi44LFxyXG4gICAgICAgICczNSc6IDMuMixcclxuICAgICAgICAnMzYnOiAzLjUsXHJcbiAgICAgICAgJzM3JzogMy41LFxyXG4gICAgICAgICc0MCc6IDQsXHJcbiAgICAgICAgJzQzJzogNC41LFxyXG4gICAgICAgICc0NCc6IDQuNSxcclxuICAgICAgICAnNDUnOiA1LFxyXG4gICAgICAgICc0OCc6IDUuNixcclxuICAgICAgICAnNTEnOiA2LjMsXHJcbiAgICAgICAgJzUyJzogNi43LFxyXG4gICAgICAgICc1Myc6IDcuMSxcclxuICAgICAgICAnNTYnOiA4LFxyXG4gICAgICAgICc1OSc6IDksXHJcbiAgICAgICAgJzYwJzogOS41LFxyXG4gICAgICAgICc2MSc6IDEwLFxyXG4gICAgICAgICc2NCc6IDExLFxyXG4gICAgICAgICc2Nyc6IDEzLFxyXG4gICAgICAgICc2OCc6IDEzLFxyXG4gICAgICAgICc2OSc6IDE0LFxyXG4gICAgICAgICc3Mic6IDE2LFxyXG4gICAgICAgICc3NSc6IDE4LFxyXG4gICAgICAgICc3Nic6IDE5LFxyXG4gICAgICAgICc3Nyc6IDIwLFxyXG4gICAgICAgICc4MCc6IDIyLFxyXG4gICAgICAgICc4Myc6IDI1LFxyXG4gICAgICAgICc4NCc6IDI3LFxyXG4gICAgICAgICc4NSc6IDI5LFxyXG4gICAgICAgICc4OCc6IDMyLFxyXG4gICAgICAgICc5MSc6IDM2LFxyXG4gICAgICAgICc5Mic6IDM4LFxyXG4gICAgICAgICc5Myc6IDQwLFxyXG4gICAgICAgICc5Nic6IDQ1LFxyXG4gICAgICAgICc5OSc6IDUxLFxyXG4gICAgICAgICcxMDAnOiA1NCxcclxuICAgICAgICAnMTAxJzogNTcsXHJcbiAgICAgICAgJzEwNCc6IDY0LFxyXG4gICAgICAgICcxMDcnOiA3MixcclxuICAgICAgICAnMTA4JzogNzYsXHJcbiAgICAgICAgJzEwOSc6IDgwLFxyXG4gICAgICAgICcxMTInOiA5MSxcclxuICAgICAgICAnMTMzJzogMy40LFxyXG4gICAgfTtcclxuICAgIHJldHVybiBBcGVydHVyZTtcclxufSgpKTtcclxuZXhwb3J0IHsgQXBlcnR1cmUgfTtcclxuIiwidmFyIF9hO1xyXG52YXIgQXBpSWRlbnRpZmllciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBBcGlJZGVudGlmaWVyKGlkZW50aWZpZXJfLCBsYWJlbHMpIHtcclxuICAgICAgICB0aGlzLmlkZW50aWZpZXJfID0gaWRlbnRpZmllcl87XHJcbiAgICAgICAgdGhpcy5sYWJlbHMgPSBsYWJlbHM7XHJcbiAgICAgICAgdGhpc1tfYV0gPSAnQXBpSWRlbnRpZmllcic7XHJcbiAgICAgICAgdGhpcy5sYWJlbF8gPVxyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhsYWJlbHMpLmZpbmQoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gbGFiZWxzW2tleV0gPT09IGlkZW50aWZpZXJfOyB9KSB8fFxyXG4gICAgICAgICAgICAgICAgXCIweFwiLmNvbmNhdCh0aGlzLmlkZW50aWZpZXJfLnRvU3RyaW5nKDE2KS5wYWRTdGFydCg4LCAnMCcpKTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcGlJZGVudGlmaWVyLnByb3RvdHlwZSwgXCJsYWJlbFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhYmVsXztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXBpSWRlbnRpZmllci5wcm90b3R5cGUsIFwiaWRlbnRpZmllclwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlkZW50aWZpZXJfO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIEFwaUlkZW50aWZpZXIucHJvdG90eXBlWyhfYSA9IFN5bWJvbC50b1N0cmluZ1RhZywgU3ltYm9sLnRvUHJpbWl0aXZlKV0gPSBmdW5jdGlvbiAoaGludCkge1xyXG4gICAgICAgIHN3aXRjaCAoaGludCkge1xyXG4gICAgICAgICAgICBjYXNlICdudW1iZXInOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaWRlbnRpZmllcl87XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCIweFwiLmNvbmNhdCh0aGlzLmlkZW50aWZpZXJfLnRvU3RyaW5nKDE2KS5wYWRTdGFydCg4LCAnMCcpKTtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBBcGlJZGVudGlmaWVyLnByb3RvdHlwZS5lcXVhbFRvID0gZnVuY3Rpb24gKG90aGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaWRlbnRpZmllcl8gPT09ICtvdGhlcjtcclxuICAgIH07XHJcbiAgICBBcGlJZGVudGlmaWVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaWRlbnRpZmllcjogdGhpcy5pZGVudGlmaWVyXyxcclxuICAgICAgICAgICAgbGFiZWw6IHRoaXMubGFiZWxfLFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEFwaUlkZW50aWZpZXI7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IEFwaUlkZW50aWZpZXIgfTtcclxuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbmltcG9ydCB7IEFwaUlkZW50aWZpZXIgfSBmcm9tICcuL0FwaUlkZW50aWZpZXInO1xyXG52YXIgQXBpRXJyb3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKEFwaUVycm9yLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gQXBpRXJyb3IoaWRlbnRpZmllcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGlkZW50aWZpZXIsIEFwaUVycm9yLkNvZGUpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXNbX2FdID0gJ0FwaUVycm9yJztcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBBcGlFcnJvci5wcm90b3R5cGUuZXF1YWxUbyA9IGZ1bmN0aW9uIChvdGhlcikge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLmVxdWFsVG8uY2FsbCh0aGlzLCArb3RoZXIpO1xyXG4gICAgfTtcclxuICAgIHZhciBfYTtcclxuICAgIF9hID0gU3ltYm9sLnRvU3RyaW5nVGFnO1xyXG4gICAgQXBpRXJyb3IuQ29kZSA9IHtcclxuICAgICAgICBDQU5OT1RfTUFLRV9PQkpFQ1Q6IDQxMjIwLFxyXG4gICAgICAgIENBUFRVUkVfQUxSRUFEWV9URVJNSU5BVEVEOiA4MjE2LFxyXG4gICAgICAgIENPTU1fQlVGRkVSX0ZVTEw6IDE5NSxcclxuICAgICAgICBDT01NX0RFVklDRV9JTkNPTVBBVElCTEU6IDE5NCxcclxuICAgICAgICBDT01NX0RJU0NPTk5FQ1RFRDogMTkzLFxyXG4gICAgICAgIENPTU1fUE9SVF9JU19JTl9VU0U6IDE5MixcclxuICAgICAgICBDT01NX1VTQl9CVVNfRVJSOiAxOTYsXHJcbiAgICAgICAgREVWSUNFX0JVU1k6IDEyOSxcclxuICAgICAgICBERVZJQ0VfQ0ZfR0FURV9DSEFOR0VEOiAxMzcsXHJcbiAgICAgICAgREVWSUNFX0RJQUxfQ0hBTkdFRDogMTM4LFxyXG4gICAgICAgIERFVklDRV9ESVNLX0VSUk9SOiAxMzYsXHJcbiAgICAgICAgREVWSUNFX0VNRVJHRU5DWTogMTMxLFxyXG4gICAgICAgIERFVklDRV9JTlRFUk5BTF9FUlJPUjogMTMzLFxyXG4gICAgICAgIERFVklDRV9JTlZBTElEOiAxMzAsXHJcbiAgICAgICAgREVWSUNFX0lOVkFMSURfUEFSQU1FVEVSOiAxMzQsXHJcbiAgICAgICAgREVWSUNFX01FTU9SWV9GVUxMOiAxMzIsXHJcbiAgICAgICAgREVWSUNFX05PX0RJU0s6IDEzNSxcclxuICAgICAgICBERVZJQ0VfTk9UX0ZPVU5EOiAxMjgsXHJcbiAgICAgICAgREVWSUNFX05PVF9JTlNUQUxMRUQ6IDEzOSxcclxuICAgICAgICBERVZJQ0VfTk9UX0xBVU5DSEVEOiAyMjgsXHJcbiAgICAgICAgREVWSUNFX05PVF9SRUxFQVNFRDogMTQxLFxyXG4gICAgICAgIERFVklDRV9TVEFZX0FXQUtFOiAxNDAsXHJcbiAgICAgICAgREVWSUNFUFJPUF9OT1RfU1VQUE9SVEVEOiA4MjAyLFxyXG4gICAgICAgIERJUl9FTlRSWV9FWElTVFM6IDY3LFxyXG4gICAgICAgIERJUl9FTlRSWV9OT1RfRk9VTkQ6IDY2LFxyXG4gICAgICAgIERJUl9JT19FUlJPUjogNjUsXHJcbiAgICAgICAgRElSX05PVF9FTVBUWTogNjgsXHJcbiAgICAgICAgRElSX05PVF9GT1VORDogNjQsXHJcbiAgICAgICAgRU5VTV9OQTogMjQwLFxyXG4gICAgICAgIEZJTEVfQUxSRUFEWV9FWElTVFM6IDQzLFxyXG4gICAgICAgIEZJTEVfQ0xPU0VfRVJST1I6IDM2LFxyXG4gICAgICAgIEZJTEVfREFUQV9DT1JSVVBUOiA0NSxcclxuICAgICAgICBGSUxFX0RJU0tfRlVMTF9FUlJPUjogNDIsXHJcbiAgICAgICAgRklMRV9GT1JNQVRfVU5SRUNPR05JWkVEOiA0NCxcclxuICAgICAgICBGSUxFX0lPX0VSUk9SOiAzMixcclxuICAgICAgICBGSUxFX05BTUlOR19OQTogNDYsXHJcbiAgICAgICAgRklMRV9OT1RfRk9VTkQ6IDM0LFxyXG4gICAgICAgIEZJTEVfT1BFTl9FUlJPUjogMzUsXHJcbiAgICAgICAgRklMRV9QRVJNSVNTSU9OX0VSUk9SOiA0MSxcclxuICAgICAgICBGSUxFX1JFQURfRVJST1I6IDM5LFxyXG4gICAgICAgIEZJTEVfU0VFS19FUlJPUjogMzcsXHJcbiAgICAgICAgRklMRV9URUxMX0VSUk9SOiAzOCxcclxuICAgICAgICBGSUxFX1RPT19NQU5ZX09QRU46IDMzLFxyXG4gICAgICAgIEZJTEVfV1JJVEVfRVJST1I6IDQwLFxyXG4gICAgICAgIEhBTkRMRV9OT1RfRk9VTkQ6IDI0MixcclxuICAgICAgICBJTkNPTVBBVElCTEVfVkVSU0lPTjogNixcclxuICAgICAgICBJTkNPTVBMRVRFX1RSQU5TRkVSOiA4MTk5LFxyXG4gICAgICAgIElOVEVSTkFMX0VSUk9SOiAyLFxyXG4gICAgICAgIElOVkFMSURfQ09ERV9GT1JNQVQ6IDgyMTQsXHJcbiAgICAgICAgSU5WQUxJRF9ERVZJQ0VQUk9QX0ZPUk1BVDogODIxOSxcclxuICAgICAgICBJTlZBTElEX0RFVklDRVBST1BfVkFMVUU6IDgyMjAsXHJcbiAgICAgICAgSU5WQUxJRF9GTl9DQUxMOiAyNDEsXHJcbiAgICAgICAgSU5WQUxJRF9GTl9QT0lOVEVSOiAxMDEsXHJcbiAgICAgICAgSU5WQUxJRF9IQU5ETEU6IDk3LFxyXG4gICAgICAgIElOVkFMSURfSUQ6IDI0MyxcclxuICAgICAgICBJTlZBTElEX0lOREVYOiA5OSxcclxuICAgICAgICBJTlZBTElEX0xFTkdUSDogMTAwLFxyXG4gICAgICAgIElOVkFMSURfT0JKRUNURk9STUFUQ09ERTogODIwMyxcclxuICAgICAgICBJTlZBTElEX1BBUkFNRVRFUjogOTYsXHJcbiAgICAgICAgSU5WQUxJRF9QQVJFTlRPQkpFQ1Q6IDgyMTgsXHJcbiAgICAgICAgSU5WQUxJRF9QT0lOVEVSOiA5OCxcclxuICAgICAgICBJTlZBTElEX1NPUlRfRk46IDEwMixcclxuICAgICAgICBJTlZBTElEX1NUUkFHRUlEOiA4MjAwLFxyXG4gICAgICAgIElOVkFMSURfVFJBTlNBQ1RJT05JRDogODE5NixcclxuICAgICAgICBMRU5TX0NPVkVSX0NMT1NFOiA0MDk2NixcclxuICAgICAgICBMT1dfQkFUVEVSWTogNDEyMTcsXHJcbiAgICAgICAgTUVNX0FMTE9DX0ZBSUxFRDogMyxcclxuICAgICAgICBNRU1fRlJFRV9GQUlMRUQ6IDQsXHJcbiAgICAgICAgTUVNT1JZU1RBVFVTX05PVFJFQURZOiA0MTIyMixcclxuICAgICAgICBNSVNTSU5HX1NVQkNPTVBPTkVOVDogMTAsXHJcbiAgICAgICAgTk9fVkFMSURfT0JKRUNUSU5GTzogODIxMyxcclxuICAgICAgICBOT1RfQ0FNRVJBX1NVUFBPUlRfU0RLX1ZFUlNJT046IDgyMjUsXHJcbiAgICAgICAgTk9UX1NVUFBPUlRFRDogNyxcclxuICAgICAgICBPQkpFQ1RfTk9UUkVBRFk6IDQxMjE4LFxyXG4gICAgICAgIE9QRVJBVElPTl9DQU5DRUxMRUQ6IDUsXHJcbiAgICAgICAgT1BFUkFUSU9OX1JFRlVTRUQ6IDQwOTY1LFxyXG4gICAgICAgIFBBUlRJQUxfREVMRVRJT046IDgyMTAsXHJcbiAgICAgICAgUFJPUEVSVElFU19NSVNNQVRDSDogODEsXHJcbiAgICAgICAgUFJPUEVSVElFU19OT1RfTE9BREVEOiA4MyxcclxuICAgICAgICBQUk9QRVJUSUVTX1VOQVZBSUxBQkxFOiA4MCxcclxuICAgICAgICBQUk9URUNUSU9OX1ZJT0xBVElPTjogOSxcclxuICAgICAgICBQVFBfREVWSUNFX0JVU1k6IDgyMTcsXHJcbiAgICAgICAgU0VMRUNUSU9OX1VOQVZBSUxBQkxFOiAxMSxcclxuICAgICAgICBTRUxGX1RFU1RfRkFJTEVEOiA4MjA5LFxyXG4gICAgICAgIFNFU1NJT05fQUxSRUFEWV9PUEVOOiA4MjIyLFxyXG4gICAgICAgIFNFU1NJT05fTk9UX09QRU46IDgxOTUsXHJcbiAgICAgICAgU1BFQ0lGSUNBVElPTl9CWV9GT1JNQVRfVU5TVVBQT1JURUQ6IDgyMTIsXHJcbiAgICAgICAgU1BFQ0lGSUNBVElPTl9PRl9ERVNUSU5BVElPTl9VTlNVUFBPUlRFRDogODIyNCxcclxuICAgICAgICBTVElfREVWSUNFX0NSRUFURV9FUlJPUjogMjI2LFxyXG4gICAgICAgIFNUSV9ERVZJQ0VfUkVMRUFTRV9FUlJPUjogMjI3LFxyXG4gICAgICAgIFNUSV9JTlRFUk5BTF9FUlJPUjogMjI1LFxyXG4gICAgICAgIFNUSV9VTktOT1dOX0VSUk9SOiAyMjQsXHJcbiAgICAgICAgU1RSRUFNX0FMUkVBRFlfT1BFTjogMTYyLFxyXG4gICAgICAgIFNUUkVBTV9CQURfT1BUSU9OUzogMTcxLFxyXG4gICAgICAgIFNUUkVBTV9DTE9TRV9FUlJPUjogMTY0LFxyXG4gICAgICAgIFNUUkVBTV9DT1VMRE5UX0JFR0lOX1RIUkVBRDogMTcwLFxyXG4gICAgICAgIFNUUkVBTV9FTkRfT0ZfU1RSRUFNOiAxNzIsXHJcbiAgICAgICAgU1RSRUFNX0lPX0VSUk9SOiAxNjAsXHJcbiAgICAgICAgU1RSRUFNX05PVF9PUEVOOiAxNjEsXHJcbiAgICAgICAgU1RSRUFNX09QRU5fRVJST1I6IDE2MyxcclxuICAgICAgICBTVFJFQU1fUEVSTUlTU0lPTl9FUlJPUjogMTY5LFxyXG4gICAgICAgIFNUUkVBTV9SRUFEX0VSUk9SOiAxNjcsXHJcbiAgICAgICAgU1RSRUFNX1NFRUtfRVJST1I6IDE2NSxcclxuICAgICAgICBTVFJFQU1fVEVMTF9FUlJPUjogMTY2LFxyXG4gICAgICAgIFNUUkVBTV9XUklURV9FUlJPUjogMTY4LFxyXG4gICAgICAgIFRBS0VfUElDVFVSRV9BRl9ORzogMzYwOTcsXHJcbiAgICAgICAgVEFLRV9QSUNUVVJFX0NBUkRfTkc6IDM2MTAzLFxyXG4gICAgICAgIFRBS0VfUElDVFVSRV9DQVJEX1BST1RFQ1RfTkc6IDM2MTA0LFxyXG4gICAgICAgIFRBS0VfUElDVFVSRV9MVl9SRUxfUFJPSElCSVRfTU9ERV9ORzogMzYxMDksXHJcbiAgICAgICAgVEFLRV9QSUNUVVJFX01JUlJPUl9VUF9ORzogMzYwOTksXHJcbiAgICAgICAgVEFLRV9QSUNUVVJFX01PVklFX0NST1BfTkc6IDM2MTA1LFxyXG4gICAgICAgIFRBS0VfUElDVFVSRV9OT19DQVJEX05HOiAzNjEwMixcclxuICAgICAgICBUQUtFX1BJQ1RVUkVfTk9fTEVOU19ORzogMzYxMDcsXHJcbiAgICAgICAgVEFLRV9QSUNUVVJFX1JFU0VSVkVEOiAzNjA5OCxcclxuICAgICAgICBUQUtFX1BJQ1RVUkVfU0VOU09SX0NMRUFOSU5HX05HOiAzNjEwMCxcclxuICAgICAgICBUQUtFX1BJQ1RVUkVfU0lMRU5DRV9ORzogMzYxMDEsXHJcbiAgICAgICAgVEFLRV9QSUNUVVJFX1NQRUNJQUxfTU9WSUVfTU9ERV9ORzogMzYxMDgsXHJcbiAgICAgICAgVEFLRV9QSUNUVVJFX1NUUk9CT19DSEFSR0VfTkc6IDM2MTA2LFxyXG4gICAgICAgIFRSQU5TQUNUSU9OX0NBTkNFTExFRDogODIyMyxcclxuICAgICAgICBVTkVYUEVDVEVEX0VYQ0VQVElPTjogOCxcclxuICAgICAgICBVTklNUExFTUVOVEVEOiAxLFxyXG4gICAgICAgIFVOS05PV05fQ09NTUFORDogNDA5NjEsXHJcbiAgICAgICAgVU5LTk9XTl9WRU5ET1JfQ09ERTogODIxNSxcclxuICAgICAgICBVU0JfREVWSUNFX0xPQ0tfRVJST1I6IDIwOCxcclxuICAgICAgICBVU0JfREVWSUNFX1VOTE9DS19FUlJPUjogMjA5LFxyXG4gICAgICAgIFdBSVRfVElNRU9VVF9FUlJPUjogMjQ0LFxyXG4gICAgfTtcclxuICAgIHJldHVybiBBcGlFcnJvcjtcclxufShBcGlJZGVudGlmaWVyKSk7XHJcbmV4cG9ydCB7IEFwaUVycm9yIH07XHJcbiIsInZhciBDYW1lcmEgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQ2FtZXJhKGluZGV4T3JQb3J0KSB7XHJcbiAgICAgICAgaWYgKGluZGV4T3JQb3J0ID09PSB2b2lkIDApIHsgaW5kZXhPclBvcnQgPSAwOyB9XHJcbiAgICAgICAgdGhpc1tfYV0gPSAnQ2FtZXJhJztcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCAtIHN0dWIgb25seS4nKTtcclxuICAgIH1cclxuICAgIENhbWVyYS5wcm90b3R5cGUuc2V0RXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQgLSBzdHViIG9ubHkuJyk7XHJcbiAgICB9O1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENhbWVyYS5wcm90b3R5cGUsIFwiZGVzY3JpcHRpb25cIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCAtIHN0dWIgb25seS4nKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2FtZXJhLnByb3RvdHlwZSwgXCJwb3J0TmFtZVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkIC0gc3R1YiBvbmx5LicpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIENhbWVyYS5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uIChzaG91bGRLZWVwQWxpdmUpIHtcclxuICAgICAgICBpZiAoc2hvdWxkS2VlcEFsaXZlID09PSB2b2lkIDApIHsgc2hvdWxkS2VlcEFsaXZlID0gZmFsc2U7IH1cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCAtIHN0dWIgb25seS4nKTtcclxuICAgIH07XHJcbiAgICBDYW1lcmEucHJvdG90eXBlLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQgLSBzdHViIG9ubHkuJyk7XHJcbiAgICB9O1xyXG4gICAgQ2FtZXJhLnByb3RvdHlwZS5nZXRQcm9wZXJ0eSA9IGZ1bmN0aW9uIChwcm9wZXJ0eUlELCBzcGVjaWZpZXIpIHtcclxuICAgICAgICBpZiAoc3BlY2lmaWVyID09PSB2b2lkIDApIHsgc3BlY2lmaWVyID0gMDsgfVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkIC0gc3R1YiBvbmx5LicpO1xyXG4gICAgfTtcclxuICAgIENhbWVyYS5wcm90b3R5cGUuc2V0UHJvcGVydHkgPSBmdW5jdGlvbiAocHJvcGVydHlJRCwgdmFsdWUpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCAtIHN0dWIgb25seS4nKTtcclxuICAgIH07XHJcbiAgICBDYW1lcmEucHJvdG90eXBlLnNldFByb3BlcnRpZXMgPSBmdW5jdGlvbiAocHJvcGVydGllcykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkIC0gc3R1YiBvbmx5LicpO1xyXG4gICAgfTtcclxuICAgIENhbWVyYS5wcm90b3R5cGUuc2VuZENvbW1hbmQgPSBmdW5jdGlvbiAoY29tbWFuZCwgcGFyYW1ldGVyKSB7XHJcbiAgICAgICAgaWYgKHBhcmFtZXRlciA9PT0gdm9pZCAwKSB7IHBhcmFtZXRlciA9IDA7IH1cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCAtIHN0dWIgb25seS4nKTtcclxuICAgIH07XHJcbiAgICBDYW1lcmEucHJvdG90eXBlLnRha2VQaWN0dXJlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkIC0gc3R1YiBvbmx5LicpO1xyXG4gICAgfTtcclxuICAgIENhbWVyYS5wcm90b3R5cGUuaXNMaXZlVmlld0FjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCAtIHN0dWIgb25seS4nKTtcclxuICAgIH07XHJcbiAgICBDYW1lcmEucHJvdG90eXBlLnN0YXJ0TGl2ZVZpZXcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQgLSBzdHViIG9ubHkuJyk7XHJcbiAgICB9O1xyXG4gICAgQ2FtZXJhLnByb3RvdHlwZS5zdG9wTGl2ZVZpZXcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQgLSBzdHViIG9ubHkuJyk7XHJcbiAgICB9O1xyXG4gICAgQ2FtZXJhLnByb3RvdHlwZS5kb3dubG9hZExpdmVWaWV3SW1hZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQgLSBzdHViIG9ubHkuJyk7XHJcbiAgICB9O1xyXG4gICAgQ2FtZXJhLnByb3RvdHlwZS5nZXRMaXZlVmlld0ltYWdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkIC0gc3R1YiBvbmx5LicpO1xyXG4gICAgfTtcclxuICAgIENhbWVyYS5wcm90b3R5cGUuZ2V0Vm9sdW1lcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCAtIHN0dWIgb25seS4nKTtcclxuICAgIH07XHJcbiAgICB2YXIgX2E7XHJcbiAgICBfYSA9IFN5bWJvbC50b1N0cmluZ1RhZztcclxuICAgIENhbWVyYS5FdmVudE5hbWUgPSB7XHJcbiAgICAgICAgQ2FtZXJhQ29ubmVjdDogJ0NhbWVyYUNvbm5lY3QnLFxyXG4gICAgICAgIENhbWVyYURpc2Nvbm5lY3Q6ICdDYW1lcmFEaXNjb25uZWN0JyxcclxuICAgICAgICBEaXJlY3RvcnlDcmVhdGU6ICdEaXJlY3RvcnlDcmVhdGUnLFxyXG4gICAgICAgIERvd25sb2FkUmVxdWVzdDogJ0Rvd25sb2FkUmVxdWVzdCcsXHJcbiAgICAgICAgRXJyb3I6ICdFcnJvcicsXHJcbiAgICAgICAgRmlsZUNyZWF0ZTogJ0ZpbGVDcmVhdGUnLFxyXG4gICAgICAgIEtlZXBBbGl2ZTogJ0tlZXBBbGl2ZScsXHJcbiAgICAgICAgTGl2ZVZpZXdTdGFydDogJ0xpdmVWaWV3U3RhcnQnLFxyXG4gICAgICAgIExpdmVWaWV3U3RvcDogJ0xpdmVWaWV3U3RvcCcsXHJcbiAgICAgICAgT2JqZWN0Q2hhbmdlOiAnT2JqZWN0Q2hhbmdlJyxcclxuICAgICAgICBQcm9wZXJ0eUNoYW5nZU9wdGlvbnM6ICdQcm9wZXJ0eUNoYW5nZU9wdGlvbnMnLFxyXG4gICAgICAgIFByb3BlcnR5Q2hhbmdlVmFsdWU6ICdQcm9wZXJ0eUNoYW5nZVZhbHVlJyxcclxuICAgICAgICBTdGF0ZUNoYW5nZTogJ1N0YXRlQ2hhbmdlJyxcclxuICAgICAgICBWb2x1bWVDaGFuZ2U6ICdWb2x1bWVDaGFuZ2UnLFxyXG4gICAgfTtcclxuICAgIENhbWVyYS5Db21tYW5kID0ge1xyXG4gICAgICAgIEJ1bGJFbmQ6IDMsXHJcbiAgICAgICAgQnVsYlN0YXJ0OiAyLFxyXG4gICAgICAgIERvQ2xpY2tXQkV2ZjogMjYwLFxyXG4gICAgICAgIERvRXZmQWY6IDI1OCxcclxuICAgICAgICBEcml2ZUxlbnNFdmY6IDI1OSxcclxuICAgICAgICBEcml2ZVBvd2VyWm9vbTogMjY5LFxyXG4gICAgICAgIEV4dGVuZFNodXREb3duVGltZXI6IDEsXHJcbiAgICAgICAgTW92aWVTZWxlY3RTd09GRjogMjY0LFxyXG4gICAgICAgIE1vdmllU2VsZWN0U3dPTjogMjYzLFxyXG4gICAgICAgIFByZXNzU2h1dHRlckJ1dHRvbjogNCxcclxuICAgICAgICBSZXF1ZXN0Um9sbFBpdGNoTGV2ZWw6IDI2NSxcclxuICAgICAgICBSZXF1ZXN0U2Vuc29yQ2xlYW5pbmc6IDI3NCxcclxuICAgICAgICBTZXRSZW1vdGVTaG9vdGluZ01vZGU6IDI3MSxcclxuICAgICAgICBUYWtlUGljdHVyZTogMCxcclxuICAgIH07XHJcbiAgICBDYW1lcmEuUHJlc3NTaHV0dGVyQnV0dG9uID0ge1xyXG4gICAgICAgIENvbXBsZXRlbHk6IDMsXHJcbiAgICAgICAgQ29tcGxldGVseU5vbkFGOiA2NTUzOSxcclxuICAgICAgICBIYWxmd2F5OiAxLFxyXG4gICAgICAgIEhhbGZ3YXlOb25BRjogNjU1MzcsXHJcbiAgICAgICAgT0ZGOiAwLFxyXG4gICAgfTtcclxuICAgIHJldHVybiBDYW1lcmE7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IENhbWVyYSB9O1xyXG4iLCJ2YXIgQ2FtZXJhQnJvd3NlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBDYW1lcmFCcm93c2VyKCkge1xyXG4gICAgICAgIHRoaXNbX2FdID0gJ0NhbWVyYUJyb3dzZXInO1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkIC0gc3R1YiBvbmx5LicpO1xyXG4gICAgfVxyXG4gICAgQ2FtZXJhQnJvd3Nlci5wcm90b3R5cGUuc2V0RXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQgLSBzdHViIG9ubHkuJyk7XHJcbiAgICB9O1xyXG4gICAgQ2FtZXJhQnJvd3Nlci5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCAtIHN0dWIgb25seS4nKTtcclxuICAgIH07XHJcbiAgICBDYW1lcmFCcm93c2VyLnByb3RvdHlwZS50ZXJtaW5hdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQgLSBzdHViIG9ubHkuJyk7XHJcbiAgICB9O1xyXG4gICAgQ2FtZXJhQnJvd3Nlci5wcm90b3R5cGUudHJpZ2dlckV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCAtIHN0dWIgb25seS4nKTtcclxuICAgIH07XHJcbiAgICBDYW1lcmFCcm93c2VyLnByb3RvdHlwZS5nZXRDYW1lcmEgPSBmdW5jdGlvbiAoYXQsIGV4YWN0T25seSkge1xyXG4gICAgICAgIGlmIChhdCA9PT0gdm9pZCAwKSB7IGF0ID0gMDsgfVxyXG4gICAgICAgIGlmIChleGFjdE9ubHkgPT09IHZvaWQgMCkgeyBleGFjdE9ubHkgPSBmYWxzZTsgfVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkIC0gc3R1YiBvbmx5LicpO1xyXG4gICAgfTtcclxuICAgIENhbWVyYUJyb3dzZXIucHJvdG90eXBlLmdldENhbWVyYXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQgLSBzdHViIG9ubHkuJyk7XHJcbiAgICB9O1xyXG4gICAgQ2FtZXJhQnJvd3Nlci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkIC0gc3R1YiBvbmx5LicpO1xyXG4gICAgfTtcclxuICAgIHZhciBfYTtcclxuICAgIF9hID0gU3ltYm9sLnRvU3RyaW5nVGFnO1xyXG4gICAgQ2FtZXJhQnJvd3Nlci5FdmVudE5hbWUgPSB7XHJcbiAgICAgICAgQ2FtZXJhQWRkOiAnQ2FtZXJhQWRkJyxcclxuICAgICAgICBDYW1lcmFDb25uZWN0OiAnQ2FtZXJhQ29ubmVjdCcsXHJcbiAgICAgICAgQ2FtZXJhRGlzY29ubmVjdDogJ0NhbWVyYURpc2Nvbm5lY3QnLFxyXG4gICAgICAgIENhbWVyYVJlbW92ZTogJ0NhbWVyYVJlbW92ZScsXHJcbiAgICAgICAgRGlyZWN0b3J5Q3JlYXRlOiAnRGlyZWN0b3J5Q3JlYXRlJyxcclxuICAgICAgICBEb3dubG9hZFJlcXVlc3Q6ICdEb3dubG9hZFJlcXVlc3QnLFxyXG4gICAgICAgIEVycm9yOiAnRXJyb3InLFxyXG4gICAgICAgIEZpbGVDcmVhdGU6ICdGaWxlQ3JlYXRlJyxcclxuICAgICAgICBLZWVwQWxpdmU6ICdLZWVwQWxpdmUnLFxyXG4gICAgICAgIExpdmVWaWV3U3RhcnQ6ICdMaXZlVmlld1N0YXJ0JyxcclxuICAgICAgICBMaXZlVmlld1N0b3A6ICdMaXZlVmlld1N0b3AnLFxyXG4gICAgICAgIE9iamVjdENoYW5nZTogJ09iamVjdENoYW5nZScsXHJcbiAgICAgICAgUHJvcGVydHlDaGFuZ2VPcHRpb25zOiAnUHJvcGVydHlDaGFuZ2VPcHRpb25zJyxcclxuICAgICAgICBQcm9wZXJ0eUNoYW5nZVZhbHVlOiAnUHJvcGVydHlDaGFuZ2VWYWx1ZScsXHJcbiAgICAgICAgU3RhdGVDaGFuZ2U6ICdTdGF0ZUNoYW5nZScsXHJcbiAgICAgICAgVm9sdW1lQ2hhbmdlOiAnVm9sdW1lQ2hhbmdlJyxcclxuICAgIH07XHJcbiAgICByZXR1cm4gQ2FtZXJhQnJvd3NlcjtcclxufSgpKTtcclxuZXhwb3J0IHsgQ2FtZXJhQnJvd3NlciB9O1xyXG52YXIgU1RVQiA9IDE7XHJcblNUVUIgPSAxO1xyXG5TVFVCID0gMTtcclxuU1RVQiA9IDE7XHJcblNUVUIgPSAxO1xyXG5TVFVCID0gMTtcclxuU1RVQiA9IDE7XHJcblNUVUIgPSAxO1xyXG5TVFVCID0gMTtcclxuU1RVQiA9IDE7XHJcblNUVUIgPSAxO1xyXG5TVFVCID0gMTtcclxuU1RVQiA9IDE7XHJcblNUVUIgPSAxO1xyXG5TVFVCID0gMTtcclxuU1RVQiA9IDE7XHJcblNUVUIgPSAxO1xyXG4iLCJ2YXIgX2E7XHJcbnZhciBDYW1lcmFGaWxlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIENhbWVyYUZpbGUoKSB7XHJcbiAgICAgICAgdGhpc1tfYV0gPSAnQ2FtZXJhRmlsZSc7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQgLSBzdHViIG9ubHkuJyk7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2FtZXJhRmlsZS5wcm90b3R5cGUsIFwibmFtZVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkIC0gc3R1YiBvbmx5LicpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDYW1lcmFGaWxlLnByb3RvdHlwZSwgXCJsb2NhbEZpbGVcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCAtIHN0dWIgb25seS4nKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2FtZXJhRmlsZS5wcm90b3R5cGUsIFwiZ3JvdXBJRFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkIC0gc3R1YiBvbmx5LicpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDYW1lcmFGaWxlLnByb3RvdHlwZSwgXCJzaXplXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQgLSBzdHViIG9ubHkuJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENhbWVyYUZpbGUucHJvdG90eXBlLCBcImZvcm1hdFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkIC0gc3R1YiBvbmx5LicpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIENhbWVyYUZpbGUucHJvdG90eXBlLmRvd25sb2FkVG9QYXRoID0gZnVuY3Rpb24gKHBhdGgpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCAtIHN0dWIgb25seS4nKTtcclxuICAgIH07XHJcbiAgICBDYW1lcmFGaWxlLnByb3RvdHlwZS5kb3dubG9hZFRvRmlsZSA9IGZ1bmN0aW9uIChmaWxlTmFtZSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkIC0gc3R1YiBvbmx5LicpO1xyXG4gICAgfTtcclxuICAgIENhbWVyYUZpbGUucHJvdG90eXBlLmRvd25sb2FkVG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQgLSBzdHViIG9ubHkuJyk7XHJcbiAgICB9O1xyXG4gICAgQ2FtZXJhRmlsZS5wcm90b3R5cGUuZG93bmxvYWRUaHVtYm5haWxUb1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCAtIHN0dWIgb25seS4nKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQ2FtZXJhRmlsZTtcclxufSgpKTtcclxuZXhwb3J0IHsgQ2FtZXJhRmlsZSB9O1xyXG5fYSA9IFN5bWJvbC50b1N0cmluZ1RhZztcclxuIiwidmFyIFNUVUIgPSAxO1xyXG5TVFVCID0gMTtcclxuU1RVQiA9IDE7XHJcblNUVUIgPSAxO1xyXG5TVFVCID0gMTtcclxuU1RVQiA9IDE7XHJcblNUVUIgPSAxO1xyXG5TVFVCID0gMTtcclxudmFyIENhbWVyYVByb3BlcnR5ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIENhbWVyYVByb3BlcnR5KGNhbWVyYSwgcHJvcGVydHlJRCwgcHJvcGVydHlTcGVjaWZpZXIpIHtcclxuICAgICAgICBpZiAocHJvcGVydHlTcGVjaWZpZXIgPT09IHZvaWQgMCkgeyBwcm9wZXJ0eVNwZWNpZmllciA9IDA7IH1cclxuICAgICAgICB0aGlzW19hXSA9ICdDYW1lcmFQcm9wZXJ0eSc7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQgLSBzdHViIG9ubHkuJyk7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2FtZXJhUHJvcGVydHkucHJvdG90eXBlLCBcImxhYmVsXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQgLSBzdHViIG9ubHkuJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENhbWVyYVByb3BlcnR5LnByb3RvdHlwZSwgXCJpZGVudGlmaWVyXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQgLSBzdHViIG9ubHkuJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENhbWVyYVByb3BlcnR5LnByb3RvdHlwZSwgXCJzcGVjaWZpZXJcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCAtIHN0dWIgb25seS4nKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2FtZXJhUHJvcGVydHkucHJvdG90eXBlLCBcImF2YWlsYWJsZVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkIC0gc3R1YiBvbmx5LicpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDYW1lcmFQcm9wZXJ0eS5wcm90b3R5cGUsIFwidmFsdWVcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCAtIHN0dWIgb25seS4nKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkIC0gc3R1YiBvbmx5LicpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDYW1lcmFQcm9wZXJ0eS5wcm90b3R5cGUsIFwiYWxsb3dlZFZhbHVlc1wiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkIC0gc3R1YiBvbmx5LicpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIENhbWVyYVByb3BlcnR5LnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQgLSBzdHViIG9ubHkuJyk7XHJcbiAgICB9O1xyXG4gICAgdmFyIF9hO1xyXG4gICAgX2EgPSBTeW1ib2wudG9TdHJpbmdUYWc7XHJcbiAgICBDYW1lcmFQcm9wZXJ0eS5JRCA9IHtcclxuICAgICAgICBBRUJyYWNrZXQ6IDEwMzgsXHJcbiAgICAgICAgQUVNb2RlOiAxMDI0LFxyXG4gICAgICAgIEFFTW9kZVNlbGVjdDogMTA3OCxcclxuICAgICAgICBBRk1vZGU6IDEwMjgsXHJcbiAgICAgICAgQXJ0aXN0OiAxMDQ4LFxyXG4gICAgICAgIEF1dG9Qb3dlck9mZlNldHRpbmc6IDE2Nzc4MzM0LFxyXG4gICAgICAgIEF2OiAxMDI5LFxyXG4gICAgICAgIEF2YWlsYWJsZVNob3RzOiAxMDM0LFxyXG4gICAgICAgIEJhdHRlcnlMZXZlbDogOCxcclxuICAgICAgICBCYXR0ZXJ5UXVhbGl0eTogMTYsXHJcbiAgICAgICAgQm9keUlERXg6IDIxLFxyXG4gICAgICAgIEJyYWNrZXQ6IDEwMzUsXHJcbiAgICAgICAgQ0ZuOiA5LFxyXG4gICAgICAgIENvbG9yU3BhY2U6IDI2OSxcclxuICAgICAgICBDb2xvclRlbXBlcmF0dXJlOiAyNjMsXHJcbiAgICAgICAgQ29weXJpZ2h0OiAxMDQ5LFxyXG4gICAgICAgIEN1cnJlbnRGb2xkZXI6IDEzLFxyXG4gICAgICAgIEN1cnJlbnRTdG9yYWdlOiAxMixcclxuICAgICAgICBEYXRlVGltZTogNixcclxuICAgICAgICBEQ19TdHJvYmU6IDE1MzcsXHJcbiAgICAgICAgRENfWm9vbTogMTUzNixcclxuICAgICAgICBEZXB0aE9mRmllbGQ6IDEwNTEsXHJcbiAgICAgICAgRHJpdmVNb2RlOiAxMDI1LFxyXG4gICAgICAgIEVGQ29tcGVuc2F0aW9uOiAxMDU0LFxyXG4gICAgICAgIEV2Zl9BRk1vZGU6IDEyOTQsXHJcbiAgICAgICAgRXZmX0NsaWNrV0JDb2VmZnM6IDE2Nzc4NTAyLFxyXG4gICAgICAgIEV2Zl9Db2xvclRlbXBlcmF0dXJlOiAxMjgzLFxyXG4gICAgICAgIEV2Zl9Db29yZGluYXRlU3lzdGVtOiAxMzQ0LFxyXG4gICAgICAgIEV2Zl9EZXB0aE9mRmllbGRQcmV2aWV3OiAxMjg0LFxyXG4gICAgICAgIEV2Zl9Gb2N1c0FpZDogMTI4OSxcclxuICAgICAgICBFdmZfSGlzdG9ncmFtOiAxMjkwLFxyXG4gICAgICAgIEV2Zl9IaXN0b2dyYW1COiAxMzA0LFxyXG4gICAgICAgIEV2Zl9IaXN0b2dyYW1HOiAxMzAzLFxyXG4gICAgICAgIEV2Zl9IaXN0b2dyYW1SOiAxMzAyLFxyXG4gICAgICAgIEV2Zl9IaXN0b2dyYW1TdGF0dXM6IDEyOTIsXHJcbiAgICAgICAgRXZmX0hpc3RvZ3JhbVk6IDEzMDEsXHJcbiAgICAgICAgRXZmX0ltYWdlQ2xpcFJlY3Q6IDEzNDksXHJcbiAgICAgICAgRXZmX0ltYWdlUG9zaXRpb246IDEyOTEsXHJcbiAgICAgICAgRXZmX01vZGU6IDEyODEsXHJcbiAgICAgICAgRXZmX091dHB1dERldmljZTogMTI4MCxcclxuICAgICAgICBFdmZfUG93ZXJab29tX0N1clBvc2l0aW9uOiAxMzYwLFxyXG4gICAgICAgIEV2Zl9Qb3dlclpvb21fTWF4UG9zaXRpb246IDEzNjEsXHJcbiAgICAgICAgRXZmX1Bvd2VyWm9vbV9NaW5Qb3NpdGlvbjogMTM2MixcclxuICAgICAgICBFVkZfUm9sbGluZ1BpdGNoaW5nOiAxNjc3ODU2NCxcclxuICAgICAgICBFdmZfV2hpdGVCYWxhbmNlOiAxMjgyLFxyXG4gICAgICAgIEV2Zl9ab29tOiAxMjg3LFxyXG4gICAgICAgIEV2Zl9ab29tUG9zaXRpb246IDEyODgsXHJcbiAgICAgICAgRXZmX1pvb21SZWN0OiAxMzQ1LFxyXG4gICAgICAgIEV4cG9zdXJlQ29tcGVuc2F0aW9uOiAxMDMxLFxyXG4gICAgICAgIEZFQnJhY2tldDogMTAzOSxcclxuICAgICAgICBGaXJtd2FyZVZlcnNpb246IDcsXHJcbiAgICAgICAgRml4ZWRNb3ZpZTogMTY3NzgyNzQsXHJcbiAgICAgICAgRmxhc2hDb21wZW5zYXRpb246IDEwMzIsXHJcbiAgICAgICAgRmxhc2hNb2RlOiAxMDQ0LFxyXG4gICAgICAgIEZsYXNoT246IDEwNDIsXHJcbiAgICAgICAgRm9jYWxMZW5ndGg6IDEwMzMsXHJcbiAgICAgICAgRm9jdXNJbmZvOiAyNjAsXHJcbiAgICAgICAgR1BTQWx0aXR1ZGU6IDIwNTQsXHJcbiAgICAgICAgR1BTQWx0aXR1ZGVSZWY6IDIwNTMsXHJcbiAgICAgICAgR1BTRGF0ZVN0YW1wOiAyMDc3LFxyXG4gICAgICAgIEdQU0xhdGl0dWRlOiAyMDUwLFxyXG4gICAgICAgIEdQU0xhdGl0dWRlUmVmOiAyMDQ5LFxyXG4gICAgICAgIEdQU0xvbmdpdHVkZTogMjA1MixcclxuICAgICAgICBHUFNMb25naXR1ZGVSZWY6IDIwNTEsXHJcbiAgICAgICAgR1BTTWFwRGF0dW06IDIwNjYsXHJcbiAgICAgICAgR1BTU2F0ZWxsaXRlczogMjA1NixcclxuICAgICAgICBHUFNTdGF0dXM6IDIwNTcsXHJcbiAgICAgICAgR1BTVGltZVN0YW1wOiAyMDU1LFxyXG4gICAgICAgIEdQU1ZlcnNpb25JRDogMjA0OCxcclxuICAgICAgICBIRERpcmVjdG9yeVN0cnVjdHVyZTogMzIsXHJcbiAgICAgICAgSUNDUHJvZmlsZTogMjU5LFxyXG4gICAgICAgIEltYWdlUXVhbGl0eTogMjU2LFxyXG4gICAgICAgIElTT0JyYWNrZXQ6IDEwNDAsXHJcbiAgICAgICAgSVNPU3BlZWQ6IDEwMjYsXHJcbiAgICAgICAgSnBlZ1F1YWxpdHk6IDI1NyxcclxuICAgICAgICBMZW5zQmFycmVsU3RhdHVzOiAxNTQxLFxyXG4gICAgICAgIExlbnNOYW1lOiAxMDM3LFxyXG4gICAgICAgIExlbnNTdGF0dXM6IDEwNDYsXHJcbiAgICAgICAgTWFrZXJOYW1lOiA1LFxyXG4gICAgICAgIE1hbnVhbFdoaXRlQmFsYW5jZURhdGE6IDE2Nzc3NzMyLFxyXG4gICAgICAgIE1ldGVyaW5nTW9kZTogMTAyNyxcclxuICAgICAgICBNaXJyb3JMb2NrVXBTdGF0ZTogMTY3NzgyNzMsXHJcbiAgICAgICAgTWlycm9yVXBTZXR0aW5nOiAxNjc3ODI5NixcclxuICAgICAgICBNb3ZpZVBhcmFtOiAxNjc3ODI3NSxcclxuICAgICAgICBNeU1lbnU6IDE0LFxyXG4gICAgICAgIE5vaXNlUmVkdWN0aW9uOiAxMDQxLFxyXG4gICAgICAgIE9yaWVudGF0aW9uOiAyNTgsXHJcbiAgICAgICAgT3duZXJOYW1lOiA0LFxyXG4gICAgICAgIFBpY3R1cmVTdHlsZTogMjc2LFxyXG4gICAgICAgIFBpY3R1cmVTdHlsZUNhcHRpb246IDUxMixcclxuICAgICAgICBQaWN0dXJlU3R5bGVEZXNjcmlwdGlvbjogMjc3LFxyXG4gICAgICAgIFBvd2VyWm9vbV9TcGVlZDogMTA5MixcclxuICAgICAgICBQcm9kdWN0TmFtZTogMixcclxuICAgICAgICBSZWNvcmQ6IDEyOTYsXHJcbiAgICAgICAgUmVkRXllOiAxMDQzLFxyXG4gICAgICAgIFNhdmVUbzogMTEsXHJcbiAgICAgICAgU3VtbWVyVGltZVNldHRpbmc6IDE2Nzc3MjQwLFxyXG4gICAgICAgIFRlbXBlcmF0dXJlU3RhdHVzOiAxNjc3ODI2MSxcclxuICAgICAgICBUaW1lWm9uZTogMTY3NzcyMzksXHJcbiAgICAgICAgVHY6IDEwMzAsXHJcbiAgICAgICAgVVRDVGltZTogMTY3NzcyMzgsXHJcbiAgICAgICAgV2hpdGVCYWxhbmNlOiAyNjIsXHJcbiAgICAgICAgV2hpdGVCYWxhbmNlQnJhY2tldDogMTAzNixcclxuICAgICAgICBXaGl0ZUJhbGFuY2VTaGlmdDogMjY0LFxyXG4gICAgfTtcclxuICAgIHJldHVybiBDYW1lcmFQcm9wZXJ0eTtcclxufSgpKTtcclxuZXhwb3J0IHsgQ2FtZXJhUHJvcGVydHkgfTtcclxuIiwidmFyIF9hO1xyXG52YXIgU1RVQiA9IDA7XHJcblNUVUIgPSAxO1xyXG52YXIgRGlyZWN0b3J5ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIERpcmVjdG9yeSgpIHtcclxuICAgICAgICB0aGlzW19hXSA9ICdEaXJlY3RvcnknO1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkIC0gc3R1YiBvbmx5LicpO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERpcmVjdG9yeS5wcm90b3R5cGUsIFwibmFtZVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkIC0gc3R1YiBvbmx5LicpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEaXJlY3RvcnkucHJvdG90eXBlLCBcImxlbmd0aFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkIC0gc3R1YiBvbmx5LicpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIERpcmVjdG9yeS5wcm90b3R5cGUuZ2V0RW50cmllcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCAtIHN0dWIgb25seS4nKTtcclxuICAgIH07XHJcbiAgICBEaXJlY3RvcnkucHJvdG90eXBlWyhfYSA9IFN5bWJvbC50b1N0cmluZ1RhZywgU3ltYm9sLml0ZXJhdG9yKV0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQgLSBzdHViIG9ubHkuJyk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIERpcmVjdG9yeTtcclxufSgpKTtcclxuZXhwb3J0IHsgRGlyZWN0b3J5IH07XHJcbiIsInZhciBFeHBvc3VyZUNvbXBlbnNhdGlvbiA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBFeHBvc3VyZUNvbXBlbnNhdGlvbih2YWx1ZV8pIHtcclxuICAgICAgICB0aGlzLnZhbHVlXyA9IHZhbHVlXztcclxuICAgICAgICB0aGlzW19hXSA9ICdFeHBvc3VyZUNvbXBlbnNhdGlvbic7XHJcbiAgICAgICAgdGhpcy5jb21wZW5zYXRpb25fID0gRXhwb3N1cmVDb21wZW5zYXRpb24uVmFsdWVzW3ZhbHVlX10gfHwgMDtcclxuICAgICAgICB0aGlzLmxhYmVsXyA9IEV4cG9zdXJlQ29tcGVuc2F0aW9uLmdldExhYmVsRm9yQ29tcGVuc2F0aW9uKHRoaXMuY29tcGVuc2F0aW9uXyk7XHJcbiAgICB9XHJcbiAgICBFeHBvc3VyZUNvbXBlbnNhdGlvbi5nZXRMYWJlbEZvckNvbXBlbnNhdGlvbiA9IGZ1bmN0aW9uIChjb21wZW5zYXRpb24pIHtcclxuICAgICAgICB2YXIgbGFiZWwgPSAnJztcclxuICAgICAgICBpZiAoY29tcGVuc2F0aW9uID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnMCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBmdWxsID0gY29tcGVuc2F0aW9uID4gMFxyXG4gICAgICAgICAgICA/IE1hdGguZmxvb3IoY29tcGVuc2F0aW9uKVxyXG4gICAgICAgICAgICA6IE1hdGguY2VpbChjb21wZW5zYXRpb24pO1xyXG4gICAgICAgIHZhciBmcmFjdGlvbiA9IE1hdGguYWJzKGNvbXBlbnNhdGlvbiAtIGZ1bGwpO1xyXG4gICAgICAgIGxhYmVsID0gZnVsbCA+IDAgPyAnKycgKyBTdHJpbmcoZnVsbCkgOiBTdHJpbmcoZnVsbCk7XHJcbiAgICAgICAgaWYgKGZyYWN0aW9uID4gMC42KSB7XHJcbiAgICAgICAgICAgIGxhYmVsICs9ICcgMi8zJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZnJhY3Rpb24gPiAwLjQ5KSB7XHJcbiAgICAgICAgICAgIGxhYmVsICs9ICcgMS8yJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZnJhY3Rpb24gPiAwLjMpIHtcclxuICAgICAgICAgICAgbGFiZWwgKz0gJyAxLzMnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGFiZWw7XHJcbiAgICB9O1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEV4cG9zdXJlQ29tcGVuc2F0aW9uLnByb3RvdHlwZSwgXCJsYWJlbFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhYmVsXztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRXhwb3N1cmVDb21wZW5zYXRpb24ucHJvdG90eXBlLCBcInZhbHVlXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVfO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFeHBvc3VyZUNvbXBlbnNhdGlvbi5wcm90b3R5cGUsIFwiY29tcGVuc2F0aW9uXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29tcGVuc2F0aW9uXztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBFeHBvc3VyZUNvbXBlbnNhdGlvbi5wcm90b3R5cGVbKF9hID0gU3ltYm9sLnRvU3RyaW5nVGFnLCBTeW1ib2wudG9QcmltaXRpdmUpXSA9IGZ1bmN0aW9uIChoaW50KSB7XHJcbiAgICAgICAgc3dpdGNoIChoaW50KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZV87XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sYWJlbF87XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgRXhwb3N1cmVDb21wZW5zYXRpb24uZmluZE5lYXJlc3QgPSBmdW5jdGlvbiAoY29tcGVuc2F0aW9uKSB7XHJcbiAgICAgICAgdmFyIGZvdW5kID0gT2JqZWN0LmtleXMoRXhwb3N1cmVDb21wZW5zYXRpb24uVmFsdWVzKS5yZWR1Y2UoZnVuY3Rpb24gKGNhcnJ5LCBrZXkpIHtcclxuICAgICAgICAgICAgaWYgKGNhcnJ5LmRpZmZlcmVuY2UgPCAwLjAwMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhcnJ5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gRXhwb3N1cmVDb21wZW5zYXRpb24uVmFsdWVzW2tleV07XHJcbiAgICAgICAgICAgIHZhciBkaWZmZXJlbmNlID0gTWF0aC5hYnMoY3VycmVudCAtIGNvbXBlbnNhdGlvbik7XHJcbiAgICAgICAgICAgIGlmIChkaWZmZXJlbmNlIDwgY2FycnkuZGlmZmVyZW5jZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogK2tleSxcclxuICAgICAgICAgICAgICAgICAgICBkaWZmZXJlbmNlOiBkaWZmZXJlbmNlLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY2Fycnk7XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICB2YWx1ZTogMCxcclxuICAgICAgICAgICAgZGlmZmVyZW5jZTogMTAwLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChmb3VuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZm91bmQudmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfTtcclxuICAgIEV4cG9zdXJlQ29tcGVuc2F0aW9uLmZvckxhYmVsID0gZnVuY3Rpb24gKGxhYmVsKSB7XHJcbiAgICAgICAgdmFyIG1hdGNoID0gbGFiZWwubWF0Y2goLyhbKy1dXFxkKylcXHMrKD86KFsxMl0pXFwvKFsyM10pKT8vKTtcclxuICAgICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICAgICAgdmFyIGNvbXBlbnNhdGlvbiA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xyXG4gICAgICAgICAgICBpZiAobWF0Y2hbMl0gJiYgbWF0Y2hbM10pIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb21wZW5zYXRpb24gPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGVuc2F0aW9uIC09IHBhcnNlRmxvYXQobWF0Y2hbMl0pIC8gcGFyc2VGbG9hdChtYXRjaFszXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wZW5zYXRpb24gKz0gcGFyc2VGbG9hdChtYXRjaFsyXSkgLyBwYXJzZUZsb2F0KG1hdGNoWzNdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBFeHBvc3VyZUNvbXBlbnNhdGlvbi5maW5kTmVhcmVzdChjb21wZW5zYXRpb24pO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXhwb3N1cmVDb21wZW5zYXRpb24odmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfTtcclxuICAgIHZhciBfYTtcclxuICAgIEV4cG9zdXJlQ29tcGVuc2F0aW9uLlZhbHVlcyA9IHtcclxuICAgICAgICAnMCc6IDAsXHJcbiAgICAgICAgJzMnOiAwLjMzMzMzMzMzMzMzMzMzMzMsXHJcbiAgICAgICAgJzQnOiAwLjUsXHJcbiAgICAgICAgJzUnOiAwLjY2NjY2NjY2NjY2NjY2NjYsXHJcbiAgICAgICAgJzgnOiAxLFxyXG4gICAgICAgICcxMSc6IDEuMzMzMzMzMzMzMzMzMzMzMyxcclxuICAgICAgICAnMTInOiAxLjUsXHJcbiAgICAgICAgJzEzJzogMS42NjY2NjY2NjY2NjY2NjY1LFxyXG4gICAgICAgICcxNic6IDIsXHJcbiAgICAgICAgJzE5JzogMi4zMzMzMzMzMzMzMzMzMzM1LFxyXG4gICAgICAgICcyMCc6IDIuNSxcclxuICAgICAgICAnMjEnOiAyLjY2NjY2NjY2NjY2NjY2NjUsXHJcbiAgICAgICAgJzI0JzogMyxcclxuICAgICAgICAnMjcnOiAzLjMzMzMzMzMzMzMzMzMzMzUsXHJcbiAgICAgICAgJzI4JzogMy41LFxyXG4gICAgICAgICcyOSc6IDMuNjY2NjY2NjY2NjY2NjY2NSxcclxuICAgICAgICAnMzInOiA0LFxyXG4gICAgICAgICczNSc6IDQuMzMzMzMzMzMzMzMzMzMzLFxyXG4gICAgICAgICczNic6IDQuNSxcclxuICAgICAgICAnMzcnOiA0LjY2NjY2NjY2NjY2NjY2NyxcclxuICAgICAgICAnNDAnOiA1LFxyXG4gICAgICAgICcyMTYnOiAtNSxcclxuICAgICAgICAnMjE5JzogLTQuNjY2NjY2NjY2NjY2NjY3LFxyXG4gICAgICAgICcyMjAnOiAtNC41LFxyXG4gICAgICAgICcyMjEnOiAtNC4zMzMzMzMzMzMzMzMzMzMsXHJcbiAgICAgICAgJzIyNCc6IC00LFxyXG4gICAgICAgICcyMjcnOiAtMy42NjY2NjY2NjY2NjY2NjY1LFxyXG4gICAgICAgICcyMjgnOiAtMy41LFxyXG4gICAgICAgICcyMjknOiAtMy4zMzMzMzMzMzMzMzMzMzM1LFxyXG4gICAgICAgICcyMzInOiAtMyxcclxuICAgICAgICAnMjM1JzogLTIuNjY2NjY2NjY2NjY2NjY2NSxcclxuICAgICAgICAnMjM2JzogLTIuNSxcclxuICAgICAgICAnMjM3JzogLTIuMzMzMzMzMzMzMzMzMzMzNSxcclxuICAgICAgICAnMjQwJzogLTIsXHJcbiAgICAgICAgJzI0Myc6IC0xLjY2NjY2NjY2NjY2NjY2NjUsXHJcbiAgICAgICAgJzI0NCc6IC0xLjUsXHJcbiAgICAgICAgJzI0NSc6IC0xLjMzMzMzMzMzMzMzMzMzMzMsXHJcbiAgICAgICAgJzI0OCc6IC0xLFxyXG4gICAgICAgICcyNTEnOiAtMC42NjY2NjY2NjY2NjY2NjY2LFxyXG4gICAgICAgICcyNTInOiAtMC41LFxyXG4gICAgICAgICcyNTMnOiAtMC4zMzMzMzMzMzMzMzMzMzMzLFxyXG4gICAgfTtcclxuICAgIHJldHVybiBFeHBvc3VyZUNvbXBlbnNhdGlvbjtcclxufSgpKTtcclxuZXhwb3J0IHsgRXhwb3N1cmVDb21wZW5zYXRpb24gfTtcclxuIiwidmFyIEZpbGVGb3JtYXQgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gRmlsZUZvcm1hdCh2YWx1ZV8pIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMudmFsdWVfID0gdmFsdWVfO1xyXG4gICAgICAgIHRoaXNbX2FdID0gJ0ZpbGVGb3JtYXQnO1xyXG4gICAgICAgIHRoaXMubGFiZWxfID1cclxuICAgICAgICAgICAgT2JqZWN0LmtleXMoRmlsZUZvcm1hdC5JRCkuZmluZChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBGaWxlRm9ybWF0LklEW2tleV0gPT09IF90aGlzLnZhbHVlXzsgfSkgfHwgXCIweFwiLmNvbmNhdCh2YWx1ZV8udG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDgsICcwJykpO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZpbGVGb3JtYXQucHJvdG90eXBlLCBcImxhYmVsXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFiZWxfO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGaWxlRm9ybWF0LnByb3RvdHlwZSwgXCJ2YWx1ZVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlXztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBGaWxlRm9ybWF0LnByb3RvdHlwZVsoX2EgPSBTeW1ib2wudG9TdHJpbmdUYWcsIFN5bWJvbC50b1ByaW1pdGl2ZSldID0gZnVuY3Rpb24gKGhpbnQpIHtcclxuICAgICAgICBzd2l0Y2ggKGhpbnQpIHtcclxuICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlXztcclxuICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxhYmVsO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHZhciBfYTtcclxuICAgIEZpbGVGb3JtYXQuSUQgPSB7XHJcbiAgICAgICAgQ1IyOiA0NTMxNSxcclxuICAgICAgICBDUjM6IDQ1MzIwLFxyXG4gICAgICAgIEhFSUZfQ09ERTogNDUzMjMsXHJcbiAgICAgICAgSlBFRzogMTQzMzcsXHJcbiAgICAgICAgTVA0OiA0NzQ5MCxcclxuICAgICAgICBVbmtub3duOiAwLFxyXG4gICAgfTtcclxuICAgIHJldHVybiBGaWxlRm9ybWF0O1xyXG59KCkpO1xyXG5leHBvcnQgeyBGaWxlRm9ybWF0IH07XHJcbiIsInZhciBGbGFnID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEZsYWcodmFsdWUpIHtcclxuICAgICAgICB0aGlzW19hXSA9ICdGbGFnJztcclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZV8gPSB2YWx1ZSA/IEZsYWcuVHJ1ZSA6IEZsYWcuRmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlID09PSBGbGFnLlRydWUpIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZV8gPSBGbGFnLlRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlXyA9IEZsYWcuRmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnZhbHVlXyA9PT0gRmxhZy5UcnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfID0gJ3RydWUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbF8gPSAnZmFsc2UnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGbGFnLnByb3RvdHlwZSwgXCJsYWJlbFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhYmVsXztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRmxhZy5wcm90b3R5cGUsIFwidmFsdWVcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZV87XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZsYWcucHJvdG90eXBlLCBcImZsYWdcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZV8gIT09IDA7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgRmxhZy5wcm90b3R5cGVbKF9hID0gU3ltYm9sLnRvU3RyaW5nVGFnLCBTeW1ib2wudG9QcmltaXRpdmUpXSA9IGZ1bmN0aW9uIChoaW50KSB7XHJcbiAgICAgICAgc3dpdGNoIChoaW50KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZV87XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sYWJlbF87XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgRmxhZy5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGxhYmVsOiB0aGlzLmxhYmVsLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcclxuICAgICAgICAgICAgZmxhZzogdGhpcy5mbGFnLFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgRmxhZy5mb3JMYWJlbCA9IGZ1bmN0aW9uIChsYWJlbCkge1xyXG4gICAgICAgIGlmIChbJ3RydWUnLCAnMScsICd5ZXMnLCAnb24nXS5pbmRleE9mKGxhYmVsLnRvTG93ZXJDYXNlKCkpID49IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBGbGFnKEZsYWcuVHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgRmxhZyhGbGFnLkZhbHNlKTtcclxuICAgIH07XHJcbiAgICB2YXIgX2E7XHJcbiAgICBGbGFnLlRydWUgPSAxO1xyXG4gICAgRmxhZy5GYWxzZSA9IDA7XHJcbiAgICByZXR1cm4gRmxhZztcclxufSgpKTtcclxuZXhwb3J0IHsgRmxhZyB9O1xyXG4iLCJ2YXIgU1RVQiA9IDA7XHJcblNUVUIgPSAxO1xyXG52YXIgSW1hZ2VRdWFsaXR5ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEltYWdlUXVhbGl0eSh2YWx1ZV8pIHtcclxuICAgICAgICB0aGlzLnZhbHVlXyA9IHZhbHVlXztcclxuICAgICAgICB0aGlzW19hXSA9ICdJbWFnZVF1YWxpdHknO1xyXG4gICAgICAgIHZhciBuYW1lID0gT2JqZWN0LmtleXMoSW1hZ2VRdWFsaXR5LklEKS5maW5kKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIEltYWdlUXVhbGl0eS5JRFtrZXldID09PSB2YWx1ZV87IH0pO1xyXG4gICAgICAgIGlmIChuYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfID0gbmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfID0gJzB4JyArIHZhbHVlXy50b1N0cmluZygxNikucGFkU3RhcnQoOCwgJzAnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBJbWFnZVF1YWxpdHkuZXh0cmFjdEJpdHMgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQsIGxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiAoKDEgPDwgbGVuZ3RoKSAtIDEpICYgKGJ1ZmZlciA+PiBvZmZzZXQpO1xyXG4gICAgfTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbWFnZVF1YWxpdHkucHJvdG90eXBlLCBcImxhYmVsXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFiZWxfO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbWFnZVF1YWxpdHkucHJvdG90eXBlLCBcInZhbHVlXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVfO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbWFnZVF1YWxpdHkucHJvdG90eXBlLCBcIm1haW5cIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBJbWFnZVF1YWxpdHkuZXh0cmFjdEJpdHModGhpcy52YWx1ZV8sIDI0LCA4KSxcclxuICAgICAgICAgICAgICAgIHNpemU6IEltYWdlUXVhbGl0eS5leHRyYWN0Qml0cyh0aGlzLnZhbHVlXywgMjAsIDQpLFxyXG4gICAgICAgICAgICAgICAgcXVhbGl0eTogSW1hZ2VRdWFsaXR5LmV4dHJhY3RCaXRzKHRoaXMudmFsdWVfLCAxNiwgNCksXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEltYWdlUXVhbGl0eS5wcm90b3R5cGUsIFwic2Vjb25kYXJ5XCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGZvcm1hdDogSW1hZ2VRdWFsaXR5LmV4dHJhY3RCaXRzKHRoaXMudmFsdWVfLCA4LCA0KSxcclxuICAgICAgICAgICAgICAgIHNpemU6IEltYWdlUXVhbGl0eS5leHRyYWN0Qml0cyh0aGlzLnZhbHVlXywgNCwgNCksXHJcbiAgICAgICAgICAgICAgICBxdWFsaXR5OiBJbWFnZVF1YWxpdHkuZXh0cmFjdEJpdHModGhpcy52YWx1ZV8sIDAsIDQpLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIEltYWdlUXVhbGl0eS5wcm90b3R5cGVbKF9hID0gU3ltYm9sLnRvU3RyaW5nVGFnLCBTeW1ib2wudG9QcmltaXRpdmUpXSA9IGZ1bmN0aW9uIChoaW50KSB7XHJcbiAgICAgICAgc3dpdGNoIChoaW50KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZV87XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sYWJlbF87XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdmFyIF9hO1xyXG4gICAgSW1hZ2VRdWFsaXR5LklEID0ge1xyXG4gICAgICAgIENSOiA2NTUzMzU5LFxyXG4gICAgICAgIENSSEVJRkw6IDY0ODgxOTIsXHJcbiAgICAgICAgQ1JIRUlGTEY6IDY0ODgxOTUsXHJcbiAgICAgICAgQ1JIRUlGTE46IDY0ODgxOTQsXHJcbiAgICAgICAgQ1JIRUlGTUY6IDY0ODg0NTEsXHJcbiAgICAgICAgQ1JIRUlGTU46IDY0ODg0NTAsXHJcbiAgICAgICAgQ1JIRUlGUzFGOiA2NDkxNzc5LFxyXG4gICAgICAgIENSSEVJRlMxTjogNjQ5MTc3OCxcclxuICAgICAgICBDUkhFSUZTMkY6IDY0OTIwMzUsXHJcbiAgICAgICAgQ1JMSjogNjQ4ODA4MCxcclxuICAgICAgICBDUkxKRjogNjQ4ODA4MyxcclxuICAgICAgICBDUkxKTjogNjQ4ODA4MixcclxuICAgICAgICBDUk0xSjogNjQ4OTM2MCxcclxuICAgICAgICBDUk0xSkY6IDY0ODkzNjMsXHJcbiAgICAgICAgQ1JNMUpOOiA2NDg5MzYyLFxyXG4gICAgICAgIENSTTJKOiA2NDg5NjE2LFxyXG4gICAgICAgIENSTTJKRjogNjQ4OTYxOSxcclxuICAgICAgICBDUk0ySk46IDY0ODk2MTgsXHJcbiAgICAgICAgQ1JNSjogNjQ4ODMzNixcclxuICAgICAgICBDUk1KRjogNjQ4ODMzOSxcclxuICAgICAgICBDUk1KTjogNjQ4ODMzOCxcclxuICAgICAgICBDUlMxSjogNjQ5MTY2NCxcclxuICAgICAgICBDUlMxSkY6IDY0OTE2NjcsXHJcbiAgICAgICAgQ1JTMUpOOiA2NDkxNjY2LFxyXG4gICAgICAgIENSUzJKOiA2NDkxOTIwLFxyXG4gICAgICAgIENSUzJKRjogNjQ5MTkyMyxcclxuICAgICAgICBDUlMzSkY6IDY0OTIxNzksXHJcbiAgICAgICAgQ1JTSjogNjQ4ODU5MixcclxuICAgICAgICBDUlNKRjogNjQ4ODU5NSxcclxuICAgICAgICBDUlNKTjogNjQ4ODU5NCxcclxuICAgICAgICBIRUlGTDogODQ1MzkwMyxcclxuICAgICAgICBIRUlGTEY6IDg2NTA1MTEsXHJcbiAgICAgICAgSEVJRkxOOiA4NTg0OTc1LFxyXG4gICAgICAgIEhFSUZNRjogMjU0Mjc3MjcsXHJcbiAgICAgICAgSEVJRk1OOiAyNTM2MjE5MSxcclxuICAgICAgICBIRUlGUzFGOiAyNDM1MzE1MzUsXHJcbiAgICAgICAgSEVJRlMxTjogMjQzNDY1OTk5LFxyXG4gICAgICAgIEhFSUZTMkY6IDI2MDMwODc1MSxcclxuICAgICAgICBMYXJnZUpQRUc6IDExMTM4NzEsXHJcbiAgICAgICAgTGFyZ2VKUEVHRmluZTogMTMxMDQ3OSxcclxuICAgICAgICBMYXJnZUpQRUdOb3JtYWw6IDEyNDQ5NDMsXHJcbiAgICAgICAgTWlkZGxlMUpQRUc6IDg0OTk5OTUxLFxyXG4gICAgICAgIE1pZGRsZTJKUEVHOiAxMDE3NzcxNjcsXHJcbiAgICAgICAgTWlkZGxlSlBFRzogMTc4OTEwODcsXHJcbiAgICAgICAgTWlkZGxlSlBFR0ZpbmU6IDE4MDg3Njk1LFxyXG4gICAgICAgIE1pZGRsZUpQRUdOb3JtYWw6IDE4MDIyMTU5LFxyXG4gICAgICAgIE1SOiAyMzM5NjExMSxcclxuICAgICAgICBNUkxKOiAyMzMzMDgzMixcclxuICAgICAgICBNUkxKRjogMjMzMzA4MzUsXHJcbiAgICAgICAgTVJMSk46IDIzMzMwODM0LFxyXG4gICAgICAgIE1STTFKOiAyMzMzMjExMixcclxuICAgICAgICBNUk0ySjogMjMzMzIzNjgsXHJcbiAgICAgICAgTVJNSkY6IDIzMzMxMDkxLFxyXG4gICAgICAgIE1STUpOOiAyMzMzMTA5MCxcclxuICAgICAgICBNUlMxSkY6IDIzMzM0NDE5LFxyXG4gICAgICAgIE1SUzFKTjogMjMzMzQ0MTgsXHJcbiAgICAgICAgTVJTMkpGOiAyMzMzNDY3NSxcclxuICAgICAgICBNUlMzSkY6IDIzMzM0OTMxLFxyXG4gICAgICAgIE1SU0o6IDIzMzMxMzQ0LFxyXG4gICAgICAgIE1SU0pGOiAyMzMzMTM0NyxcclxuICAgICAgICBNUlNKTjogMjMzMzEzNDYsXHJcbiAgICAgICAgUkFXOiA2NjE4ODk1LFxyXG4gICAgICAgIFJBV0FuZExhcmdlSlBFRzogNjU1MzYxNixcclxuICAgICAgICBSQVdBbmRMYXJnZUpQRUdGaW5lOiA2NTUzNjE5LFxyXG4gICAgICAgIFJBV0FuZExhcmdlSlBFR05vcm1hbDogNjU1MzYxOCxcclxuICAgICAgICBSQVdBbmRNaWRkbGUxSlBFRzogNjU1NDg5NixcclxuICAgICAgICBSQVdBbmRNaWRkbGUySlBFRzogNjU1NTE1MixcclxuICAgICAgICBSQVdBbmRNaWRkbGVKUEVHOiA2NTUzODcyLFxyXG4gICAgICAgIFJBV0FuZE1pZGRsZUpQRUdGaW5lOiA2NTUzODc1LFxyXG4gICAgICAgIFJBV0FuZE1pZGRsZUpQRUdOb3JtYWw6IDY1NTM4NzQsXHJcbiAgICAgICAgUkFXQW5kU21hbGwxSlBFRzogNjU1NzIwMCxcclxuICAgICAgICBSQVdBbmRTbWFsbDFKUEVHRmluZTogNjU1NzIwMyxcclxuICAgICAgICBSQVdBbmRTbWFsbDFKUEVHTm9ybWFsOiA2NTU3MjAyLFxyXG4gICAgICAgIFJBV0FuZFNtYWxsMkpQRUc6IDY1NTc0NTYsXHJcbiAgICAgICAgUkFXQW5kU21hbGwySlBFR0ZpbmU6IDY1NTc0NTksXHJcbiAgICAgICAgUkFXQW5kU21hbGwzSlBFR0ZpbmU6IDY1NTc3MTUsXHJcbiAgICAgICAgUkFXQW5kU21hbGxKUEVHOiA2NTU0MTI4LFxyXG4gICAgICAgIFJBV0FuZFNtYWxsSlBFR0ZpbmU6IDY1NTQxMzEsXHJcbiAgICAgICAgUkFXQW5kU21hbGxKUEVHTm9ybWFsOiA2NTU0MTMwLFxyXG4gICAgICAgIFJIRUlGTDogNjU1MzcyOCxcclxuICAgICAgICBSSEVJRkxGOiA2NTUzNzMxLFxyXG4gICAgICAgIFJIRUlGTE46IDY1NTM3MzAsXHJcbiAgICAgICAgUkhFSUZNRjogNjU1Mzk4NyxcclxuICAgICAgICBSSEVJRk1OOiA2NTUzOTg2LFxyXG4gICAgICAgIFJIRUlGUzFGOiA2NTU3MzE1LFxyXG4gICAgICAgIFJIRUlGUzFOOiA2NTU3MzE0LFxyXG4gICAgICAgIFJIRUlGUzJGOiA2NTU3NTcxLFxyXG4gICAgICAgIFNtYWxsMUpQRUdGaW5lOiAyMzYxOTE1MDMsXHJcbiAgICAgICAgU21hbGwxSlBFR05vcm1hbDogMjM2MTI1OTY3LFxyXG4gICAgICAgIFNtYWxsMkpQRUdGaW5lOiAyNTI5Njg3MTksXHJcbiAgICAgICAgU21hbGwzSlBFR0ZpbmU6IDI2OTc0NTkzNSxcclxuICAgICAgICBTbWFsbEpQRUc6IDM0NjY4MzAzLFxyXG4gICAgICAgIFNtYWxsSlBFRzE6IDIzNTk5NDg5NSxcclxuICAgICAgICBTbWFsbEpQRUcyOiAyNTI3NzIxMTEsXHJcbiAgICAgICAgU21hbGxKUEVHRmluZTogMzQ4NjQ5MTEsXHJcbiAgICAgICAgU21hbGxKUEVHTm9ybWFsOiAzNDc5OTM3NSxcclxuICAgICAgICBTUjogNDAxNzMzMjcsXHJcbiAgICAgICAgU1JMSjogNDAxMDgwNDgsXHJcbiAgICAgICAgU1JMSkY6IDQwMTA4MDUxLFxyXG4gICAgICAgIFNSTEpOOiA0MDEwODA1MCxcclxuICAgICAgICBTUk0xSjogNDAxMDkzMjgsXHJcbiAgICAgICAgU1JNMko6IDQwMTA5NTg0LFxyXG4gICAgICAgIFNSTUpGOiA0MDEwODMwNyxcclxuICAgICAgICBTUk1KTjogNDAxMDgzMDYsXHJcbiAgICAgICAgU1JTMUpGOiA0MDExMTYzNSxcclxuICAgICAgICBTUlMxSk46IDQwMTExNjM0LFxyXG4gICAgICAgIFNSUzJKRjogNDAxMTE4OTEsXHJcbiAgICAgICAgU1JTM0pGOiA0MDExMjE0NyxcclxuICAgICAgICBTUlNKOiA0MDEwODU2MCxcclxuICAgICAgICBTUlNKRjogNDAxMDg1NjMsXHJcbiAgICAgICAgU1JTSk46IDQwMTA4NTYyLFxyXG4gICAgICAgIFVua25vd246IDQyOTQ5NjcyOTUsXHJcbiAgICB9O1xyXG4gICAgSW1hZ2VRdWFsaXR5LkZvcm1hdCA9IHtcclxuICAgICAgICBDUjI6IDYsXHJcbiAgICAgICAgQ1JXOiAyLFxyXG4gICAgICAgIEhFSUY6IDgsXHJcbiAgICAgICAgSlBFRzogMSxcclxuICAgICAgICBSQVc6IDQsXHJcbiAgICAgICAgVW5rbm93bjogMCxcclxuICAgIH07XHJcbiAgICBJbWFnZVF1YWxpdHkuU2l6ZSA9IHtcclxuICAgICAgICBMYXJnZTogMCxcclxuICAgICAgICBNaWRkbGU6IDEsXHJcbiAgICAgICAgTWlkZGxlMTogNSxcclxuICAgICAgICBNaWRkbGUyOiA2LFxyXG4gICAgICAgIFNtYWxsOiAyLFxyXG4gICAgICAgIFNtYWxsMTogMTQsXHJcbiAgICAgICAgU21hbGwyOiAxNSxcclxuICAgICAgICBTbWFsbDM6IDE2LFxyXG4gICAgICAgIFVua25vd246IDQyOTQ5NjcyOTUsXHJcbiAgICB9O1xyXG4gICAgSW1hZ2VRdWFsaXR5LkNvbXByZXNzaW9uUXVhbGl0eSA9IHtcclxuICAgICAgICBGaW5lOiAzLFxyXG4gICAgICAgIExvc3NsZXNzOiA0LFxyXG4gICAgICAgIE5vcm1hbDogMixcclxuICAgICAgICBTdXBlckZpbmU6IDUsXHJcbiAgICAgICAgVW5rbm93bjogNDI5NDk2NzI5NSxcclxuICAgIH07XHJcbiAgICByZXR1cm4gSW1hZ2VRdWFsaXR5O1xyXG59KCkpO1xyXG5leHBvcnQgeyBJbWFnZVF1YWxpdHkgfTtcclxuIiwidmFyIElTT1NlbnNpdGl2aXR5ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIElTT1NlbnNpdGl2aXR5KHZhbHVlXykge1xyXG4gICAgICAgIHRoaXMudmFsdWVfID0gdmFsdWVfO1xyXG4gICAgICAgIHRoaXNbX2FdID0gJ0lTT1NlbnNpdGl2aXR5JztcclxuICAgICAgICBpZiAodmFsdWVfID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfID0gJ0F1dG8nO1xyXG4gICAgICAgICAgICB0aGlzLnNlbnNpdGl2aXR5XyA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNlbnNpdGl2aXR5XyA9IElTT1NlbnNpdGl2aXR5LlZhbHVlc1t2YWx1ZV9dIHx8IDA7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfID0gdGhpcy5zZW5zaXRpdml0eV8udG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSVNPU2Vuc2l0aXZpdHkucHJvdG90eXBlLCBcImxhYmVsXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFiZWxfO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShJU09TZW5zaXRpdml0eS5wcm90b3R5cGUsIFwidmFsdWVcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZV87XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KElTT1NlbnNpdGl2aXR5LnByb3RvdHlwZSwgXCJzZW5zaXRpdml0eVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbnNpdGl2aXR5XztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBJU09TZW5zaXRpdml0eS5wcm90b3R5cGVbKF9hID0gU3ltYm9sLnRvU3RyaW5nVGFnLCBTeW1ib2wudG9QcmltaXRpdmUpXSA9IGZ1bmN0aW9uIChoaW50KSB7XHJcbiAgICAgICAgc3dpdGNoIChoaW50KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZV87XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sYWJlbF87XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgSVNPU2Vuc2l0aXZpdHkucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsYWJlbDogdGhpcy5sYWJlbCxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXHJcbiAgICAgICAgICAgIElTT1NlbnNpdGl2aXR5OiB0aGlzLnNlbnNpdGl2aXR5LFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgSVNPU2Vuc2l0aXZpdHkuZmluZE5lYXJlc3QgPSBmdW5jdGlvbiAodmFsdWVPckxhYmVsLCBmaWx0ZXIpIHtcclxuICAgICAgICB2YXIgc2Vuc2l0aXZpdHk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZU9yTGFiZWwgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHZhciBpc28gPSBJU09TZW5zaXRpdml0eS5mb3JMYWJlbCh2YWx1ZU9yTGFiZWwpO1xyXG4gICAgICAgICAgICBpZiAoIWlzbykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2Vuc2l0aXZpdHkgPSBpc28uc2Vuc2l0aXZpdHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzZW5zaXRpdml0eSA9IG5ldyBJU09TZW5zaXRpdml0eSh2YWx1ZU9yTGFiZWwpLnNlbnNpdGl2aXR5O1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZm91bmQgPSBPYmplY3Qua2V5cyhJU09TZW5zaXRpdml0eS5WYWx1ZXMpLnJlZHVjZShmdW5jdGlvbiAoY2FycnksIGtleSkge1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudCA9IElTT1NlbnNpdGl2aXR5LlZhbHVlc1trZXldO1xyXG4gICAgICAgICAgICB2YXIgZGlmZmVyZW5jZSA9IE1hdGguYWJzKGN1cnJlbnQgLSBzZW5zaXRpdml0eSk7XHJcbiAgICAgICAgICAgIGlmICghY2FycnkgfHwgZGlmZmVyZW5jZSA8IGNhcnJ5LmRpZmZlcmVuY2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIgJiYgIWZpbHRlcihuZXcgSVNPU2Vuc2l0aXZpdHkoK2tleSkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcnJ5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogK2tleSxcclxuICAgICAgICAgICAgICAgICAgICBkaWZmZXJlbmNlOiBkaWZmZXJlbmNlLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY2Fycnk7XHJcbiAgICAgICAgfSwgbnVsbCk7XHJcbiAgICAgICAgaWYgKGZvdW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgSVNPU2Vuc2l0aXZpdHkoZm91bmQudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH07XHJcbiAgICBJU09TZW5zaXRpdml0eS5mb3JMYWJlbCA9IGZ1bmN0aW9uIChsYWJlbCkge1xyXG4gICAgICAgIGlmIChsYWJlbCBpbiBJU09TZW5zaXRpdml0eS5JRCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IElTT1NlbnNpdGl2aXR5KElTT1NlbnNpdGl2aXR5LklEW2xhYmVsXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB2YWx1ZSA9IE9iamVjdC5rZXlzKElTT1NlbnNpdGl2aXR5LlZhbHVlcykuZmluZChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBJU09TZW5zaXRpdml0eS5WYWx1ZXNba2V5XSA9PT0gK2xhYmVsOyB9KTtcclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBJU09TZW5zaXRpdml0eSgrdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH07XHJcbiAgICB2YXIgX2E7XHJcbiAgICBJU09TZW5zaXRpdml0eS5JRCA9IHtcclxuICAgICAgICBBdXRvOiAwLFxyXG4gICAgfTtcclxuICAgIElTT1NlbnNpdGl2aXR5LlZhbHVlcyA9IHtcclxuICAgICAgICAnNDAnOiA2LFxyXG4gICAgICAgICc0OCc6IDEyLFxyXG4gICAgICAgICc1Nic6IDI1LFxyXG4gICAgICAgICc2NCc6IDUwLFxyXG4gICAgICAgICc3Mic6IDEwMCxcclxuICAgICAgICAnNzUnOiAxMjUsXHJcbiAgICAgICAgJzc3JzogMTYwLFxyXG4gICAgICAgICc4MCc6IDIwMCxcclxuICAgICAgICAnODMnOiAyNTAsXHJcbiAgICAgICAgJzg1JzogMzIwLFxyXG4gICAgICAgICc4OCc6IDQwMCxcclxuICAgICAgICAnOTEnOiA1MDAsXHJcbiAgICAgICAgJzkzJzogNjQwLFxyXG4gICAgICAgICc5Nic6IDgwMCxcclxuICAgICAgICAnOTknOiAxMDAwLFxyXG4gICAgICAgICcxMDEnOiAxMjUwLFxyXG4gICAgICAgICcxMDQnOiAxNjAwLFxyXG4gICAgICAgICcxMDcnOiAyMDAwLFxyXG4gICAgICAgICcxMDknOiAyNTAwLFxyXG4gICAgICAgICcxMTInOiAzMjAwLFxyXG4gICAgICAgICcxMTUnOiA0MDAwLFxyXG4gICAgICAgICcxMTcnOiA1MDAwLFxyXG4gICAgICAgICcxMjAnOiA2NDAwLFxyXG4gICAgICAgICcxMjMnOiA4MDAwLFxyXG4gICAgICAgICcxMjUnOiAxMDAwMCxcclxuICAgICAgICAnMTI4JzogMTI4MDAsXHJcbiAgICAgICAgJzEzMSc6IDE2MDAwLFxyXG4gICAgICAgICcxMzMnOiAyMDAwMCxcclxuICAgICAgICAnMTM2JzogMjU2MDAsXHJcbiAgICAgICAgJzEzOSc6IDMyMDAwLFxyXG4gICAgICAgICcxNDEnOiA0MDAwMCxcclxuICAgICAgICAnMTQ0JzogNTEyMDAsXHJcbiAgICAgICAgJzE0Nyc6IDY0MDAwLFxyXG4gICAgICAgICcxNDknOiA4MDAwMCxcclxuICAgICAgICAnMTUyJzogMTAyNDAwLFxyXG4gICAgICAgICcxNjAnOiAyMDQ4MDAsXHJcbiAgICAgICAgJzE2OCc6IDQwOTYwMCxcclxuICAgICAgICAnMTc2JzogODE5MjAwLFxyXG4gICAgfTtcclxuICAgIHJldHVybiBJU09TZW5zaXRpdml0eTtcclxufSgpKTtcclxuZXhwb3J0IHsgSVNPU2Vuc2l0aXZpdHkgfTtcclxuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbmltcG9ydCB7IEFwaUlkZW50aWZpZXIgfSBmcm9tICcuL0FwaUlkZW50aWZpZXInO1xyXG52YXIgT2JqZWN0RXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKE9iamVjdEV2ZW50LCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gT2JqZWN0RXZlbnQoaWRlbnRpZmllcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGlkZW50aWZpZXIsIE9iamVjdEV2ZW50LklEKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzW19hXSA9ICdPYmplY3RFdmVudCc7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0RXZlbnQucHJvdG90eXBlLmVxdWFsVG8gPSBmdW5jdGlvbiAob3RoZXIpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5lcXVhbFRvLmNhbGwodGhpcywgK290aGVyKTtcclxuICAgIH07XHJcbiAgICB2YXIgX2E7XHJcbiAgICBfYSA9IFN5bWJvbC50b1N0cmluZ1RhZztcclxuICAgIE9iamVjdEV2ZW50LklEID0ge1xyXG4gICAgICAgIEFsbDogNTEyLFxyXG4gICAgICAgIERpckl0ZW1DYW5jZWxUcmFuc2ZlckRUOiA1MjIsXHJcbiAgICAgICAgRGlySXRlbUNvbnRlbnRDaGFuZ2VkOiA1MTksXHJcbiAgICAgICAgRGlySXRlbUNyZWF0ZWQ6IDUxNixcclxuICAgICAgICBEaXJJdGVtSW5mb0NoYW5nZWQ6IDUxOCxcclxuICAgICAgICBEaXJJdGVtUmVtb3ZlZDogNTE3LFxyXG4gICAgICAgIERpckl0ZW1SZXF1ZXN0VHJhbnNmZXI6IDUyMCxcclxuICAgICAgICBEaXJJdGVtUmVxdWVzdFRyYW5zZmVyRFQ6IDUyMSxcclxuICAgICAgICBGb2xkZXJVcGRhdGVJdGVtczogNTE1LFxyXG4gICAgICAgIFZvbHVtZUFkZGVkOiA1MjQsXHJcbiAgICAgICAgVm9sdW1lSW5mb0NoYW5nZWQ6IDUxMyxcclxuICAgICAgICBWb2x1bWVSZW1vdmVkOiA1MjUsXHJcbiAgICAgICAgVm9sdW1lVXBkYXRlSXRlbXM6IDUxNCxcclxuICAgIH07XHJcbiAgICByZXR1cm4gT2JqZWN0RXZlbnQ7XHJcbn0oQXBpSWRlbnRpZmllcikpO1xyXG5leHBvcnQgeyBPYmplY3RFdmVudCB9O1xyXG4iLCJpbXBvcnQgeyBDYW1lcmFQcm9wZXJ0eSB9IGZyb20gJy4vQ2FtZXJhUHJvcGVydHknO1xyXG52YXIgT3B0aW9uID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE9wdGlvbihwcm9wZXJ0eUlEXywgdmFsdWVfKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0eUlEXyA9IHByb3BlcnR5SURfO1xyXG4gICAgICAgIHRoaXMudmFsdWVfID0gdmFsdWVfO1xyXG4gICAgICAgIHRoaXNbX2FdID0gJ09wdGlvbic7XHJcbiAgICAgICAgdGhpcy5sYWJlbF8gPSBcIjB4XCIuY29uY2F0KHZhbHVlXy50b1N0cmluZygxNikucGFkU3RhcnQoOCwgJzAnKSk7XHJcbiAgICAgICAgdmFyIHByb3BlcnR5TGFiZWwgPSBPYmplY3Qua2V5cyhDYW1lcmFQcm9wZXJ0eS5JRCkuZmluZChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBDYW1lcmFQcm9wZXJ0eS5JRFtrZXldID09PSBwcm9wZXJ0eUlEXzsgfSk7XHJcbiAgICAgICAgaWYgKHByb3BlcnR5TGFiZWwgJiYgcHJvcGVydHlMYWJlbCBpbiBPcHRpb24pIHtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbkxhYmVsc18xID0gT3B0aW9uW3Byb3BlcnR5TGFiZWxdO1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9uTGFiZWwgPSBPYmplY3Qua2V5cyhvcHRpb25MYWJlbHNfMSkuZmluZChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBvcHRpb25MYWJlbHNfMVtrZXldID09PSB2YWx1ZV87IH0pO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9uTGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFiZWxfID0gcHJvcGVydHlMYWJlbCArICcuJyArIG9wdGlvbkxhYmVsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9wdGlvbi5wcm90b3R5cGUsIFwibGFiZWxcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYWJlbF87XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9wdGlvbi5wcm90b3R5cGUsIFwidmFsdWVcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZV87XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9wdGlvbi5wcm90b3R5cGUsIFwicHJvcGVydHlJRFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BlcnR5SURfO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9wdGlvbi5wcm90b3R5cGVbKF9hID0gU3ltYm9sLnRvU3RyaW5nVGFnLCBTeW1ib2wudG9QcmltaXRpdmUpXSA9IGZ1bmN0aW9uIChoaW50KSB7XHJcbiAgICAgICAgc3dpdGNoIChoaW50KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZV87XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sYWJlbF87XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgT3B0aW9uLmZvckxhYmVsID0gZnVuY3Rpb24gKGxhYmVsKSB7XHJcbiAgICAgICAgdmFyIF9iID0gbGFiZWwuc3BsaXQoJy4nLCAyKSwgcHJvcGVydHlMYWJlbCA9IF9iWzBdLCBvcHRpb25MYWJlbCA9IF9iWzFdO1xyXG4gICAgICAgIHZhciBwcm9wZXJ0eUlEID0gQ2FtZXJhUHJvcGVydHkuSURbcHJvcGVydHlMYWJlbF0gfHwgbnVsbDtcclxuICAgICAgICBpZiAocHJvcGVydHlJRCAmJlxyXG4gICAgICAgICAgICBwcm9wZXJ0eUxhYmVsIGluIE9wdGlvbiAmJlxyXG4gICAgICAgICAgICBvcHRpb25MYWJlbCBpbiBPcHRpb25bcHJvcGVydHlMYWJlbF0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBPcHRpb24ocHJvcGVydHlJRCwgT3B0aW9uW3Byb3BlcnR5TGFiZWxdW29wdGlvbkxhYmVsXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfTtcclxuICAgIHZhciBfYTtcclxuICAgIE9wdGlvbi5BRU1vZGUgPSB7XHJcbiAgICAgICAgQV9ERVA6IDUsXHJcbiAgICAgICAgQXY6IDIsXHJcbiAgICAgICAgQmFja2dyb3VuZEJsdXI6IDYyLFxyXG4gICAgICAgIEJhY2tsaXRTY2VuZXM6IDI0LFxyXG4gICAgICAgIEJ1bGI6IDQsXHJcbiAgICAgICAgQ2FuZGxlbGlnaHRQb3J0cmFpdHM6IDI4LFxyXG4gICAgICAgIENoaWxkcmVuOiAyNixcclxuICAgICAgICBDbG9zZXVwOiAxNCxcclxuICAgICAgICBDcmVhdGl2ZUF1dG86IDE5LFxyXG4gICAgICAgIENyZWF0aXZlRmlsdGVyOiAyOSxcclxuICAgICAgICBDdXN0b206IDcsXHJcbiAgICAgICAgREVQOiA2LFxyXG4gICAgICAgIEZpcmV3b3JrczogNTcsXHJcbiAgICAgICAgRmlzaGV5ZTogMzMsXHJcbiAgICAgICAgRmxhc2hPZmY6IDE1LFxyXG4gICAgICAgIEZsZXhpYmxlOiA1NSxcclxuICAgICAgICBGb29kOiAyNyxcclxuICAgICAgICBHcmVlbjogOSxcclxuICAgICAgICBHcm91cFBob3RvOiA0NixcclxuICAgICAgICBIZHJfQm9sZDogMzgsXHJcbiAgICAgICAgSGRyX0VtYm9zc2VkOiAzOSxcclxuICAgICAgICBIZHJfU3RhbmRhcmQ6IDM2LFxyXG4gICAgICAgIEhkcl9WaXZpZDogMzcsXHJcbiAgICAgICAgTGFuZHNjYXBlOiAxMyxcclxuICAgICAgICBMb2NrOiA4LFxyXG4gICAgICAgIE1hbnVhbDogMyxcclxuICAgICAgICBNaW5pYXR1cmU6IDM1LFxyXG4gICAgICAgIE1vdmllOiAyMCxcclxuICAgICAgICBNb3ZpZV9EaXJlY3RNb25vOiA0MyxcclxuICAgICAgICBNb3ZpZV9GYW50YXN5OiA0MCxcclxuICAgICAgICBNb3ZpZV9NZW1vcnk6IDQyLFxyXG4gICAgICAgIE1vdmllX01pbmk6IDQ0LFxyXG4gICAgICAgIE1vdmllX09sZDogNDEsXHJcbiAgICAgICAgTXlzZWxmOiA1MCxcclxuICAgICAgICBOaWdodFBvcnRyYWl0OiAxMCxcclxuICAgICAgICBOaWdodFNjZW5lczogMjMsXHJcbiAgICAgICAgT2lsUGFpbnRpbmc6IDU2LFxyXG4gICAgICAgIFBhbm5pbmdBc3Npc3Q6IDQ1LFxyXG4gICAgICAgIFBhbm9yYW1hOiA1MyxcclxuICAgICAgICBQaG90b0luTW92aWU6IDIxLFxyXG4gICAgICAgIFBsdXNNb3ZpZUF1dG86IDUxLFxyXG4gICAgICAgIFBvcnRyYWl0OiAxMixcclxuICAgICAgICBQcm9ncmFtQUU6IDAsXHJcbiAgICAgICAgUm91Z2hNb25vQ2hyb21lOiAzMCxcclxuICAgICAgICBTY2VuZUludGVsbGlnZW50QXV0bzogMjIsXHJcbiAgICAgICAgU0NOOiAyNSxcclxuICAgICAgICBTaWxlbnQ6IDU0LFxyXG4gICAgICAgIFNtb290aFNraW46IDUyLFxyXG4gICAgICAgIFNvZnRGb2N1czogMzEsXHJcbiAgICAgICAgU3BvcnRzOiAxMSxcclxuICAgICAgICBTdGFyTmlnaHRTY2FwZTogNTksXHJcbiAgICAgICAgU3RhclBvcnRyYWl0OiA1OCxcclxuICAgICAgICBTdGFyVGltZWxhcHNlTW92aWU6IDYxLFxyXG4gICAgICAgIFN0YXJUcmFpbHM6IDYwLFxyXG4gICAgICAgIFRveUNhbWVyYTogMzIsXHJcbiAgICAgICAgVHY6IDEsXHJcbiAgICAgICAgVW5rbm93bjogNDI5NDk2NzI5NSxcclxuICAgICAgICBWaWRlb0Jsb2c6IDYzLFxyXG4gICAgICAgIFdhdGVyQ29sb3I6IDM0LFxyXG4gICAgfTtcclxuICAgIE9wdGlvbi5BRU1vZGVTZWxlY3QgPSB7XHJcbiAgICAgICAgQV9ERVA6IDUsXHJcbiAgICAgICAgQXY6IDIsXHJcbiAgICAgICAgQmFja2dyb3VuZEJsdXI6IDYyLFxyXG4gICAgICAgIEJhY2tsaXRTY2VuZXM6IDI0LFxyXG4gICAgICAgIEJ1bGI6IDQsXHJcbiAgICAgICAgQ2FuZGxlbGlnaHRQb3J0cmFpdHM6IDI4LFxyXG4gICAgICAgIENoaWxkcmVuOiAyNixcclxuICAgICAgICBDbG9zZXVwOiAxNCxcclxuICAgICAgICBDcmVhdGl2ZUF1dG86IDE5LFxyXG4gICAgICAgIENyZWF0aXZlRmlsdGVyOiAyOSxcclxuICAgICAgICBDdXN0b206IDcsXHJcbiAgICAgICAgQ3VzdG9tMjogMTYsXHJcbiAgICAgICAgQ3VzdG9tMzogMTcsXHJcbiAgICAgICAgREVQOiA2LFxyXG4gICAgICAgIEZpcmV3b3JrczogNTcsXHJcbiAgICAgICAgRmlzaGV5ZTogMzMsXHJcbiAgICAgICAgRmxhc2hPZmY6IDE1LFxyXG4gICAgICAgIEZsZXhpYmxlOiA1NSxcclxuICAgICAgICBGb29kOiAyNyxcclxuICAgICAgICBHcmVlbjogOSxcclxuICAgICAgICBHcm91cFBob3RvOiA0NixcclxuICAgICAgICBIZHJfQm9sZDogMzgsXHJcbiAgICAgICAgSGRyX0VtYm9zc2VkOiAzOSxcclxuICAgICAgICBIZHJfU3RhbmRhcmQ6IDM2LFxyXG4gICAgICAgIEhkcl9WaXZpZDogMzcsXHJcbiAgICAgICAgTGFuZHNjYXBlOiAxMyxcclxuICAgICAgICBMb2NrOiA4LFxyXG4gICAgICAgIE1hbnVhbDogMyxcclxuICAgICAgICBNaW5pYXR1cmU6IDM1LFxyXG4gICAgICAgIE1vdmllOiAyMCxcclxuICAgICAgICBNb3ZpZV9EaXJlY3RNb25vOiA0MyxcclxuICAgICAgICBNb3ZpZV9GYW50YXN5OiA0MCxcclxuICAgICAgICBNb3ZpZV9NZW1vcnk6IDQyLFxyXG4gICAgICAgIE1vdmllX01pbmk6IDQ0LFxyXG4gICAgICAgIE1vdmllX09sZDogNDEsXHJcbiAgICAgICAgTXlzZWxmOiA1MCxcclxuICAgICAgICBOaWdodFBvcnRyYWl0OiAxMCxcclxuICAgICAgICBOaWdodFNjZW5lczogMjMsXHJcbiAgICAgICAgT2lsUGFpbnRpbmc6IDU2LFxyXG4gICAgICAgIFBhbm5pbmdBc3Npc3Q6IDQ1LFxyXG4gICAgICAgIFBhbm9yYW1hOiA1MyxcclxuICAgICAgICBQaG90b0luTW92aWU6IDIxLFxyXG4gICAgICAgIFBsdXNNb3ZpZUF1dG86IDUxLFxyXG4gICAgICAgIFBvcnRyYWl0OiAxMixcclxuICAgICAgICBQcm9ncmFtQUU6IDAsXHJcbiAgICAgICAgUm91Z2hNb25vQ2hyb21lOiAzMCxcclxuICAgICAgICBTY2VuZUludGVsbGlnZW50QXV0bzogMjIsXHJcbiAgICAgICAgU0NOOiAyNSxcclxuICAgICAgICBTaWxlbnQ6IDU0LFxyXG4gICAgICAgIFNtb290aFNraW46IDUyLFxyXG4gICAgICAgIFNvZnRGb2N1czogMzEsXHJcbiAgICAgICAgU3BvcnRzOiAxMSxcclxuICAgICAgICBTdGFyTmlnaHRTY2FwZTogNTksXHJcbiAgICAgICAgU3RhclBvcnRyYWl0OiA1OCxcclxuICAgICAgICBTdGFyVGltZWxhcHNlTW92aWU6IDYxLFxyXG4gICAgICAgIFN0YXJUcmFpbHM6IDYwLFxyXG4gICAgICAgIFRveUNhbWVyYTogMzIsXHJcbiAgICAgICAgVHY6IDEsXHJcbiAgICAgICAgVW5rbm93bjogNDI5NDk2NzI5NSxcclxuICAgICAgICBXYXRlckNvbG9yOiAzNCxcclxuICAgIH07XHJcbiAgICBPcHRpb24uQUZNb2RlID0ge1xyXG4gICAgICAgIEFJRm9jdXM6IDIsXHJcbiAgICAgICAgQUlTZXJ2bzogMSxcclxuICAgICAgICBNYW51YWxGb2N1czogMyxcclxuICAgICAgICBOb3RWYWxpZDogNDI5NDk2NzI5NSxcclxuICAgICAgICBPbmVTaG90OiAwLFxyXG4gICAgfTtcclxuICAgIE9wdGlvbi5CYXR0ZXJ5UXVhbGl0eSA9IHtcclxuICAgICAgICBGdWxsOiAzLFxyXG4gICAgICAgIEhhbGY6IDEsXHJcbiAgICAgICAgSGlnaDogMixcclxuICAgICAgICBMb3c6IDAsXHJcbiAgICB9O1xyXG4gICAgT3B0aW9uLkJyYWNrZXQgPSB7XHJcbiAgICAgICAgQUVCcmFja2V0OiAxLFxyXG4gICAgICAgIEJyYWNrZXRPZmY6IDQyOTQ5NjcyOTUsXHJcbiAgICAgICAgRkVCcmFja2V0OiA4LFxyXG4gICAgICAgIElTT0JyYWNrZXQ6IDIsXHJcbiAgICAgICAgV0JCcmFja2V0OiA0LFxyXG4gICAgfTtcclxuICAgIE9wdGlvbi5Db2xvclNwYWNlID0ge1xyXG4gICAgICAgIEFkb2JlUkdCOiAyLFxyXG4gICAgICAgIHNSR0I6IDEsXHJcbiAgICAgICAgVW5rbm93bjogNDI5NDk2NzI5NSxcclxuICAgIH07XHJcbiAgICBPcHRpb24uRENTdHJvYmUgPSB7XHJcbiAgICAgICAgQXV0bzogMCxcclxuICAgICAgICBPZmY6IDMsXHJcbiAgICAgICAgT246IDEsXHJcbiAgICAgICAgU2xvd1N5bmNocm86IDIsXHJcbiAgICB9O1xyXG4gICAgT3B0aW9uLkRyaXZlTW9kZSA9IHtcclxuICAgICAgICBDb250aW51b3VzU2hvb3Rpbmc6IDEsXHJcbiAgICAgICAgSGlnaFNwZWVkQ29udGludW91czogNCxcclxuICAgICAgICBMb3dTcGVlZENvbnRpbnVvdXM6IDUsXHJcbiAgICAgICAgU2VsZlRpbWVyMnNlYzogMTcsXHJcbiAgICAgICAgU2VsZlRpbWVyMTBzZWM6IDE2LFxyXG4gICAgICAgIFNlbGZUaW1lckNvbnRpbnVvdXM6IDcsXHJcbiAgICAgICAgU2lsZW50Q29udGludW91c1Nob290aW5nOiAyMCxcclxuICAgICAgICBTaWxlbnRIU0NvbnRpbnVvdXM6IDIxLFxyXG4gICAgICAgIFNpbGVudExTQ29udGludW91czogMjIsXHJcbiAgICAgICAgU2lsZW50U2luZ2xlU2hvb3Rpbmc6IDE5LFxyXG4gICAgICAgIFNpbmdsZVNob290aW5nOiAwLFxyXG4gICAgICAgIFNpbmdsZVNpbGVudFNob290aW5nOiA2LFxyXG4gICAgICAgIFN1cGVySGlnaFNwZWVkMTRmcHM6IDE4LFxyXG4gICAgICAgIFZpZGVvOiAyLFxyXG4gICAgfTtcclxuICAgIE9wdGlvbi5FdmZBRk1vZGUgPSB7XHJcbiAgICAgICAgRXhwYW5kQUZBcmVhQXJvdW5kOiA2LFxyXG4gICAgICAgIEV4cGFuZEFGQXJlYUNyb3NzOiA1LFxyXG4gICAgICAgIEZhY2VUcmFja2luZzogMixcclxuICAgICAgICBGbGV4aVpvbmVNdWx0aTogMyxcclxuICAgICAgICBMYXJnZVpvbmVBRkhvcml6b250YWw6IDcsXHJcbiAgICAgICAgTGFyZ2Vab25lQUZWZXJ0aWNhbDogOCxcclxuICAgICAgICBPbmVQb2ludEFGOiAxLFxyXG4gICAgICAgIFF1aWNrOiAwLFxyXG4gICAgICAgIFNwb3RBRjogMTAsXHJcbiAgICAgICAgVHJhY2tpbmdBRjogOSxcclxuICAgICAgICBab25lQUY6IDQsXHJcbiAgICB9O1xyXG4gICAgT3B0aW9uLkV2Zkhpc3RvZ3JhbVN0YXR1cyA9IHtcclxuICAgICAgICBHcmF5b3V0OiAyLFxyXG4gICAgICAgIEhpZGU6IDAsXHJcbiAgICAgICAgTm9ybWFsOiAxLFxyXG4gICAgfTtcclxuICAgIE9wdGlvbi5FdmZPdXRwdXREZXZpY2UgPSB7XHJcbiAgICAgICAgTm9uZTogMCxcclxuICAgICAgICBQQzogMixcclxuICAgICAgICBTbWFsbFBDOiA4LFxyXG4gICAgICAgIFRGVDogMSxcclxuICAgIH07XHJcbiAgICBPcHRpb24uRXZmWm9vbSA9IHtcclxuICAgICAgICBGaXQ6IDEsXHJcbiAgICAgICAgeDU6IDUsXHJcbiAgICAgICAgeDEwOiAxMCxcclxuICAgIH07XHJcbiAgICBPcHRpb24uTGVuc0JhcnJlbFN0YXR1cyA9IHtcclxuICAgICAgICBJbm5lcjogMCxcclxuICAgICAgICBPdXRlcjogMSxcclxuICAgIH07XHJcbiAgICBPcHRpb24uTGVuc1N0YXR1cyA9IHtcclxuICAgICAgICBBdHRhY2hlZDogMSxcclxuICAgICAgICBOb3RBdHRhY2hlZDogMCxcclxuICAgIH07XHJcbiAgICBPcHRpb24uTWV0ZXJpbmdNb2RlID0ge1xyXG4gICAgICAgIENlbnRlcldlaWdodGVkQXZlcmFnZTogNSxcclxuICAgICAgICBFdmFsdWF0aXZlOiAzLFxyXG4gICAgICAgIE5vdFZhbGlkOiA0Mjk0OTY3Mjk1LFxyXG4gICAgICAgIFBhcnRpYWw6IDQsXHJcbiAgICAgICAgU3BvdDogMSxcclxuICAgIH07XHJcbiAgICBPcHRpb24uTWlycm9yVXBTdGF0dXMgPSB7XHJcbiAgICAgICAgRGlzYWJsZTogMCxcclxuICAgICAgICBEdXJpbmdTaG9vdGluZzogMixcclxuICAgICAgICBFbmFibGU6IDEsXHJcbiAgICB9O1xyXG4gICAgT3B0aW9uLk1vdmllUXVhbGl0eSA9IHtcclxuICAgICAgICAnMjMuOThmcHMgKFJBVyknOiA2NjgyNzIsXHJcbiAgICAgICAgJzI0LjAwZnBzIChSQVcpJzogNjY4NTI4LFxyXG4gICAgICAgICcyNS4wMGZwcyAoUkFXKSc6IDY2ODc4NCxcclxuICAgICAgICAnMjkuOTdmcHMgKFJBVyknOiA2NjkwNDAsXHJcbiAgICAgICAgJzUwLjAwZnBzIChSQVcpJzogNjY5Mjk2LFxyXG4gICAgICAgICc1OS45NGZwcyAoUkFXKSc6IDY2OTU1MixcclxuICAgICAgICAnNjQweDQ4MCAyNS4wMGZwcyc6IDEzMjA5NixcclxuICAgICAgICAnNjQweDQ4MCAyOS45N2ZmcHMnOiAxMzIzNTIsXHJcbiAgICAgICAgJzEyODB4NzIwIDI1LjAwZnBzIFN0YW5kYXJkKElQQiknOiA3MDcwNCxcclxuICAgICAgICAnMTI4MHg3MjAgMjkuOTdmcHMgTGlnaHQoSVBCKSc6IDcwOTYxLFxyXG4gICAgICAgICcxMjgweDcyMCAyOS45N2ZwcyBTdGFuZGFyZChJUEIpJzogNzA5NjAsXHJcbiAgICAgICAgJzEyODB4NzIwIDUwLjAwZnBzJzogNjcwNzIsXHJcbiAgICAgICAgJzEyODB4NzIwIDUwLjAwZnBzIEZvciBlZGl0aW5nKEFMTC1JKSc6IDcxMTg0LFxyXG4gICAgICAgICcxMjgweDcyMCA1MC4wMGZwcyBTdGFuZGFyZChJUEIpJzogNzEyMTYsXHJcbiAgICAgICAgJzEyODB4NzIwIDU5Ljk0ZnBzJzogNjczMjgsXHJcbiAgICAgICAgJzEyODB4NzIwIDU5Ljk0ZnBzIEZvciBlZGl0aW5nKEFMTC1JKSc6IDcxNDQwLFxyXG4gICAgICAgICcxMjgweDcyMCA1OS45NGZwcyBTdGFuZGFyZChJUEIpJzogNzE0NzIsXHJcbiAgICAgICAgJzEyODB4NzIwIDEwMC4wZnBzIEZvciBlZGl0aW5nKEFMTC1JKSc6IDcxNjk2LFxyXG4gICAgICAgICcxMjgweDcyMCAxMDAuMGZwcyBTdGFuZGFyZChJUEIpJzogNzE3MjgsXHJcbiAgICAgICAgJzEyODB4NzIwIDExOS45ZnBzIEZvciBlZGl0aW5nKEFMTC1JKSc6IDcxOTUyLFxyXG4gICAgICAgICcxMjgweDcyMCAxMTkuOWZwcyBTdGFuZGFyZChJUEIpJzogNzE5ODQsXHJcbiAgICAgICAgJzE5MjB4MTA4MCAyMy45OGZwcyc6IDUxMixcclxuICAgICAgICAnMTkyMHgxMDgwIDIzLjk4ZnBzIEZvciBlZGl0aW5nKEFMTC1JKSc6IDQ2MjQsXHJcbiAgICAgICAgJzE5MjB4MTA4MCAyMy45OGZwcyBGb3IgZWRpdGluZyhBTEwtSSlDcm9wJzogMTM0MjIyMzUyLFxyXG4gICAgICAgICcxOTIweDEwODAgMjMuOThmcHMgU3RhbmRhcmQoSVBCKSc6IDQ2NTYsXHJcbiAgICAgICAgJzE5MjB4MTA4MCAyMy45OGZwcyBTdGFuZGFyZChJUEIpQ3JvcCc6IDEzNDIyMjM4NCxcclxuICAgICAgICAnMTkyMHgxMDgwIDI0LjAwZnBzIEZvciBlZGl0aW5nKEFMTC1JKSc6IDQ4ODAsXHJcbiAgICAgICAgJzE5MjB4MTA4MCAyNC4wMGZwcyBGb3IgZWRpdGluZyhBTEwtSSlDcm9wJzogMTM0MjIyODY0LFxyXG4gICAgICAgICcxOTIweDEwODAgMjQuMDBmcHMgU3RhbmRhcmQoSVBCKSc6IDQ5MTIsXHJcbiAgICAgICAgJzE5MjB4MTA4MCAyNC4wMGZwcyBTdGFuZGFyZChJUEIpQ3JvcCc6IDEzNDIyMjg5NixcclxuICAgICAgICAnMTkyMHgxMDgwIDI1LjAwZnBzJzogMTAyNCxcclxuICAgICAgICAnMTkyMHgxMDgwIDI1LjAwZnBzIEZvciBlZGl0aW5nKEFMTC1JKSc6IDUxMzYsXHJcbiAgICAgICAgJzE5MjB4MTA4MCAyNS4wMGZwcyBGb3IgZWRpdGluZyhBTEwtSSlDcm9wJzogMTM0MjIyODk3LFxyXG4gICAgICAgICcxOTIweDEwODAgMjUuMDBmcHMgTGlnaHQoSVBCKSc6IDUxNjksXHJcbiAgICAgICAgJzE5MjB4MTA4MCAyNS4wMGZwcyBTdGFuZGFyZChJUEIpJzogNTE2OCxcclxuICAgICAgICAnMTkyMHgxMDgwIDI1LjAwZnBzIFN0YW5kYXJkKElQQilDcm9wJzogMTM0MjIzMTIwLFxyXG4gICAgICAgICcxOTIweDEwODAgMjkuOTRmcHMgU3RhbmRhcmQoSVBCKUNyb3AnOiAxMzQyMjMxNTMsXHJcbiAgICAgICAgJzE5MjB4MTA4MCAyOS45N2Zwcyc6IDEyODAsXHJcbiAgICAgICAgJzE5MjB4MTA4MCAyOS45N2ZwcyBGb3IgZWRpdGluZyhBTEwtSSknOiAxMjk2LFxyXG4gICAgICAgICcxOTIweDEwODAgMjkuOTdmcHMgRm9yIGVkaXRpbmcoQUxMLUkpQ3JvcCc6IDEzNDIyMzE1MixcclxuICAgICAgICAnMTkyMHgxMDgwIDI5Ljk3ZnBzIExpZ2h0KElQQiknOiA1NDI1LFxyXG4gICAgICAgICcxOTIweDEwODAgMjkuOTdmcHMgU3RhbmRhcmQoSVBCKSc6IDU0MjQsXHJcbiAgICAgICAgJzE5MjB4MTA4MCA1MC4wMGZwcyBGb3IgZWRpdGluZyhBTEwtSSknOiA1NjQ4LFxyXG4gICAgICAgICcxOTIweDEwODAgNTAuMDBmcHMgRm9yIGVkaXRpbmcoQUxMLUkpQ3JvcCc6IDEzNDIyMzM3NixcclxuICAgICAgICAnMTkyMHgxMDgwIDUwLjAwZnBzIFN0YW5kYXJkKElQQiknOiA1NjgwLFxyXG4gICAgICAgICcxOTIweDEwODAgNTAuMDBmcHMgU3RhbmRhcmQoSVBCKUNyb3AnOiAxMzQyMjM0MDgsXHJcbiAgICAgICAgJzE5MjB4MTA4MCA1OS45NGZwcyBGb3IgZWRpdGluZyhBTEwtSSknOiA1OTA0LFxyXG4gICAgICAgICcxOTIweDEwODAgNTkuOTRmcHMgRm9yIGVkaXRpbmcoQUxMLUkpQ3JvcCc6IDEzNDIyMzYzMixcclxuICAgICAgICAnMTkyMHgxMDgwIDU5Ljk0ZnBzIFN0YW5kYXJkKElQQiknOiA1OTM2LFxyXG4gICAgICAgICcxOTIweDEwODAgNTkuOTRmcHMgU3RhbmRhcmQoSVBCKUNyb3AnOiAxMzQyMjM2NjQsXHJcbiAgICAgICAgJzE5MjB4MTA4MCAxMDAuMGZwcyBGb3IgZWRpdGluZyhBTEwtSSknOiA2MTYwLFxyXG4gICAgICAgICcxOTIweDEwODAgMTE5LjlmcHMgRm9yIGVkaXRpbmcoQUxMLUkpJzogNjQxNixcclxuICAgICAgICAnMzg0MHgyMTYwIDIzLjk4ZnBzIEZvciBlZGl0aW5nKEFMTC1JKSc6IDEzNDU1MDAzMixcclxuICAgICAgICAnMzg0MHgyMTYwIDIzLjk4ZnBzIFN0YW5kYXJkKElQQiknOiAxMzQ1NTAwNjQsXHJcbiAgICAgICAgJzM4NDB4MjE2MCAyNC4wMGZwcyBGb3IgZWRpdGluZyhBTEwtSSknOiAzMzI1NjAsXHJcbiAgICAgICAgJzM4NDB4MjE2MCAyNC4wMGZwcyBTdGFuZGFyZChJUEIpJzogMzMyNTkyLFxyXG4gICAgICAgICczODQweDIxNjAgMjUuMDBmcHMgRm9yIGVkaXRpbmcoQUxMLUkpJzogMTM0NTUwNTQ0LFxyXG4gICAgICAgICczODQweDIxNjAgMjUuMDBmcHMgU3RhbmRhcmQoSVBCKSc6IDEzNDU1MDU3NixcclxuICAgICAgICAnMzg0MHgyMTYwIDI5Ljk3ZnBzIEZvciBlZGl0aW5nKEFMTC1JKSc6IDEzNDU1MDgwMCxcclxuICAgICAgICAnMzg0MHgyMTYwIDI5Ljk3ZnBzIFN0YW5kYXJkKElQQiknOiAxMzQ1NTA4MzIsXHJcbiAgICAgICAgJzM4NDB4MjE2MCA1MC4wMGZwcyBGb3IgZWRpdGluZyhBTEwtSSknOiAxMzQ1NTEwNTYsXHJcbiAgICAgICAgJzM4NDB4MjE2MCA1MC4wMGZwcyBTdGFuZGFyZChJUEIpJzogMTM0NTUxMDg4LFxyXG4gICAgICAgICczODQweDIxNjAgNTkuOTRmcHMgRm9yIGVkaXRpbmcoQUxMLUkpJzogMTM0NTUxMzEyLFxyXG4gICAgICAgICczODQweDIxNjAgNTkuOTRmcHMgU3RhbmRhcmQoSVBCKSc6IDEzNDU1MTM0NCxcclxuICAgICAgICAnMzg0MHgyMTYwIDEwMC4wZnBzIEZvciBlZGl0aW5nKEFMTC1JKSc6IDMzMzg0MCxcclxuICAgICAgICAnMzg0MHgyMTYwIDExOS45ZnBzIEZvciBlZGl0aW5nKEFMTC1JKSc6IDMzNDA5NixcclxuICAgICAgICAnNDA5NngyMTYwIDIzLjk4ZnBzIEZvciBlZGl0aW5nKEFMTC1JKSc6IDIwMTIzMixcclxuICAgICAgICAnNDA5NngyMTYwIDIzLjk4ZnBzIEZvciBlZGl0aW5nKEFMTC1JKSBDcm9wJzogMTM0NDE4OTYwLFxyXG4gICAgICAgICc0MDk2eDIxNjAgMjMuOThmcHMgTW90aW9uIEpQRUcnOiAxOTcxODQsXHJcbiAgICAgICAgJzQwOTZ4MjE2MCAyMy45OGZwcyBTdGFuZGFyZChJUEIpJzogMjAxMjY0LFxyXG4gICAgICAgICc0MDk2eDIxNjAgMjMuOThmcHMgU3RhbmRhcmQoSVBCKUNyb3AnOiAxMzQ0MTg5OTIsXHJcbiAgICAgICAgJzQwOTZ4MjE2MCAyNC4wMGZwcyBGb3IgZWRpdGluZyhBTEwtSSknOiAyMDE0ODgsXHJcbiAgICAgICAgJzQwOTZ4MjE2MCAyNC4wMGZwcyBGb3IgZWRpdGluZyhBTEwtSSlDcm9wJzogMTM0NDE5MjE2LFxyXG4gICAgICAgICc0MDk2eDIxNjAgMjQuMDBmcHMgTW90aW9uIEpQRUcnOiAxOTc0NDAsXHJcbiAgICAgICAgJzQwOTZ4MjE2MCAyNC4wMGZwcyBTdGFuZGFyZChJUEIpJzogMjAxNTIwLFxyXG4gICAgICAgICc0MDk2eDIxNjAgMjQuMDBmcHMgU3RhbmRhcmQoSVBCKUNyb3AnOiAxMzQ0MTkyNDgsXHJcbiAgICAgICAgJzQwOTZ4MjE2MCAyNS4wMGZwcyBGb3IgZWRpdGluZyhBTEwtSSknOiAyMDE3NDQsXHJcbiAgICAgICAgJzQwOTZ4MjE2MCAyNS4wMGZwcyBGb3IgZWRpdGluZyhBTEwtSSlDcm9wJzogMTM0NDE5NDcyLFxyXG4gICAgICAgICc0MDk2eDIxNjAgMjUuMDBmcHMgTW90aW9uIEpQRUcnOiAxOTc2OTYsXHJcbiAgICAgICAgJzQwOTZ4MjE2MCAyNS4wMGZwcyBTdGFuZGFyZChJUEIpJzogMjAxNzc2LFxyXG4gICAgICAgICc0MDk2eDIxNjAgMjUuMDBmcHMgU3RhbmRhcmQoSVBCKUNyb3AnOiAxMzQ0MTk1MDQsXHJcbiAgICAgICAgJzQwOTZ4MjE2MCAyOS45NGZwcyBTdGFuZGFyZChJUEIpQ3JvcCc6IDEzNDQxOTc2MCxcclxuICAgICAgICAnNDA5NngyMTYwIDI5Ljk3ZnBzIEZvciBlZGl0aW5nKEFMTC1JKSc6IDIwMjAwMCxcclxuICAgICAgICAnNDA5NngyMTYwIDI5Ljk3ZnBzIEZvciBlZGl0aW5nKEFMTC1JKUNyb3AnOiAxMzQ0MTk3MjgsXHJcbiAgICAgICAgJzQwOTZ4MjE2MCAyOS45N2ZwcyBNb3Rpb24gSlBFRyc6IDE5Nzk1MixcclxuICAgICAgICAnNDA5NngyMTYwIDI5Ljk3MGZwcyBTdGFuZGFyZChJUEIpJzogMjAyMDMyLFxyXG4gICAgICAgICc0MDk2eDIxNjAgNTAuMDBmcHMgRm9yIGVkaXRpbmcoQUxMLUkpJzogMjAyMjU2LFxyXG4gICAgICAgICc0MDk2eDIxNjAgNTAuMDBmcHMgRm9yIGVkaXRpbmcoQUxMLUkpQ3JvcCc6IDEzNDQxOTk4NCxcclxuICAgICAgICAnNDA5NngyMTYwIDUwLjAwZnBzIFN0YW5kYXJkKElQQiknOiAyMDIyODgsXHJcbiAgICAgICAgJzQwOTZ4MjE2MCA1MC4wMGZwcyBTdGFuZGFyZChJUEIpQ3JvcCc6IDEzNDQyMDAxNixcclxuICAgICAgICAnNDA5NngyMTYwIDU5Ljk0ZnBzIEZvciBlZGl0aW5nKEFMTC1JKSc6IDIwMjUxMixcclxuICAgICAgICAnNDA5NngyMTYwIDU5Ljk0ZnBzIEZvciBlZGl0aW5nKEFMTC1JKUNyb3AnOiAxMzQ0MjAyNDAsXHJcbiAgICAgICAgJzQwOTZ4MjE2MCA1OS45NGZwcyBTdGFuZGFyZChJUEIpJzogMjAyNTQ0LFxyXG4gICAgICAgICc0MDk2eDIxNjAgNTkuOTRmcHMgU3RhbmRhcmQoSVBCKUNyb3AnOiAxMzQ0MjAyNzIsXHJcbiAgICAgICAgJzQwOTZ4MjE2MCAxMDAuMGZwcyBGb3IgZWRpdGluZyhBTEwtSSknOiAyMDI3NjgsXHJcbiAgICAgICAgJzQwOTZ4MjE2MCAxMTkuOWZwcyBGb3IgZWRpdGluZyhBTEwtSSknOiAyMDMwMjQsXHJcbiAgICAgICAgJzc2ODB4NDMyMCAyMy45OGZwcyBGb3IgZWRpdGluZyhBTEwtSSknOiA1OTQ0NDgsXHJcbiAgICAgICAgJzc2ODB4NDMyMCAyMy45OGZwcyBTdGFuZGFyZChJUEIpJzogNTk0NDgwLFxyXG4gICAgICAgICc3NjgweDQzMjAgMjUuMDBmcHMgRm9yIGVkaXRpbmcoQUxMLUkpJzogNTk0OTYwLFxyXG4gICAgICAgICc3NjgweDQzMjAgMjUuMDBmcHMgU3RhbmRhcmQoSVBCKSc6IDU5NDk5MixcclxuICAgICAgICAnNzY4MHg0MzIwIDI5Ljk3ZnBzIEZvciBlZGl0aW5nKEFMTC1JKSc6IDU5NTIxNixcclxuICAgICAgICAnNzY4MHg0MzIwIDI5Ljk3ZnBzIFN0YW5kYXJkKElQQiknOiA1OTUyNDgsXHJcbiAgICAgICAgJzgxOTJ4NDMyMCAyMy45OGZwcyBGb3IgZWRpdGluZyhBTEwtSSknOiA1Mjg5MTIsXHJcbiAgICAgICAgJzgxOTJ4NDMyMCAyMy45OGZwcyBTdGFuZGFyZChJUEIpJzogNTI4OTQ0LFxyXG4gICAgICAgICc4MTkyeDQzMjAgMjQuMDBmcHMgRm9yIGVkaXRpbmcoQUxMLUkpJzogNTI5MTY4LFxyXG4gICAgICAgICc4MTkyeDQzMjAgMjQuMDBmcHMgU3RhbmRhcmQoSVBCKSc6IDUyOTIwMCxcclxuICAgICAgICAnODE5Mng0MzIwIDI1LjAwZnBzIEZvciBlZGl0aW5nKEFMTC1JKSc6IDUyOTQyNCxcclxuICAgICAgICAnODE5Mng0MzIwIDI1LjAwZnBzIFN0YW5kYXJkKElQQiknOiA1Mjk0NTYsXHJcbiAgICAgICAgJzgxOTJ4NDMyMCAyOS45N2ZwcyBGb3IgZWRpdGluZyhBTEwtSSknOiA1Mjk2ODAsXHJcbiAgICAgICAgJzgxOTJ4NDMyMCAyOS45N2ZwcyBTdGFuZGFyZChJUEIpJzogNTI5NzEyLFxyXG4gICAgfTtcclxuICAgIE9wdGlvbi5Ob2lzZVJlZHVjdGlvbiA9IHtcclxuICAgICAgICBBdXRvOiA0LFxyXG4gICAgICAgIE9mZjogMCxcclxuICAgICAgICBPbjE6IDEsXHJcbiAgICAgICAgT24yOiAyLFxyXG4gICAgICAgIE9uMzogMyxcclxuICAgIH07XHJcbiAgICBPcHRpb24uUmVkRXllID0ge1xyXG4gICAgICAgIEludmFsaWQ6IDQyOTQ5NjcyOTUsXHJcbiAgICAgICAgT2ZmOiAwLFxyXG4gICAgICAgIE9uOiAxLFxyXG4gICAgfTtcclxuICAgIE9wdGlvbi5SZWNvcmQgPSB7XHJcbiAgICAgICAgQmVnaW46IDQsXHJcbiAgICAgICAgRW5kOiAwLFxyXG4gICAgfTtcclxuICAgIE9wdGlvbi5TYXZlVG8gPSB7XHJcbiAgICAgICAgQm90aDogMyxcclxuICAgICAgICBDYW1lcmE6IDEsXHJcbiAgICAgICAgSG9zdDogMixcclxuICAgIH07XHJcbiAgICBPcHRpb24uV2hpdGVCYWxhbmNlID0ge1xyXG4gICAgICAgIEF1dG9BbWJpZW5jZVByaW9yaXR5OiAwLFxyXG4gICAgICAgIEF1dG9XaGl0ZVByaW9yaXR5OiAyMyxcclxuICAgICAgICBDbGljazogNDI5NDk2NzI5NSxcclxuICAgICAgICBDbG91ZHk6IDIsXHJcbiAgICAgICAgQ29sb3JUZW1wZXJhdHVyZTogOSxcclxuICAgICAgICBDdXN0b21QQzE6IDEwLFxyXG4gICAgICAgIEN1c3RvbVBDMjogMTEsXHJcbiAgICAgICAgQ3VzdG9tUEMzOiAxMixcclxuICAgICAgICBDdXN0b21QQzQ6IDIwLFxyXG4gICAgICAgIEN1c3RvbVBDNTogMjEsXHJcbiAgICAgICAgRGF5bGlnaHQ6IDEsXHJcbiAgICAgICAgRmxhc2g6IDUsXHJcbiAgICAgICAgRmx1b3Jlc2NlbnQ6IDQsXHJcbiAgICAgICAgUGFzdGVkOiA0Mjk0OTY3Mjk0LFxyXG4gICAgICAgIFNoYWRlOiA4LFxyXG4gICAgICAgIFR1bmdzdGVuOiAzLFxyXG4gICAgICAgIFdoaXRlUGFwZXI6IDYsXHJcbiAgICAgICAgV2hpdGVQYXBlcjI6IDE1LFxyXG4gICAgICAgIFdoaXRlUGFwZXIzOiAxNixcclxuICAgICAgICBXaGl0ZVBhcGVyNDogMTgsXHJcbiAgICAgICAgV2hpdGVQYXBlcjU6IDE5LFxyXG4gICAgfTtcclxuICAgIHJldHVybiBPcHRpb247XHJcbn0oKSk7XHJcbmV4cG9ydCB7IE9wdGlvbiB9O1xyXG4iLCJ2YXIgT3V0cHV0RGV2aWNlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE91dHB1dERldmljZSh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXNbX2FdID0gJ091dHB1dERldmljZSc7XHJcbiAgICAgICAgdGhpcy5sYWJlbF8gPSAnJztcclxuICAgICAgICB0aGlzLnZhbHVlXyA9IHZhbHVlO1xyXG4gICAgICAgIHZhciBkZXZpY2VOYW1lcyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2IgPSBPYmplY3Qua2V5cyhPdXRwdXREZXZpY2UuSUQpOyBfaSA8IF9iLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICB2YXIgZGV2aWNlTmFtZSA9IF9iW19pXTtcclxuICAgICAgICAgICAgaWYgKE91dHB1dERldmljZS5JRFtkZXZpY2VOYW1lXSA+IDAgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNFbmFibGVkKE91dHB1dERldmljZS5JRFtkZXZpY2VOYW1lXSkpIHtcclxuICAgICAgICAgICAgICAgIGRldmljZU5hbWVzLnB1c2goZGV2aWNlTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYWJlbF8gPSBkZXZpY2VOYW1lcy5qb2luKCcsICcpO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE91dHB1dERldmljZS5wcm90b3R5cGUsIFwibGFiZWxcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYWJlbF8gPyB0aGlzLmxhYmVsXyA6ICdOb25lJztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT3V0cHV0RGV2aWNlLnByb3RvdHlwZSwgXCJ2YWx1ZVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlXztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPdXRwdXREZXZpY2UucHJvdG90eXBlWyhfYSA9IFN5bWJvbC50b1N0cmluZ1RhZywgU3ltYm9sLnRvUHJpbWl0aXZlKV0gPSBmdW5jdGlvbiAoaGludCkge1xyXG4gICAgICAgIHN3aXRjaCAoaGludCkge1xyXG4gICAgICAgICAgICBjYXNlICdudW1iZXInOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVfO1xyXG4gICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFiZWxfO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIE91dHB1dERldmljZS5wcm90b3R5cGUuaXNFbmFibGVkID0gZnVuY3Rpb24gKGRldmljZUlEKSB7XHJcbiAgICAgICAgcmV0dXJuIGRldmljZUlEID4gMCAmJiAodGhpcy52YWx1ZV8gJiBkZXZpY2VJRCkgPT09IGRldmljZUlEO1xyXG4gICAgfTtcclxuICAgIE91dHB1dERldmljZS5wcm90b3R5cGUuZ2V0RGV2aWNlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZGV2aWNlcyA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2IgPSBPYmplY3Qua2V5cyhPdXRwdXREZXZpY2UuSUQpOyBfaSA8IF9iLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICB2YXIgZGV2aWNlTmFtZSA9IF9iW19pXTtcclxuICAgICAgICAgICAgaWYgKE91dHB1dERldmljZS5JRFtkZXZpY2VOYW1lXSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGRldmljZXNbZGV2aWNlTmFtZV0gPSB0aGlzLmlzRW5hYmxlZChPdXRwdXREZXZpY2UuSURbZGV2aWNlTmFtZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkZXZpY2VzO1xyXG4gICAgfTtcclxuICAgIE91dHB1dERldmljZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGxhYmVsOiB0aGlzLmxhYmVsLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcclxuICAgICAgICAgICAgZGV2aWNlczogdGhpcy5nZXREZXZpY2VzKCksXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICBPdXRwdXREZXZpY2UuZm9yTGFiZWwgPSBmdW5jdGlvbiAobGFiZWwpIHtcclxuICAgICAgICB2YXIgZGV2aWNlTmFtZXMgPSBsYWJlbC5tYXRjaCgvW1xcd1xcZF0rL2cpIHx8IFtdO1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IE91dHB1dERldmljZS5JRC5Ob25lO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgZGV2aWNlTmFtZXNfMSA9IGRldmljZU5hbWVzOyBfaSA8IGRldmljZU5hbWVzXzEubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBkZXZpY2VOYW1lID0gZGV2aWNlTmFtZXNfMVtfaV07XHJcbiAgICAgICAgICAgIGlmIChkZXZpY2VOYW1lIGluIE91dHB1dERldmljZS5JRCkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgfD0gT3V0cHV0RGV2aWNlLklEW2RldmljZU5hbWVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgT3V0cHV0RGV2aWNlKHZhbHVlKTtcclxuICAgIH07XHJcbiAgICB2YXIgX2E7XHJcbiAgICBPdXRwdXREZXZpY2UuSUQgPSB7XHJcbiAgICAgICAgTm9uZTogMCxcclxuICAgICAgICBQQzogMixcclxuICAgICAgICBQQ1NtYWxsOiA4LFxyXG4gICAgICAgIFRGVDogMSxcclxuICAgIH07XHJcbiAgICByZXR1cm4gT3V0cHV0RGV2aWNlO1xyXG59KCkpO1xyXG5leHBvcnQgeyBPdXRwdXREZXZpY2UgfTtcclxuIiwidmFyIFNodXR0ZXJTcGVlZCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBTaHV0dGVyU3BlZWQodmFsdWVfKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZV8gPSB2YWx1ZV87XHJcbiAgICAgICAgdGhpc1tfYV0gPSAnU2h1dHRlclNwZWVkJztcclxuICAgICAgICB2YXIgbmFtZSA9IE9iamVjdC5rZXlzKFNodXR0ZXJTcGVlZC5JRCkuZmluZChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBTaHV0dGVyU3BlZWQuSURba2V5XSA9PT0gdmFsdWVfOyB9KTtcclxuICAgICAgICBpZiAobmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsXyA9IG5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kc18gPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChcIlwiLmNvbmNhdCh2YWx1ZV8pIGluIFNodXR0ZXJTcGVlZC5PbmVUaGlyZFZhbHVlcykge1xyXG4gICAgICAgICAgICB0aGlzLnNlY29uZHNfID0gU2h1dHRlclNwZWVkLk9uZVRoaXJkVmFsdWVzW3ZhbHVlX10gfHwgMDtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbF8gPVxyXG4gICAgICAgICAgICAgICAgU2h1dHRlclNwZWVkLmdldExhYmVsRm9yU2Vjb25kcyh0aGlzLnNlY29uZHNfKSArICcgKDEvMyknO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZWNvbmRzXyA9IFNodXR0ZXJTcGVlZC5PbmVIYWxmVmFsdWVzW3ZhbHVlX10gfHwgMDtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbF8gPSBTaHV0dGVyU3BlZWQuZ2V0TGFiZWxGb3JTZWNvbmRzKHRoaXMuc2Vjb25kc18pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFNodXR0ZXJTcGVlZC5nZXRMYWJlbEZvclNlY29uZHMgPSBmdW5jdGlvbiAoc2Vjb25kcykge1xyXG4gICAgICAgIHZhciBsYWJlbCA9ICcnO1xyXG4gICAgICAgIGlmIChzZWNvbmRzID4gMC4yOTk5KSB7XHJcbiAgICAgICAgICAgIGxhYmVsID0gc2Vjb25kcy50b0ZpeGVkKDEpLnJlcGxhY2UoL1xcLjArJC8sICcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc2Vjb25kcyA+IDAuMCkge1xyXG4gICAgICAgICAgICBsYWJlbCA9IFwiMS9cIi5jb25jYXQoTWF0aC5yb3VuZCgxLjAgLyBzZWNvbmRzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsYWJlbDtcclxuICAgIH07XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2h1dHRlclNwZWVkLnByb3RvdHlwZSwgXCJsYWJlbFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhYmVsXztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2h1dHRlclNwZWVkLnByb3RvdHlwZSwgXCJ2YWx1ZVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlXztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2h1dHRlclNwZWVkLnByb3RvdHlwZSwgXCJzZWNvbmRzXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2Vjb25kc187XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNodXR0ZXJTcGVlZC5wcm90b3R5cGUsIFwic3RvcFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiLmNvbmNhdCh0aGlzLnZhbHVlXykgaW4gU2h1dHRlclNwZWVkLk9uZVRoaXJkVmFsdWVzID8gJzEvMycgOiAnMS8yJztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBTaHV0dGVyU3BlZWQucHJvdG90eXBlWyhfYSA9IFN5bWJvbC50b1N0cmluZ1RhZywgU3ltYm9sLnRvUHJpbWl0aXZlKV0gPSBmdW5jdGlvbiAoaGludCkge1xyXG4gICAgICAgIHN3aXRjaCAoaGludCkge1xyXG4gICAgICAgICAgICBjYXNlICdudW1iZXInOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVfO1xyXG4gICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFiZWxfO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFNodXR0ZXJTcGVlZC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGxhYmVsOiB0aGlzLmxhYmVsLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcclxuICAgICAgICAgICAgc2Vjb25kczogdGhpcy5zZWNvbmRzLFxyXG4gICAgICAgICAgICBzdG9wOiB0aGlzLnN0b3AsXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICBTaHV0dGVyU3BlZWQuZmluZE5lYXJlc3QgPSBmdW5jdGlvbiAodmFsdWVPckxhYmVsLCBmaWx0ZXIpIHtcclxuICAgICAgICB2YXIgc2Vjb25kcyA9IDA7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZU9yTGFiZWwgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHZhciBzcGVlZCA9IFNodXR0ZXJTcGVlZC5mb3JMYWJlbCh2YWx1ZU9yTGFiZWwpO1xyXG4gICAgICAgICAgICBpZiAoIXNwZWVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWNvbmRzID0gc3BlZWQuc2Vjb25kcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNlY29uZHMgPSBuZXcgU2h1dHRlclNwZWVkKHZhbHVlT3JMYWJlbCkuc2Vjb25kcztcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZvdW5kID0gT2JqZWN0LmtleXMoU2h1dHRlclNwZWVkLkFsbFZhbHVlcykucmVkdWNlKGZ1bmN0aW9uIChjYXJyeSwga2V5KSB7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gU2h1dHRlclNwZWVkLkFsbFZhbHVlc1trZXldO1xyXG4gICAgICAgICAgICB2YXIgZGlmZmVyZW5jZSA9IE1hdGguYWJzKGN1cnJlbnQgLSBzZWNvbmRzKTtcclxuICAgICAgICAgICAgaWYgKCFjYXJyeSB8fCBkaWZmZXJlbmNlIDwgY2FycnkuZGlmZmVyZW5jZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlciAmJiAhZmlsdGVyKG5ldyBTaHV0dGVyU3BlZWQoK2tleSkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcnJ5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogK2tleSxcclxuICAgICAgICAgICAgICAgICAgICBkaWZmZXJlbmNlOiBkaWZmZXJlbmNlLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY2Fycnk7XHJcbiAgICAgICAgfSwgbnVsbCk7XHJcbiAgICAgICAgaWYgKGZvdW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2h1dHRlclNwZWVkKGZvdW5kLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG4gICAgU2h1dHRlclNwZWVkLmZvckxhYmVsID0gZnVuY3Rpb24gKGxhYmVsKSB7XHJcbiAgICAgICAgaWYgKGxhYmVsIGluIFNodXR0ZXJTcGVlZC5JRCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFNodXR0ZXJTcGVlZChTaHV0dGVyU3BlZWQuSURbbGFiZWxdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG1hdGNoID0gbGFiZWwubWF0Y2goLyhcXGQrKD86XFwuXFxkKyk/KSg/OlxccypcXC9cXHMqKFxcZCspKT8oPzpcXHMrKC4qKSk/Lyk7XHJcbiAgICAgICAgaWYgKG1hdGNoKSB7XHJcbiAgICAgICAgICAgIHZhciBpc09uZVRoaXJkID0gKG1hdGNoWzNdIHx8ICcnKS5pbmRleE9mKCcxLzMnKSA+PSAwO1xyXG4gICAgICAgICAgICB2YXIgc2Vjb25kc18xID0gcGFyc2VGbG9hdChtYXRjaFsxXSkgfHwgMC4wO1xyXG4gICAgICAgICAgICBpZiAobWF0Y2hbMl0pIHtcclxuICAgICAgICAgICAgICAgIHNlY29uZHNfMSAvPSBwYXJzZUZsb2F0KG1hdGNoWzJdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdmFsdWVzXzEgPSBpc09uZVRoaXJkXHJcbiAgICAgICAgICAgICAgICA/IFNodXR0ZXJTcGVlZC5PbmVUaGlyZFZhbHVlc1xyXG4gICAgICAgICAgICAgICAgOiBTaHV0dGVyU3BlZWQuT25lSGFsZlZhbHVlcztcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gT2JqZWN0LmtleXModmFsdWVzXzEpLmZpbmQoZnVuY3Rpb24gKHN0cmF3KSB7IHJldHVybiBNYXRoLmFicyh2YWx1ZXNfMVtzdHJhd10gLSBzZWNvbmRzXzEpIDwgMC4wMDAwMDAxOyB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTaHV0dGVyU3BlZWQoKyh2YWx1ZSB8fCAtMSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH07XHJcbiAgICB2YXIgX2E7XHJcbiAgICBTaHV0dGVyU3BlZWQuSUQgPSB7XHJcbiAgICAgICAgQXV0bzogMCxcclxuICAgICAgICBCdWxiOiAxMixcclxuICAgICAgICBOb3RWYWxpZDogNDI5NDk2NzI5NSxcclxuICAgIH07XHJcbiAgICBTaHV0dGVyU3BlZWQuT25lSGFsZlZhbHVlcyA9IHtcclxuICAgICAgICAnMTYnOiAzMCxcclxuICAgICAgICAnMTknOiAyNSxcclxuICAgICAgICAnMjAnOiAyMCxcclxuICAgICAgICAnMjQnOiAxNSxcclxuICAgICAgICAnMjcnOiAxMyxcclxuICAgICAgICAnMjgnOiAxMCxcclxuICAgICAgICAnMzInOiA4LFxyXG4gICAgICAgICczNic6IDYsXHJcbiAgICAgICAgJzM3JzogNSxcclxuICAgICAgICAnNDAnOiA0LFxyXG4gICAgICAgICc0Myc6IDMuMixcclxuICAgICAgICAnNDQnOiAzLFxyXG4gICAgICAgICc0NSc6IDIuNSxcclxuICAgICAgICAnNDgnOiAyLFxyXG4gICAgICAgICc1MSc6IDEuNixcclxuICAgICAgICAnNTInOiAxLjUsXHJcbiAgICAgICAgJzUzJzogMS4zLFxyXG4gICAgICAgICc1Nic6IDEsXHJcbiAgICAgICAgJzU5JzogMC44LFxyXG4gICAgICAgICc2MCc6IDAuNyxcclxuICAgICAgICAnNjEnOiAwLjYsXHJcbiAgICAgICAgJzY0JzogMC41LFxyXG4gICAgICAgICc2Nyc6IDAuNCxcclxuICAgICAgICAnNjgnOiAwLjMsXHJcbiAgICAgICAgJzcyJzogMC4yNSxcclxuICAgICAgICAnNzUnOiAwLjIsXHJcbiAgICAgICAgJzc2JzogMC4xNjY2NjY2NjY2NjY2NjY2NixcclxuICAgICAgICAnODAnOiAwLjEyNSxcclxuICAgICAgICAnODQnOiAwLjEsXHJcbiAgICAgICAgJzg1JzogMC4wNzY5MjMwNzY5MjMwNzY5MyxcclxuICAgICAgICAnODgnOiAwLjA2NjY2NjY2NjY2NjY2NjY3LFxyXG4gICAgICAgICc5Mic6IDAuMDUsXHJcbiAgICAgICAgJzkzJzogMC4wNCxcclxuICAgICAgICAnOTYnOiAwLjAzMzMzMzMzMzMzMzMzMzMzLFxyXG4gICAgICAgICc5OSc6IDAuMDI1LFxyXG4gICAgICAgICcxMDAnOiAwLjAyMjIyMjIyMjIyMjIyMjIyMyxcclxuICAgICAgICAnMTAxJzogMC4wMixcclxuICAgICAgICAnMTA0JzogMC4wMTY2NjY2NjY2NjY2NjY2NjYsXHJcbiAgICAgICAgJzEwNyc6IDAuMDEyNSxcclxuICAgICAgICAnMTA4JzogMC4wMTExMTExMTExMTExMTExMTIsXHJcbiAgICAgICAgJzEwOSc6IDAuMDEsXHJcbiAgICAgICAgJzExMic6IDAuMDA4LFxyXG4gICAgICAgICcxMTUnOiAwLjAwNjI1LFxyXG4gICAgICAgICcxMTYnOiAwLjAwNTU1NTU1NTU1NTU1NTU1NixcclxuICAgICAgICAnMTE3JzogMC4wMDUsXHJcbiAgICAgICAgJzEyMCc6IDAuMDA0LFxyXG4gICAgICAgICcxMjMnOiAwLjAwMzEyNSxcclxuICAgICAgICAnMTI0JzogMC4wMDI4NTcxNDI4NTcxNDI4NTcsXHJcbiAgICAgICAgJzEyNSc6IDAuMDAyNSxcclxuICAgICAgICAnMTI4JzogMC4wMDIsXHJcbiAgICAgICAgJzEzMSc6IDAuMDAxNTYyNSxcclxuICAgICAgICAnMTMyJzogMC4wMDEzMzMzMzMzMzMzMzMzMzMzLFxyXG4gICAgICAgICcxMzMnOiAwLjAwMTI1LFxyXG4gICAgICAgICcxMzYnOiAwLjAwMSxcclxuICAgICAgICAnMTM5JzogMC4wMDA4LFxyXG4gICAgICAgICcxNDAnOiAwLjAwMDY2NjY2NjY2NjY2NjY2NjYsXHJcbiAgICAgICAgJzE0MSc6IDAuMDAwNjI1LFxyXG4gICAgICAgICcxNDQnOiAwLjAwMDUsXHJcbiAgICAgICAgJzE0Nyc6IDAuMDAwNCxcclxuICAgICAgICAnMTQ4JzogMC4wMDAzMzMzMzMzMzMzMzMzMzMzLFxyXG4gICAgICAgICcxNDknOiAwLjAwMDMxMjUsXHJcbiAgICAgICAgJzE1Mic6IDAuMDAwMjUsXHJcbiAgICAgICAgJzE1NSc6IDAuMDAwMixcclxuICAgICAgICAnMTU2JzogMC4wMDAxNjY2NjY2NjY2NjY2NjY2NixcclxuICAgICAgICAnMTU3JzogMC4wMDAxNTYyNSxcclxuICAgICAgICAnMTYwJzogMC4wMDAxMjUsXHJcbiAgICB9O1xyXG4gICAgU2h1dHRlclNwZWVkLk9uZVRoaXJkVmFsdWVzID0ge1xyXG4gICAgICAgICcyMSc6IDIwLFxyXG4gICAgICAgICcyOSc6IDEwLFxyXG4gICAgICAgICczNSc6IDYsXHJcbiAgICAgICAgJzY5JzogMC4zLFxyXG4gICAgICAgICc3Nyc6IDAuMTY2NjY2NjY2NjY2NjY2NjYsXHJcbiAgICAgICAgJzgzJzogMC4xLFxyXG4gICAgICAgICc5MSc6IDAuMDUsXHJcbiAgICB9O1xyXG4gICAgU2h1dHRlclNwZWVkLkFsbFZhbHVlcyA9IHtcclxuICAgICAgICAnMTYnOiAzMCxcclxuICAgICAgICAnMTknOiAyNSxcclxuICAgICAgICAnMjAnOiAyMCxcclxuICAgICAgICAnMjEnOiAyMCxcclxuICAgICAgICAnMjQnOiAxNSxcclxuICAgICAgICAnMjcnOiAxMyxcclxuICAgICAgICAnMjgnOiAxMCxcclxuICAgICAgICAnMjknOiAxMCxcclxuICAgICAgICAnMzInOiA4LFxyXG4gICAgICAgICczNSc6IDYsXHJcbiAgICAgICAgJzM2JzogNixcclxuICAgICAgICAnMzcnOiA1LFxyXG4gICAgICAgICc0MCc6IDQsXHJcbiAgICAgICAgJzQzJzogMy4yLFxyXG4gICAgICAgICc0NCc6IDMsXHJcbiAgICAgICAgJzQ1JzogMi41LFxyXG4gICAgICAgICc0OCc6IDIsXHJcbiAgICAgICAgJzUxJzogMS42LFxyXG4gICAgICAgICc1Mic6IDEuNSxcclxuICAgICAgICAnNTMnOiAxLjMsXHJcbiAgICAgICAgJzU2JzogMSxcclxuICAgICAgICAnNTknOiAwLjgsXHJcbiAgICAgICAgJzYwJzogMC43LFxyXG4gICAgICAgICc2MSc6IDAuNixcclxuICAgICAgICAnNjQnOiAwLjUsXHJcbiAgICAgICAgJzY3JzogMC40LFxyXG4gICAgICAgICc2OCc6IDAuMyxcclxuICAgICAgICAnNjknOiAwLjMsXHJcbiAgICAgICAgJzcyJzogMC4yNSxcclxuICAgICAgICAnNzUnOiAwLjIsXHJcbiAgICAgICAgJzc2JzogMC4xNjY2NjY2NjY2NjY2NjY2NixcclxuICAgICAgICAnNzcnOiAwLjE2NjY2NjY2NjY2NjY2NjY2LFxyXG4gICAgICAgICc4MCc6IDAuMTI1LFxyXG4gICAgICAgICc4Myc6IDAuMSxcclxuICAgICAgICAnODQnOiAwLjEsXHJcbiAgICAgICAgJzg1JzogMC4wNzY5MjMwNzY5MjMwNzY5MyxcclxuICAgICAgICAnODgnOiAwLjA2NjY2NjY2NjY2NjY2NjY3LFxyXG4gICAgICAgICc5MSc6IDAuMDUsXHJcbiAgICAgICAgJzkyJzogMC4wNSxcclxuICAgICAgICAnOTMnOiAwLjA0LFxyXG4gICAgICAgICc5Nic6IDAuMDMzMzMzMzMzMzMzMzMzMzMsXHJcbiAgICAgICAgJzk5JzogMC4wMjUsXHJcbiAgICAgICAgJzEwMCc6IDAuMDIyMjIyMjIyMjIyMjIyMjIzLFxyXG4gICAgICAgICcxMDEnOiAwLjAyLFxyXG4gICAgICAgICcxMDQnOiAwLjAxNjY2NjY2NjY2NjY2NjY2NixcclxuICAgICAgICAnMTA3JzogMC4wMTI1LFxyXG4gICAgICAgICcxMDgnOiAwLjAxMTExMTExMTExMTExMTExMixcclxuICAgICAgICAnMTA5JzogMC4wMSxcclxuICAgICAgICAnMTEyJzogMC4wMDgsXHJcbiAgICAgICAgJzExNSc6IDAuMDA2MjUsXHJcbiAgICAgICAgJzExNic6IDAuMDA1NTU1NTU1NTU1NTU1NTU2LFxyXG4gICAgICAgICcxMTcnOiAwLjAwNSxcclxuICAgICAgICAnMTIwJzogMC4wMDQsXHJcbiAgICAgICAgJzEyMyc6IDAuMDAzMTI1LFxyXG4gICAgICAgICcxMjQnOiAwLjAwMjg1NzE0Mjg1NzE0Mjg1NyxcclxuICAgICAgICAnMTI1JzogMC4wMDI1LFxyXG4gICAgICAgICcxMjgnOiAwLjAwMixcclxuICAgICAgICAnMTMxJzogMC4wMDE1NjI1LFxyXG4gICAgICAgICcxMzInOiAwLjAwMTMzMzMzMzMzMzMzMzMzMzMsXHJcbiAgICAgICAgJzEzMyc6IDAuMDAxMjUsXHJcbiAgICAgICAgJzEzNic6IDAuMDAxLFxyXG4gICAgICAgICcxMzknOiAwLjAwMDgsXHJcbiAgICAgICAgJzE0MCc6IDAuMDAwNjY2NjY2NjY2NjY2NjY2NixcclxuICAgICAgICAnMTQxJzogMC4wMDA2MjUsXHJcbiAgICAgICAgJzE0NCc6IDAuMDAwNSxcclxuICAgICAgICAnMTQ3JzogMC4wMDA0LFxyXG4gICAgICAgICcxNDgnOiAwLjAwMDMzMzMzMzMzMzMzMzMzMzMsXHJcbiAgICAgICAgJzE0OSc6IDAuMDAwMzEyNSxcclxuICAgICAgICAnMTUyJzogMC4wMDAyNSxcclxuICAgICAgICAnMTU1JzogMC4wMDAyLFxyXG4gICAgICAgICcxNTYnOiAwLjAwMDE2NjY2NjY2NjY2NjY2NjY2LFxyXG4gICAgICAgICcxNTcnOiAwLjAwMDE1NjI1LFxyXG4gICAgICAgICcxNjAnOiAwLjAwMDEyNSxcclxuICAgIH07XHJcbiAgICByZXR1cm4gU2h1dHRlclNwZWVkO1xyXG59KCkpO1xyXG5leHBvcnQgeyBTaHV0dGVyU3BlZWQgfTtcclxuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbmltcG9ydCB7IEFwaUlkZW50aWZpZXIgfSBmcm9tICcuL0FwaUlkZW50aWZpZXInO1xyXG52YXIgU3RhdGVFdmVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoU3RhdGVFdmVudCwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFN0YXRlRXZlbnQoaWRlbnRpZmllcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGlkZW50aWZpZXIsIFN0YXRlRXZlbnQuSUQpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXNbX2FdID0gJ1N0YXRlRXZlbnQnO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIFN0YXRlRXZlbnQucHJvdG90eXBlLmVxdWFsVG8gPSBmdW5jdGlvbiAob3RoZXIpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5lcXVhbFRvLmNhbGwodGhpcywgK290aGVyKTtcclxuICAgIH07XHJcbiAgICB2YXIgX2E7XHJcbiAgICBfYSA9IFN5bWJvbC50b1N0cmluZ1RhZztcclxuICAgIFN0YXRlRXZlbnQuSUQgPSB7XHJcbiAgICAgICAgQWZSZXN1bHQ6IDc3NyxcclxuICAgICAgICBBbGw6IDc2OCxcclxuICAgICAgICBCdWxiRXhwb3N1cmVUaW1lOiA3ODQsXHJcbiAgICAgICAgQ2FwdHVyZUVycm9yOiA3NzMsXHJcbiAgICAgICAgSW50ZXJuYWxFcnJvcjogNzc0LFxyXG4gICAgICAgIEpvYlN0YXR1c0NoYW5nZWQ6IDc3MCxcclxuICAgICAgICBQb3dlclpvb21JbmZvQ2hhbmdlZDogNzg1LFxyXG4gICAgICAgIFNodXRkb3duOiA3NjksXHJcbiAgICAgICAgU2h1dERvd25UaW1lclVwZGF0ZTogNzcyLFxyXG4gICAgICAgIFdpbGxTb29uU2h1dERvd246IDc3MSxcclxuICAgIH07XHJcbiAgICByZXR1cm4gU3RhdGVFdmVudDtcclxufShBcGlJZGVudGlmaWVyKSk7XHJcbmV4cG9ydCB7IFN0YXRlRXZlbnQgfTtcclxuIiwidmFyIFRpbWVab25lID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFRpbWVab25lKHZhbHVlXykge1xyXG4gICAgICAgIHRoaXMudmFsdWVfID0gdmFsdWVfO1xyXG4gICAgICAgIHRoaXNbX2FdID0gJ1RpbWVab25lJztcclxuICAgICAgICB0aGlzLmRpZmZlcmVuY2VfID0gMDtcclxuICAgICAgICB0aGlzLnZhbHVlXyA9IHZhbHVlXztcclxuICAgICAgICB0aGlzLnpvbmVfID0gdmFsdWVfO1xyXG4gICAgICAgIHRoaXMubGFiZWxfID0gVGltZVpvbmUuWm9uZXNbXCJcIi5jb25jYXQodmFsdWVfKV0gfHwgJyc7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGltZVpvbmUucHJvdG90eXBlLCBcImxhYmVsXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFiZWxfO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW1lWm9uZS5wcm90b3R5cGUsIFwidmFsdWVcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZV87XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbWVab25lLnByb3RvdHlwZSwgXCJ6b25lXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuem9uZV87XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbWVab25lLnByb3RvdHlwZSwgXCJkaWZmZXJlbmNlXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlmZmVyZW5jZV87XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgVGltZVpvbmUucHJvdG90eXBlWyhfYSA9IFN5bWJvbC50b1N0cmluZ1RhZywgU3ltYm9sLnRvUHJpbWl0aXZlKV0gPSBmdW5jdGlvbiAoaGludCkge1xyXG4gICAgICAgIHN3aXRjaCAoaGludCkge1xyXG4gICAgICAgICAgICBjYXNlICdudW1iZXInOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVfO1xyXG4gICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFiZWxfO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFRpbWVab25lLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbGFiZWw6IHRoaXMubGFiZWwsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxyXG4gICAgICAgICAgICB6b25lOiB0aGlzLnpvbmUsXHJcbiAgICAgICAgICAgIGRpZmZlcmVuY2U6IHRoaXMuZGlmZmVyZW5jZSxcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIHZhciBfYTtcclxuICAgIFRpbWVab25lLlpvbmVzID0ge1xyXG4gICAgICAgICcwJzogJ05vbmUnLFxyXG4gICAgICAgICcxJzogJ0NoYXRoYW0gSXNsYW5kcycsXHJcbiAgICAgICAgJzInOiAnV2VsbGluZ3RvbicsXHJcbiAgICAgICAgJzMnOiAnU29sb21vbiBJc2xhbmQnLFxyXG4gICAgICAgICc0JzogJ1N5ZG5leScsXHJcbiAgICAgICAgJzUnOiAnQWRlbGFkaWUnLFxyXG4gICAgICAgICc2JzogJ1Rva3lvJyxcclxuICAgICAgICAnNyc6ICdIb25nIEtvbmcnLFxyXG4gICAgICAgICc4JzogJ0Jhbmdrb2snLFxyXG4gICAgICAgICc5JzogJ1lhbmdvbicsXHJcbiAgICAgICAgJzEwJzogJ0RhY2NhJyxcclxuICAgICAgICAnMTEnOiAnS2F0aG1hbmR1JyxcclxuICAgICAgICAnMTInOiAnRGVsaGknLFxyXG4gICAgICAgICcxMyc6ICdLYXJhY2hpJyxcclxuICAgICAgICAnMTQnOiAnS2FidWwnLFxyXG4gICAgICAgICcxNSc6ICdEdWJhaScsXHJcbiAgICAgICAgJzE2JzogJ1RlaHJhbicsXHJcbiAgICAgICAgJzE3JzogJ01vc2NvdycsXHJcbiAgICAgICAgJzE4JzogJ0NhaXJvJyxcclxuICAgICAgICAnMTknOiAnUGFyaXMnLFxyXG4gICAgICAgICcyMCc6ICdMb25kb24nLFxyXG4gICAgICAgICcyMSc6ICdBem9yZXMnLFxyXG4gICAgICAgICcyMic6ICdGZXJuYW5kbyBkZSBOb3JvbmhhJyxcclxuICAgICAgICAnMjMnOiAnU8OjbyBQYXVsbycsXHJcbiAgICAgICAgJzI0JzogJ05ld2ZvdW5kbGFuZCcsXHJcbiAgICAgICAgJzI1JzogJ1NhbnRpYWdvJyxcclxuICAgICAgICAnMjYnOiAnQ2FyYWNhcycsXHJcbiAgICAgICAgJzI3JzogJ05ldyBZb3JrJyxcclxuICAgICAgICAnMjgnOiAnQ2hpY2FnbycsXHJcbiAgICAgICAgJzI5JzogJ0RlbnZlcicsXHJcbiAgICAgICAgJzMwJzogJ0xvcyBBbmdlbGVzJyxcclxuICAgICAgICAnMzEnOiAnQW5jaG9yYWdlJyxcclxuICAgICAgICAnMzInOiAnSG9ub2x1bHUnLFxyXG4gICAgICAgICczMyc6ICdTYW1vYScsXHJcbiAgICAgICAgJzM0JzogJ1JpeWFkaCcsXHJcbiAgICAgICAgJzM1JzogJ01hbmF1cycsXHJcbiAgICAgICAgJzI1Nic6ICdVVEMnLFxyXG4gICAgICAgICc2NTUzNSc6ICdVVEMnLFxyXG4gICAgfTtcclxuICAgIHJldHVybiBUaW1lWm9uZTtcclxufSgpKTtcclxuZXhwb3J0IHsgVGltZVpvbmUgfTtcclxuIiwidmFyIFZvbHVtZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBWb2x1bWUoKSB7XHJcbiAgICAgICAgdGhpc1tfYV0gPSAnVm9sdW1lJztcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCAtIHN0dWIgb25seS4nKTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWb2x1bWUucHJvdG90eXBlLCBcImxhYmVsXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQgLSBzdHViIG9ubHkuJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFZvbHVtZS5wcm90b3R5cGUsIFwic3RvcmFnZVR5cGVcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCAtIHN0dWIgb25seS4nKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVm9sdW1lLnByb3RvdHlwZSwgXCJpc1JlYWRhYmxlXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQgLSBzdHViIG9ubHkuJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFZvbHVtZS5wcm90b3R5cGUsIFwiaXNXcml0YWJsZVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkIC0gc3R1YiBvbmx5LicpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWb2x1bWUucHJvdG90eXBlLCBcImZyZWVDYXBhY2l0eVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkIC0gc3R1YiBvbmx5LicpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWb2x1bWUucHJvdG90eXBlLCBcIm1heGltdW1DYXBhY2l0eVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkIC0gc3R1YiBvbmx5LicpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWb2x1bWUucHJvdG90eXBlLCBcImxlbmd0aFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkIC0gc3R1YiBvbmx5LicpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIFZvbHVtZS5wcm90b3R5cGUuZ2V0RW50cmllcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCAtIHN0dWIgb25seS4nKTtcclxuICAgIH07XHJcbiAgICBWb2x1bWUucHJvdG90eXBlWyhfYSA9IFN5bWJvbC50b1N0cmluZ1RhZywgU3ltYm9sLml0ZXJhdG9yKV0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQgLSBzdHViIG9ubHkuJyk7XHJcbiAgICB9O1xyXG4gICAgdmFyIF9hO1xyXG4gICAgVm9sdW1lLlN0b3JhZ2VUeXBlID0ge1xyXG4gICAgICAgIENGYXN0OiA1LFxyXG4gICAgICAgIENvbXBhY3RGbGFzaDogMSxcclxuICAgICAgICBIYXJkRHJpdmU6IDQsXHJcbiAgICAgICAgTm9NZW1vcnlDYXJkOiAwLFxyXG4gICAgICAgIFNEQ2FyZDogMixcclxuICAgIH07XHJcbiAgICByZXR1cm4gVm9sdW1lO1xyXG59KCkpO1xyXG5leHBvcnQgeyBWb2x1bWUgfTtcclxuIiwiaW1wb3J0IHsgQXBlcnR1cmUgfSBmcm9tICcuL0FwZXJ0dXJlJztcclxuaW1wb3J0IHsgQXBpRXJyb3IgfSBmcm9tICcuL0FwaUVycm9yJztcclxuaW1wb3J0IHsgQ2FtZXJhIH0gZnJvbSAnLi9DYW1lcmEnO1xyXG5pbXBvcnQgeyBDYW1lcmFCcm93c2VyIH0gZnJvbSAnLi9DYW1lcmFCcm93c2VyJztcclxuaW1wb3J0IHsgQ2FtZXJhRmlsZSB9IGZyb20gJy4vQ2FtZXJhRmlsZSc7XHJcbmltcG9ydCB7IENhbWVyYVByb3BlcnR5IH0gZnJvbSAnLi9DYW1lcmFQcm9wZXJ0eSc7XHJcbmltcG9ydCB7IERpcmVjdG9yeSB9IGZyb20gJy4vRGlyZWN0b3J5JztcclxuaW1wb3J0IHsgRXhwb3N1cmVDb21wZW5zYXRpb24gfSBmcm9tICcuL0V4cG9zdXJlQ29tcGVuc2F0aW9uJztcclxuaW1wb3J0IHsgRmlsZUZvcm1hdCB9IGZyb20gJy4vRmlsZUZvcm1hdCc7XHJcbmltcG9ydCB7IEZsYWcgfSBmcm9tICcuL0ZsYWcnO1xyXG5pbXBvcnQgeyBJbWFnZVF1YWxpdHkgfSBmcm9tICcuL0ltYWdlUXVhbGl0eSc7XHJcbmltcG9ydCB7IElTT1NlbnNpdGl2aXR5IH0gZnJvbSAnLi9JU09TZW5zaXRpdml0eSc7XHJcbmltcG9ydCB7IE9iamVjdEV2ZW50IH0gZnJvbSAnLi9PYmplY3RFdmVudCc7XHJcbmltcG9ydCB7IE9wdGlvbiB9IGZyb20gJy4vT3B0aW9uJztcclxuaW1wb3J0IHsgT3V0cHV0RGV2aWNlIH0gZnJvbSAnLi9PdXRwdXREZXZpY2UnO1xyXG5pbXBvcnQgeyBTaHV0dGVyU3BlZWQgfSBmcm9tICcuL1NodXR0ZXJTcGVlZCc7XHJcbmltcG9ydCB7IFN0YXRlRXZlbnQgfSBmcm9tICcuL1N0YXRlRXZlbnQnO1xyXG5pbXBvcnQgeyBUaW1lWm9uZSB9IGZyb20gJy4vVGltZVpvbmUnO1xyXG5pbXBvcnQgeyBWb2x1bWUgfSBmcm9tICcuL1ZvbHVtZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vQXBlcnR1cmUnO1xyXG5leHBvcnQgKiBmcm9tICcuL0FwaUVycm9yJztcclxuZXhwb3J0ICogZnJvbSAnLi9DYW1lcmEnO1xyXG5leHBvcnQgKiBmcm9tICcuL0NhbWVyYUJyb3dzZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL0NhbWVyYUZpbGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL0NhbWVyYVByb3BlcnR5JztcclxuZXhwb3J0ICogZnJvbSAnLi9EaXJlY3RvcnknO1xyXG5leHBvcnQgKiBmcm9tICcuL0V4cG9zdXJlQ29tcGVuc2F0aW9uJztcclxuZXhwb3J0ICogZnJvbSAnLi9GaWxlRm9ybWF0JztcclxuZXhwb3J0ICogZnJvbSAnLi9GbGFnJztcclxuZXhwb3J0ICogZnJvbSAnLi9JbWFnZVF1YWxpdHknO1xyXG5leHBvcnQgKiBmcm9tICcuL0lTT1NlbnNpdGl2aXR5JztcclxuZXhwb3J0ICogZnJvbSAnLi9PYmplY3RFdmVudCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vT3B0aW9uJztcclxuZXhwb3J0ICogZnJvbSAnLi9PdXRwdXREZXZpY2UnO1xyXG5leHBvcnQgKiBmcm9tICcuL1NodXR0ZXJTcGVlZCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vU3RhdGVFdmVudCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vVGltZVpvbmUnO1xyXG5leHBvcnQgKiBmcm9tICcuL1ZvbHVtZSc7XHJcbnZhciBTVFVCID0gMTtcclxuU1RVQiA9IDE7XHJcbmV4cG9ydCB2YXIgd2F0Y2hDYW1lcmFzID0gZnVuY3Rpb24gKHRpbWVvdXQpIHtcclxuICAgIGlmICh0aW1lb3V0ID09PSB2b2lkIDApIHsgdGltZW91dCA9IDEwMDA7IH1cclxuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkIC0gc3R1YiBvbmx5LicpO1xyXG59O1xyXG5leHBvcnQgdmFyIGNhbWVyYUJyb3dzZXIgPSBuZXcgQ2FtZXJhQnJvd3NlcigpO1xyXG52YXIgQ2FtZXJhQXBpID0ge1xyXG4gICAgQXBlcnR1cmU6IEFwZXJ0dXJlLFxyXG4gICAgQXBpRXJyb3I6IEFwaUVycm9yLFxyXG4gICAgQ2FtZXJhOiBDYW1lcmEsXHJcbiAgICBDYW1lcmFCcm93c2VyOiBDYW1lcmFCcm93c2VyLFxyXG4gICAgQ2FtZXJhRmlsZTogQ2FtZXJhRmlsZSxcclxuICAgIENhbWVyYVByb3BlcnR5OiBDYW1lcmFQcm9wZXJ0eSxcclxuICAgIERpcmVjdG9yeTogRGlyZWN0b3J5LFxyXG4gICAgRXhwb3N1cmVDb21wZW5zYXRpb246IEV4cG9zdXJlQ29tcGVuc2F0aW9uLFxyXG4gICAgRmlsZUZvcm1hdDogRmlsZUZvcm1hdCxcclxuICAgIEZsYWc6IEZsYWcsXHJcbiAgICBJbWFnZVF1YWxpdHk6IEltYWdlUXVhbGl0eSxcclxuICAgIElTT1NlbnNpdGl2aXR5OiBJU09TZW5zaXRpdml0eSxcclxuICAgIE9iamVjdEV2ZW50OiBPYmplY3RFdmVudCxcclxuICAgIE9wdGlvbjogT3B0aW9uLFxyXG4gICAgT3V0cHV0RGV2aWNlOiBPdXRwdXREZXZpY2UsXHJcbiAgICBTaHV0dGVyU3BlZWQ6IFNodXR0ZXJTcGVlZCxcclxuICAgIFN0YXRlRXZlbnQ6IFN0YXRlRXZlbnQsXHJcbiAgICBUaW1lWm9uZTogVGltZVpvbmUsXHJcbiAgICBWb2x1bWU6IFZvbHVtZSxcclxuICAgIGNhbWVyYUJyb3dzZXI6IGNhbWVyYUJyb3dzZXIsXHJcbiAgICB3YXRjaENhbWVyYXM6IHdhdGNoQ2FtZXJhcyxcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgQ2FtZXJhQXBpO1xyXG4iXSwibmFtZXMiOlsiX2EiLCJfX2V4dGVuZHMiLCJ0aGlzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBRyxRQUFDLFFBQVEsSUFBSSxZQUFZO0lBQzVCLElBQUksU0FBUyxRQUFRLENBQUMsTUFBTSxFQUFFO0lBQzlCLFFBQVEsSUFB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USxJQUFJLEVBQUUsR0FBRztJQUNqQixRQUFRLElBQUksRUFBRSxHQUFHO0lBQ2pCLFFBQVEsSUFBSSxFQUFFLEdBQUc7SUFDakIsUUFBUSxJQUFJLEVBQUUsQ0FBQztJQUNmLFFBQVEsSUFBSSxFQUFFLEdBQUc7SUFDakIsUUFBUSxJQUFJLEVBQUUsR0FBRztJQUNqQixRQUFRLElBQUksRUFBRSxHQUFHO0lBQ2pCLFFBQVEsSUFBSSxFQUFFLEdBQUc7SUFDakIsUUFBUSxJQUFJLEVBQUUsR0FBRztJQUNqQixRQUFRLElBQUksRUFBRSxDQUFDO0lBQ2YsUUFBUSxJQUFJLEVBQUUsR0FBRztJQUNqQixRQUFRLElBQUksRUFBRSxHQUFHO0lBQ2pCLFFBQVEsSUFBSSxFQUFFLENBQUM7SUFDZixRQUFRLElBQUksRUFBRSxHQUFHO0lBQ2pCLFFBQVEsSUFBSSxFQUFFLEdBQUc7SUFDakIsUUFBUSxJQUFJLEVBQUUsR0FBRztJQUNqQixRQUFRLElBQUksRUFBRSxHQUFHO0lBQ2pCLFFBQVEsSUFBSSxFQUFFLENBQUM7SUFDZixRQUFRLElBQUksRUFBRSxDQUFDO0lBQ2YsUUFBUSxJQUFJLEVBQUUsR0FBRztJQUNqQixRQUFRLElBQUksRUFBRSxFQUFFO0lBQ2hCLFFBQVEsSUFBSSxFQUFFLEVBQUU7SUFDaEIsUUFBUSxJQUFJLEVBQUUsRUFBRTtJQUNoQixRQUFRLElBQUksRUFBRSxFQUFFO0lBQ2hCLFFBQVEsSUFBSSxFQUFFLEVBQUU7SUFDaEIsUUFBUSxJQUFJLEVBQUUsRUFBRTtJQUNoQixRQUFRLElBQUksRUFBRSxFQUFFO0lBQ2hCLFFBQVEsSUFBSSxFQUFFLEVBQUU7SUFDaEIsUUFBUSxJQUFJLEVBQUUsRUFBRTtJQUNoQixRQUFRLElBQUksRUFBRSxFQUFFO0lBQ2hCLFFBQVEsSUFBSSxFQUFFLEVBQUU7SUFDaEIsUUFBUSxJQUFJLEVBQUUsRUFBRTtJQUNoQixRQUFRLElBQUksRUFBRSxFQUFFO0lBQ2hCLFFBQVEsSUFBSSxFQUFFLEVBQUU7SUFDaEIsUUFBUSxJQUFJLEVBQUUsRUFBRTtJQUNoQixRQUFRLElBQUksRUFBRSxFQUFFO0lBQ2hCLFFBQVEsSUFBSSxFQUFFLEVBQUU7SUFDaEIsUUFBUSxJQUFJLEVBQUUsRUFBRTtJQUNoQixRQUFRLEtBQUssRUFBRSxFQUFFO0lBQ2pCLFFBQVEsS0FBSyxFQUFFLEVBQUU7SUFDakIsUUFBUSxLQUFLLEVBQUUsRUFBRTtJQUNqQixRQUFRLEtBQUssRUFBRSxFQUFFO0lBQ2pCLFFBQVEsS0FBSyxFQUFFLEVBQUU7SUFDakIsUUFBUSxLQUFLLEVBQUUsRUFBRTtJQUNqQixRQUFRLEtBQUssRUFBRSxFQUFFO0lBQ2pCLFFBQVEsS0FBSyxFQUFFLEdBQUc7SUFDbEIsS0FBSyxDQUFDO0lBQ04sSUFBSSxRQUFRLENBQUMsY0FBYyxHQUFHO0lBQzlCLFFBQVEsSUFBSSxFQUFFLEdBQUc7SUFDakIsUUFBUSxJQUFJLEVBQUUsR0FBRztJQUNqQixRQUFRLElBQUksRUFBRSxHQUFHO0lBQ2pCLFFBQVEsSUFBSSxFQUFFLEdBQUc7SUFDakIsUUFBUSxJQUFJLEVBQUUsRUFBRTtJQUNoQixLQUFLLENBQUM7SUFDTixJQUFJLFFBQVEsQ0FBQyxTQUFTLEdBQUc7SUFDekIsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNkLFFBQVEsSUFBSSxFQUFFLEdBQUc7SUFDakIsUUFBUSxJQUFJLEVBQUUsR0FBRztJQUNqQixRQUFRLElBQUksRUFBRSxHQUFHO0lBQ2pCLFFBQVEsSUFBSSxFQUFFLEdBQUc7SUFDakIsUUFBUSxJQUFJLEVBQUUsR0FBRztJQUNqQixRQUFRLElBQUksRUFBRSxHQUFHO0lBQ2pCLFFBQVEsSUFBSSxFQUFFLEdBQUc7SUFDakIsUUFBUSxJQUFJLEVBQUUsQ0FBQztJQUNmLFFBQVEsSUFBSSxFQUFFLEdBQUc7SUFDakIsUUFBUSxJQUFJLEVBQUUsR0FBRztJQUNqQixRQUFRLElBQUksRUFBRSxHQUFHO0lBQ2pCLFFBQVEsSUFBSSxFQUFFLEdBQUc7SUFDakIsUUFBUSxJQUFJLEVBQUUsR0FBRztJQUNqQixRQUFRLElBQUksRUFBRSxHQUFHO0lBQ2pCLFFBQVEsSUFBSSxFQUFFLEdBQUc7SUFDakIsUUFBUSxJQUFJLEVBQUUsQ0FBQztJQUNmLFFBQVEsSUFBSSxFQUFFLEdBQUc7SUFDakIsUUFBUSxJQUFJLEVBQUUsR0FBRztJQUNqQixRQUFRLElBQUksRUFBRSxDQUFDO0lBQ2YsUUFBUSxJQUFJLEVBQUUsR0FBRztJQUNqQixRQUFRLElBQUksRUFBRSxHQUFHO0lBQ2pCLFFBQVEsSUFBSSxFQUFFLEdBQUc7SUFDakIsUUFBUSxJQUFJLEVBQUUsR0FBRztJQUNqQixRQUFRLElBQUksRUFBRSxDQUFDO0lBQ2YsUUFBUSxJQUFJLEVBQUUsQ0FBQztJQUNmLFFBQVEsSUFBSSxFQUFFLEdBQUc7SUFDakIsUUFBUSxJQUFJLEVBQUUsRUFBRTtJQUNoQixRQUFRLElBQUksRUFBRSxFQUFFO0lBQ2hCLFFBQVEsSUFBSSxFQUFFLEVBQUU7SUFDaEIsUUFBUSxJQUFJLEVBQUUsRUFBRTtJQUNoQixRQUFRLElBQUksRUFBRSxFQUFFO0lBQ2hCLFFBQVEsSUFBSSxFQUFFLEVBQUU7SUFDaEIsUUFBUSxJQUFJLEVBQUUsRUFBRTtJQUNoQixRQUFRLElBQUksRUFBRSxFQUFFO0lBQ2hCLFFBQVEsSUFBSSxFQUFFLEVBQUU7SUFDaEIsUUFBUSxJQUFJLEVBQUUsRUFBRTtJQUNoQixRQUFRLElBQUksRUFBRSxFQUFFO0lBQ2hCLFFBQVEsSUFBSSxFQUFFLEVBQUU7SUFDaEIsUUFBUSxJQUFJLEVBQUUsRUFBRTtJQUNoQixRQUFRLElBQUksRUFBRSxFQUFFO0lBQ2hCLFFBQVEsSUFBSSxFQUFFLEVBQUU7SUFDaEIsUUFBUSxJQUFJLEVBQUUsRUFBRTtJQUNoQixRQUFRLElBQUksRUFBRSxFQUFFO0lBQ2hCLFFBQVEsSUFBSSxFQUFFLEVBQUU7SUFDaEIsUUFBUSxJQUFJLEVBQUUsRUFBRTtJQUNoQixRQUFRLEtBQUssRUFBRSxFQUFFO0lBQ2pCLFFBQVEsS0FBSyxFQUFFLEVBQUU7SUFDakIsUUFBUSxLQUFLLEVBQUUsRUFBRTtJQUNqQixRQUFRLEtBQUssRUFBRSxFQUFFO0lB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
