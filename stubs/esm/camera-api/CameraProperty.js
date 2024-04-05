var STUB = 1;
STUB = 1;
STUB = 1;
STUB = 1;
STUB = 1;
STUB = 1;
STUB = 1;
STUB = 1;
var CameraProperty = (function () {
    function CameraProperty(camera, propertyID, propertySpecifier) {
        if (propertySpecifier === void 0) { propertySpecifier = 0; }
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
export { CameraProperty };
