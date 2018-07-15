"use strict";
cc._RF.push(module, 'e263dOl7EhHGJazTNa7FOau', 'OverPanel');
// src/room/OverPanel.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var OverPanel = /** @class */ (function (_super) {
    __extends(OverPanel, _super);
    function OverPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.firstLabel = null;
        _this.secondLabel = null;
        _this.firstPlayer1Icon = null;
        _this.firstPlayer2Icon = null;
        _this.secondPlayer1Icon = null;
        _this.secondPlayer2Icon = null;
        return _this;
    }
    OverPanel.prototype.show = function (isFirstPlayerWin, winScore, failScore) {
        this.node.active = true;
        this.firstLabel.string = winScore + '';
        this.secondLabel.string = failScore + '';
        if (isFirstPlayerWin) {
            this.firstPlayer1Icon.active = true;
            this.firstPlayer2Icon.active = false;
            this.secondPlayer1Icon.active = false;
            this.secondPlayer2Icon.active = true;
        }
        else {
            this.firstPlayer1Icon.active = false;
            this.firstPlayer2Icon.active = true;
            this.secondPlayer1Icon.active = true;
            this.secondPlayer2Icon.active = false;
        }
    };
    __decorate([
        property(cc.Label)
    ], OverPanel.prototype, "firstLabel", void 0);
    __decorate([
        property(cc.Label)
    ], OverPanel.prototype, "secondLabel", void 0);
    __decorate([
        property(cc.Node)
    ], OverPanel.prototype, "firstPlayer1Icon", void 0);
    __decorate([
        property(cc.Node)
    ], OverPanel.prototype, "firstPlayer2Icon", void 0);
    __decorate([
        property(cc.Node)
    ], OverPanel.prototype, "secondPlayer1Icon", void 0);
    __decorate([
        property(cc.Node)
    ], OverPanel.prototype, "secondPlayer2Icon", void 0);
    OverPanel = __decorate([
        ccclass
    ], OverPanel);
    return OverPanel;
}(cc.Component));
exports.OverPanel = OverPanel;

cc._RF.pop();