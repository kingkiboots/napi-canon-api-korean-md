import { CameraProperty } from './CameraProperty';
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
export { Option };
