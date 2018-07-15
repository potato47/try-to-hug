"use strict";
cc._RF.push(module, 'd58f2c+GgVJ7JvkIsoKkwIx', 'HugPanel');
// src/room/HugPanel.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = require("../Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HugPanel = /** @class */ (function (_super) {
    __extends(HugPanel, _super);
    function HugPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.helpFrameNode = null;
        _this.noFrameNode = null;
        _this.progressBar = null;
        _this.progress = 0;
        return _this;
    }
    HugPanel.prototype.init = function (roomScene) {
        this.roomScene = roomScene;
    };
    HugPanel.prototype.show = function () {
        var _this = this;
        cc.log('show');
        this.node.parent.active = true;
        this.progress = 50;
        this.progressBar.progress = this.progress / 100;
        this.addListeners();
        setTimeout(function () {
            _this.hide();
        }, 5000);
    };
    HugPanel.prototype.hide = function () {
        this.node.parent.active = false;
        this.removeListeners();
        this.roomScene.onHugOver(this.progress);
    };
    HugPanel.prototype.onPlayer1Click = function () {
        if (this.roomScene.board.player1.role === Constants_1.PLAYER_ROLE.ATTACK) {
            this.progress += 2;
            if (this.progress > 100) {
                this.progress = 100;
            }
            this.progressBar.progress = this.progress / 100;
        }
        else {
            this.progress -= 1;
            if (this.progress < 0) {
                this.progress = 0;
            }
            this.progressBar.progress = this.progress / 100;
        }
    };
    HugPanel.prototype.onPlayer2Click = function () {
        if (this.roomScene.board.player1.role === Constants_1.PLAYER_ROLE.ATTACK) {
            this.progress -= 1;
            if (this.progress < 0) {
                this.progress = 0;
            }
            this.progressBar.progress = this.progress / 100;
        }
        else {
            this.progress += 2;
            if (this.progress > 100) {
                this.progress = 100;
            }
            this.progressBar.progress = this.progress / 100;
        }
    };
    HugPanel.prototype.addListeners = function () {
        var _this = this;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function (event) {
            if (event.keyCode === cc.KEY.space) {
                _this.onPlayer1Click();
            }
            else if (event.keyCode === cc.KEY.enter) {
                _this.onPlayer2Click();
            }
        }, this);
    };
    HugPanel.prototype.removeListeners = function () {
        cc.systemEvent.targetOff(this);
    };
    HugPanel.prototype.onHelpFrame = function () {
        this.helpFrameNode.active = true;
    };
    HugPanel.prototype.onNoFrame = function () {
        this.helpFrameNode.active = false;
        this.noFrameNode.active = true;
    };
    HugPanel.prototype.onHideFrame = function () {
        this.noFrameNode.active = false;
    };
    __decorate([
        property(cc.Node)
    ], HugPanel.prototype, "helpFrameNode", void 0);
    __decorate([
        property(cc.Node)
    ], HugPanel.prototype, "noFrameNode", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], HugPanel.prototype, "progressBar", void 0);
    HugPanel = __decorate([
        ccclass
    ], HugPanel);
    return HugPanel;
}(cc.Component));
exports.HugPanel = HugPanel;

cc._RF.pop();