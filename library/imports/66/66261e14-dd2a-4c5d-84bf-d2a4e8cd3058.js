"use strict";
cc._RF.push(module, '662614U3SpMXYS/0qTozTBY', 'LoadingScene');
// src/loading/LoadingScene.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LoadingScene = /** @class */ (function (_super) {
    __extends(LoadingScene, _super);
    function LoadingScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadingScene.prototype.start = function () {
    };
    LoadingScene.prototype.startGame = function () {
        cc.director.loadScene('room');
    };
    LoadingScene = __decorate([
        ccclass
    ], LoadingScene);
    return LoadingScene;
}(cc.Component));
exports.LoadingScene = LoadingScene;

cc._RF.pop();