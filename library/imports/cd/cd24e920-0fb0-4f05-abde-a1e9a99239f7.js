"use strict";
cc._RF.push(module, 'cd24ekgD7BPBaveoempkjn3', 'Board');
// src/room/Board.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = require("./Player");
var Constants_1 = require("../Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Board = /** @class */ (function (_super) {
    __extends(Board, _super);
    function Board() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.player1 = null;
        _this.player2 = null;
        _this.roomScene = null;
        return _this;
    }
    Board.prototype.init = function (roomScene) {
        this.roomScene = roomScene;
        this.player1.init(Constants_1.PLAYER_ROLE.ATTACK, this);
        this.player2.init(Constants_1.PLAYER_ROLE.DEFEND, this);
    };
    Board.prototype.onCollide = function () {
        var attactPlayer, defendPlayer;
        if (this.player1.role === Constants_1.PLAYER_ROLE.ATTACK) {
            attactPlayer = this.player1;
            defendPlayer = this.player2;
        }
        else {
            attactPlayer = this.player2;
            defendPlayer = this.player1;
        }
        this.getComponent(cc.AudioSource).play();
        if (defendPlayer.isAddArmor) {
            var offsetX = defendPlayer.node.x - attactPlayer.node.x;
            var offsetY = defendPlayer.node.y - attactPlayer.node.y;
            if (Math.abs(offsetX) > Math.abs(offsetY)) {
                if (offsetX > 0) {
                    attactPlayer.rebound(Constants_1.DIRECTION.LEFT);
                }
                else {
                    attactPlayer.rebound(Constants_1.DIRECTION.RIGHT);
                }
            }
            else {
                if (offsetY > 0) {
                    attactPlayer.rebound(Constants_1.DIRECTION.DOWN);
                }
                else {
                    attactPlayer.rebound(Constants_1.DIRECTION.UP);
                }
            }
        }
        else {
            this.roomScene.onHug();
        }
    };
    Board.prototype.movePlayer1 = function (dir) {
        this.player1.move(dir);
    };
    Board.prototype.skillPlayer1 = function () {
        this.player1.useSkill();
    };
    Board.prototype.tryStopPlayer1 = function (dir) {
        this.player1.tryStop(dir);
    };
    Board.prototype.movePlayer2 = function (dir) {
        this.player2.move(dir);
    };
    Board.prototype.skillPlayer2 = function () {
        this.player2.useSkill();
    };
    Board.prototype.tryStopPlayer2 = function (dir) {
        this.player2.tryStop(dir);
    };
    Board.prototype.pausePlayers = function () {
        this.player1.pause();
        this.player2.pause();
    };
    Board.prototype.activePlayers = function (round) {
        if (round % 2 === 1) {
            this.player1.active(Constants_1.PLAYER_ROLE.ATTACK);
            this.player2.active(Constants_1.PLAYER_ROLE.DEFEND);
        }
        else {
            this.player1.active(Constants_1.PLAYER_ROLE.DEFEND);
            this.player2.active(Constants_1.PLAYER_ROLE.ATTACK);
        }
    };
    __decorate([
        property(Player_1.Player)
    ], Board.prototype, "player1", void 0);
    __decorate([
        property(Player_1.Player)
    ], Board.prototype, "player2", void 0);
    Board = __decorate([
        ccclass
    ], Board);
    return Board;
}(cc.Component));
exports.Board = Board;

cc._RF.pop();