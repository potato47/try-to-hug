(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/src/room/Player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8578cDbAzxDg40VANQMJxtH', 'Player', __filename);
// src/room/Player.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = require("../Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 200;
        _this.animation = null;
        _this.dir = Constants_1.DIRECTION.IDLE;
        _this.lastSkillTime = 0;
        return _this;
    }
    Player.prototype.onLoad = function () {
        this.oriPos = this.node.position;
    };
    Player.prototype.resetPos = function () {
        this.node.position = this.oriPos;
    };
    Player.prototype.init = function (role, board) {
        this.collisionX = 0; //x轴是否碰撞，0：没有碰撞，-1：左方有碰撞，1：右方有碰撞
        this.collisionY = 0;
        this.touchingNumber = 0; //同时碰撞物体的个数
        this.isAddSpeed = false;
        this.isAddArmor = false;
        this.isFreeze = false;
        this.role = role;
        this.state = Constants_1.PLAYER_STATE.NONE;
        this.moveActions = [];
        this.board = board;
    };
    Player.prototype.active = function (role) {
        this.role = role;
        this.state = Constants_1.PLAYER_STATE.NORMAL;
        this.resetPos();
    };
    Player.prototype.pause = function () {
        this.state = Constants_1.PLAYER_STATE.NONE;
    };
    Player.prototype.resume = function () {
        this.state = Constants_1.PLAYER_STATE.NORMAL;
        this.resetPos();
    };
    Player.prototype.useSkill = function () {
        if (this.state === Constants_1.PLAYER_STATE.NONE)
            return;
        var skillTime = new Date().getTime();
        if (skillTime - this.lastSkillTime > 1000) {
            if (this.role === Constants_1.PLAYER_ROLE.ATTACK) {
                this.addSpeed();
            }
            else {
                this.addArmor();
            }
            this.lastSkillTime = skillTime;
        }
    };
    Player.prototype.addSpeed = function () {
        var _this = this;
        this.isAddSpeed = true;
        this.node.getChildByName('dialog').getChildByName('label').getComponent(cc.Label).string = '抱';
        this.node.getChildByName('dialog').active = true;
        setTimeout(function () {
            _this.isAddSpeed = false;
        }, 100);
        setTimeout(function () {
            _this.node.getChildByName('dialog').active = false;
        }, 500);
    };
    Player.prototype.addArmor = function () {
        var _this = this;
        if (this.isFreeze)
            return;
        this.isAddArmor = true;
        this.node.getChildByName('skill').active = true;
        this.dir = Constants_1.DIRECTION.IDLE;
        this.node.getChildByName('dialog').getChildByName('label').getComponent(cc.Label).string = '滚';
        this.node.getChildByName('dialog').active = true;
        setTimeout(function () {
            _this.isAddArmor = false;
            _this.node.getChildByName('skill').active = false;
            _this.updateDir();
            _this.node.getChildByName('dialog').active = false;
        }, 500);
    };
    Player.prototype.freeze = function () {
        var _this = this;
        this.isFreeze = true;
        this.node.getChildByName('freeze').active = true;
        this.dir = Constants_1.DIRECTION.IDLE;
        setTimeout(function () {
            _this.isFreeze = false;
            _this.node.getChildByName('freeze').active = false;
            _this.updateDir();
        }, 2000);
    };
    Player.prototype.rebound = function (dir) {
        var _this = this;
        this.dir = dir;
        this.isAddSpeed = true;
        setTimeout(function () {
            _this.isAddSpeed = false;
        }, 100);
    };
    Player.prototype.move = function (dir) {
        if (dir === this.dir) {
            return;
        }
        this.moveActions.push(dir);
        this.updateDir();
    };
    Player.prototype.updateDir = function () {
        var moveAction;
        if (this.moveActions.length > 0) {
            moveAction = this.moveActions[this.moveActions.length - 1];
        }
        else {
            moveAction = Constants_1.DIRECTION.IDLE;
        }
        this.dir = moveAction;
        switch (this.dir) {
            case Constants_1.DIRECTION.LEFT:
                this.animation.play('move_left');
                break;
            case Constants_1.DIRECTION.RIGHT:
                this.animation.play('move_right');
                break;
            case Constants_1.DIRECTION.UP:
                this.animation.play('move_up');
                break;
            case Constants_1.DIRECTION.DOWN:
                this.animation.play('move_down');
                break;
        }
    };
    Player.prototype.tryStop = function (dir) {
        var i = this.moveActions.indexOf(dir);
        this.moveActions.splice(i);
        if (this.dir === dir) {
            this.updateDir();
        }
    };
    Player.prototype.onCollisionEnter = function (other, self) {
        // this.node.color = cc.Color.RED;
        this.touchingNumber++;
        // 1st step 
        // get pre aabb, go back before collision
        var otherAabb = other.world.aabb;
        var otherPreAabb = other.world.preAabb.clone();
        var selfAabb = self.world.aabb;
        var selfPreAabb = self.world.preAabb.clone();
        // 2nd step
        // forward x-axis, check whether collision on x-axis
        selfPreAabb.x = selfAabb.x;
        otherPreAabb.x = otherAabb.x;
        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            if (this.dir === Constants_1.DIRECTION.LEFT && (selfPreAabb.xMax > otherPreAabb.xMax)) {
                // this.node.x = otherPreAabb.xMax - this.node.parent.x;
                this.node.x += (otherPreAabb.xMax - selfAabb.xMin + 1);
                this.collisionX = -1;
            }
            else if (this.dir === Constants_1.DIRECTION.RIGHT && (selfPreAabb.xMin < otherPreAabb.xMin)) {
                // this.node.x = otherPreAabb.xMin - selfPreAabb.width - this.node.parent.x;
                this.node.x -= (selfAabb.xMax - otherPreAabb.xMin + 1);
                this.collisionX = 1;
            }
            this.dir = Constants_1.DIRECTION.IDLE;
            other.touchingX = true;
            // return;
        }
        // 3rd step
        // forward y-axis, check whether collision on y-axis
        selfPreAabb.y = selfAabb.y;
        otherPreAabb.y = otherAabb.y;
        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            if (this.dir === Constants_1.DIRECTION.DOWN && (selfPreAabb.yMax > otherPreAabb.yMax)) {
                // this.node.y = otherPreAabb.yMax - this.node.parent.y;
                this.node.y += (otherPreAabb.yMax - selfAabb.yMin + 1);
                this.collisionY = -1;
            }
            else if (this.dir === Constants_1.DIRECTION.UP && (selfPreAabb.yMin < otherPreAabb.yMin)) {
                // this.node.y = otherPreAabb.yMin - selfPreAabb.height - this.node.parent.y;
                this.node.y -= (selfAabb.yMax - otherPreAabb.yMin + 1);
                this.collisionY = 1;
            }
            this.dir = Constants_1.DIRECTION.IDLE;
            other.touchingY = true;
        }
        if (other.tag === 1 && this.role === Constants_1.PLAYER_ROLE.ATTACK) {
            this.board.onCollide();
        }
        if (other.tag === 4) {
            this.freeze();
        }
    };
    Player.prototype.onCollisionExit = function (other) {
        this.touchingNumber--;
        if (this.touchingNumber === 0) {
            this.node.color = cc.Color.WHITE;
        }
        if (other.touchingX) {
            this.collisionX = 0;
            other.touchingX = false;
        }
        else if (other.touchingY) {
            other.touchingY = false;
            this.collisionY = 0;
        }
    };
    Player.prototype.update = function (dt) {
        if (this.state === Constants_1.PLAYER_STATE.NONE || this.dir === Constants_1.DIRECTION.IDLE || this.isAddArmor || this.isFreeze)
            return;
        switch (this.dir) {
            case Constants_1.DIRECTION.LEFT:
                this.node.x -= this.isAddSpeed ? this.speed * dt * 4 : this.speed * dt;
                break;
            case Constants_1.DIRECTION.RIGHT:
                this.node.x += this.isAddSpeed ? this.speed * dt * 4 : this.speed * dt;
                break;
            case Constants_1.DIRECTION.UP:
                this.node.y += this.isAddSpeed ? this.speed * dt * 4 : this.speed * dt;
                break;
            case Constants_1.DIRECTION.DOWN:
                this.node.y -= this.isAddSpeed ? this.speed * dt * 4 : this.speed * dt;
                break;
        }
    };
    __decorate([
        property(cc.Float)
    ], Player.prototype, "speed", void 0);
    __decorate([
        property(cc.Animation)
    ], Player.prototype, "animation", void 0);
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(cc.Component));
exports.Player = Player;

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
        //# sourceMappingURL=Player.js.map
        