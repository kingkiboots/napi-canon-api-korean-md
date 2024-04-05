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
var ObjectEvent = (function (_super) {
    __extends(ObjectEvent, _super);
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
export { ObjectEvent };
