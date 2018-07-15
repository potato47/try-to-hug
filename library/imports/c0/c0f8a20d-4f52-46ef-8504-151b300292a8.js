"use strict";
cc._RF.push(module, 'c0f8aINT1JG74UEFRswApKo', 'Button2');
// src/room/Button2.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Button2 = /** @class */ (function (_super) {
    __extends(Button2, _super);
    function Button2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button2.prototype.onBtn2ShowFrame = function () {
        this.node.getChildByName('effect').active = true;
    };
    Button2.prototype.onBtn2HideFrame = function () {
        this.node.getChildByName('effect').active = false;
    };
    Button2 = __decorate([
        ccclass
    ], Button2);
    return Button2;
}(cc.Component));
exports.default = Button2;

cc._RF.pop();