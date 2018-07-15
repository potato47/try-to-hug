(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/room/Timer.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3fe23AYFaJNW46wYatTfLY4', 'Timer', __filename);
// src/room/Timer.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Timer = /** @class */ (function (_super) {
    __extends(Timer, _super);
    function Timer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timerLabel = null;
        _this.isRunning = false;
        _this.time = 0;
        _this.order = 1;
        _this.completeTime = null;
        _this.completeCb = null;
        _this.isTimeOver = false;
        _this.isPause = false;
        return _this;
    }
    Timer.prototype.run = function () {
        this.schedule(this.tick, 0.1);
    };
    Timer.prototype.tick = function () {
        if (this.isPause)
            return;
        this.time += 0.1 * this.order;
        if (this.completeTime !== null) {
            if (this.order > 0 ? this.time >= this.completeTime : this.time <= this.completeTime) {
                this.time = this.completeTime;
                this.isTimeOver = true;
                this.stop();
                if (this.completeCb) {
                    this.completeCb();
                }
            }
        }
        this.timerLabel.string = this.time.toFixed(1) + " s";
    };
    Timer.prototype.stop = function () {
        this.unschedule(this.tick);
    };
    Timer.prototype.pause = function () {
        this.isPause = true;
    };
    Timer.prototype.resume = function () {
        this.isPause = false;
    };
    Timer.prototype.reset = function (time, order, completeTime, completeCb) {
        if (time === void 0) { time = 0; }
        if (order === void 0) { order = 1; }
        this.time = time;
        this.order = order;
        this.isTimeOver = false;
        this.timerLabel.string = time + ".0 s";
        if (completeCb) {
            this.completeCb = completeCb;
        }
        if (completeTime !== undefined) {
            this.completeTime = completeTime;
        }
    };
    __decorate([
        property(cc.Label)
    ], Timer.prototype, "timerLabel", void 0);
    Timer = __decorate([
        ccclass
    ], Timer);
    return Timer;
}(cc.Component));
exports.Timer = Timer;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Timer.js.map
        