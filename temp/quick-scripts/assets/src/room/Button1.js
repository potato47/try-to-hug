(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/room/Button1.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b994cc7gWNMm71EAaq1VLoF', 'Button1', __filename);
// src/room/Button1.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Button1 = /** @class */ (function (_super) {
    __extends(Button1, _super);
    function Button1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button1.prototype.onBtn1ShowFrame = function () {
        this.node.getChildByName('effect').active = true;
    };
    Button1.prototype.onBtn1HideFrame = function () {
        this.node.getChildByName('effect').active = false;
    };
    Button1 = __decorate([
        ccclass
    ], Button1);
    return Button1;
}(cc.Component));
exports.default = Button1;

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
        //# sourceMappingURL=Button1.js.map
        