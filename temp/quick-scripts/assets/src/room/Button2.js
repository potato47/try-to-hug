(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/room/Button2.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c0f8aINT1JG74UEFRswApKo', 'Button2', __filename);
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
        //# sourceMappingURL=Button2.js.map
        