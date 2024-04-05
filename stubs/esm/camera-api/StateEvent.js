var __extends = (this && this.__extends) || (function () {
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
import { ApiIdentifier } from './ApiIdentifier';
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
export { StateEvent };
