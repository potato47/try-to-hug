"use strict";
cc._RF.push(module, '20b56pZ66VOq58Zks3nqrU8', 'Constants');
// src/Constants.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["LEFT"] = -1] = "LEFT";
    DIRECTION[DIRECTION["RIGHT"] = 1] = "RIGHT";
    DIRECTION[DIRECTION["UP"] = 2] = "UP";
    DIRECTION[DIRECTION["DOWN"] = -2] = "DOWN";
    DIRECTION[DIRECTION["IDLE"] = 0] = "IDLE";
})(DIRECTION = exports.DIRECTION || (exports.DIRECTION = {}));
var PLAYER_ROLE;
(function (PLAYER_ROLE) {
    PLAYER_ROLE[PLAYER_ROLE["NONE"] = 0] = "NONE";
    PLAYER_ROLE[PLAYER_ROLE["ATTACK"] = 1] = "ATTACK";
    PLAYER_ROLE[PLAYER_ROLE["DEFEND"] = -1] = "DEFEND";
})(PLAYER_ROLE = exports.PLAYER_ROLE || (exports.PLAYER_ROLE = {}));
var PLAYER_STATE;
(function (PLAYER_STATE) {
    PLAYER_STATE[PLAYER_STATE["NONE"] = 0] = "NONE";
    PLAYER_STATE[PLAYER_STATE["NORMAL"] = 1] = "NORMAL";
    PLAYER_STATE[PLAYER_STATE["FREEZE"] = 2] = "FREEZE";
    PLAYER_STATE[PLAYER_STATE["SPEED"] = 3] = "SPEED";
})(PLAYER_STATE = exports.PLAYER_STATE || (exports.PLAYER_STATE = {}));

cc._RF.pop();