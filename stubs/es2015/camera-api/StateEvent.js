var _a;
import { ApiIdentifier } from './ApiIdentifier';
export class StateEvent extends ApiIdentifier {
    /**
     * Encapsulate Object Event Identifiers For Easy Read And Debug
     * @class StateEvent
     * @extends ApiIdentifier
     * @param {number} identifier
     */
    constructor(identifier) {
        super(identifier, StateEvent.ID);
        this[_a] = 'StateEvent';
    }
    /**
     * @param {number | StateEvent} other The other value
     * @return {boolean}
     */
    equalTo(other) {
        return super.equalTo(+other);
    }
}
_a = Symbol.toStringTag;
// Generate: StateEvent
/**
 * @readonly
 * @enum {number}
 */
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
