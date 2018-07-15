"use strict";
cc._RF.push(module, '0b7efI2i5VIH4ooIk25X3s3', 'RoomScene');
// src/room/RoomScene.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Board_1 = require("./Board");
var Constants_1 = require("../Constants");
var HugPanel_1 = require("./HugPanel");
var Timer_1 = require("./Timer");
var OverPanel_1 = require("./OverPanel");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RoomScene = /** @class */ (function (_super) {
    __extends(RoomScene, _super);
    function RoomScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.board = null;
        _this.hugPanel = null;
        _this.timer = null;
        _this.player1ScoreLabel = null;
        _this.player2ScoreLabel = null;
        _this.overPanel = null;
        _this.player1Score = 0;
        _this.player2Score = 0;
        _this.round = 0;
        return _this;
    }
    RoomScene.prototype.start = function () {
        this.board.init(this);
        this.hugPanel.init(this);
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        this.addListeners();
        this.newGame();
    };
    RoomScene.prototype.newGame = function () {
        this.timer.reset(60, -1, 0, this.onTimerOver.bind(this));
        this.timer.run();
        this.round++;
        this.board.activePlayers(this.round);
    };
    RoomScene.prototype.onTimerOver = function () {
        this.board.pausePlayers();
        cc.log('攻守交换');
        if (this.round >= 2) {
            this.overGame();
        }
        else {
            this.node.getChildByName('ExchangeRole').getComponent(cc.Animation).play();
            this.newGame();
        }
    };
    RoomScene.prototype.overGame = function () {
        if (this.player1Score > this.player2Score) {
            this.overPanel.show(true, this.player1Score, this.player2Score);
        }
        else {
            this.overPanel.show(false, this.player2Score, this.player1Score);
        }
        setTimeout(function () {
            cc.director.loadScene('loading');
        }, 10000);
    };
    RoomScene.prototype.onHug = function () {
        cc.log('show hug panel');
        this.board.pausePlayers();
        this.timer.pause();
        this.hugPanel.show();
    };
    RoomScene.prototype.onHugOver = function (score) {
        cc.log(score);
        if (this.board.player1.role === Constants_1.PLAYER_ROLE.ATTACK) {
            this.player1Score += score;
            this.player1ScoreLabel.string = this.player1Score + '';
        }
        else {
            this.player2Score += score;
            this.player2ScoreLabel.string = this.player2Score + '';
        }
        this.timer.resume();
        this.board.activePlayers(this.round);
    };
    RoomScene.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case cc.KEY.w:
                this.board.movePlayer1(Constants_1.DIRECTION.UP);
                break;
            case cc.KEY.a:
                this.board.movePlayer1(Constants_1.DIRECTION.LEFT);
                break;
            case cc.KEY.s:
                this.board.movePlayer1(Constants_1.DIRECTION.DOWN);
                break;
            case cc.KEY.d:
                this.board.movePlayer1(Constants_1.DIRECTION.RIGHT);
                break;
            case cc.KEY.space:
                this.board.skillPlayer1();
                break;
            case cc.KEY.up:
                this.board.movePlayer2(Constants_1.DIRECTION.UP);
                break;
            case cc.KEY.left:
                this.board.movePlayer2(Constants_1.DIRECTION.LEFT);
                break;
            case cc.KEY.down:
                this.board.movePlayer2(Constants_1.DIRECTION.DOWN);
                break;
            case cc.KEY.right:
                this.board.movePlayer2(Constants_1.DIRECTION.RIGHT);
                break;
            case cc.KEY.enter:
                this.board.skillPlayer2();
                break;
            default:
                break;
        }
    };
    RoomScene.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case cc.KEY.w:
                this.board.tryStopPlayer1(Constants_1.DIRECTION.UP);
                break;
            case cc.KEY.a:
                this.board.tryStopPlayer1(Constants_1.DIRECTION.LEFT);
                break;
            case cc.KEY.s:
                this.board.tryStopPlayer1(Constants_1.DIRECTION.DOWN);
                break;
            case cc.KEY.d:
                this.board.tryStopPlayer1(Constants_1.DIRECTION.RIGHT);
                break;
            case cc.KEY.space:
                // this.board.recoverPlayer1();
                break;
            case cc.KEY.up:
                this.board.tryStopPlayer2(Constants_1.DIRECTION.UP);
                break;
            case cc.KEY.left:
                this.board.tryStopPlayer2(Constants_1.DIRECTION.LEFT);
                break;
            case cc.KEY.down:
                this.board.tryStopPlayer2(Constants_1.DIRECTION.DOWN);
                break;
            case cc.KEY.right:
                this.board.tryStopPlayer2(Constants_1.DIRECTION.RIGHT);
                break;
            case cc.KEY.enter:
                // this.board.recoverPlayer2();
                break;
            default:
                break;
        }
    };
    RoomScene.prototype.addListeners = function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    RoomScene.prototype.removeListeners = function () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    RoomScene.prototype.onDestroy = function () {
        this.removeListeners();
    };
    __decorate([
        property(Board_1.Board)
    ], RoomScene.prototype, "board", void 0);
    __decorate([
        property(HugPanel_1.HugPanel)
    ], RoomScene.prototype, "hugPanel", void 0);
    __decorate([
        property(Timer_1.Timer)
    ], RoomScene.prototype, "timer", void 0);
    __decorate([
        property(cc.Label)
    ], RoomScene.prototype, "player1ScoreLabel", void 0);
    __decorate([
        property(cc.Label)
    ], RoomScene.prototype, "player2ScoreLabel", void 0);
    __decorate([
        property(OverPanel_1.OverPanel)
    ], RoomScene.prototype, "overPanel", void 0);
    RoomScene = __decorate([
        ccclass
    ], RoomScene);
    return RoomScene;
}(cc.Component));
exports.RoomScene = RoomScene;

cc._RF.pop();