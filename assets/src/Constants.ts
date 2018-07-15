export enum DIRECTION {
    LEFT = -1,
    RIGHT = 1,
    UP = 2,
    DOWN = -2,
    IDLE = 0
}

export enum PLAYER_ROLE {
    NONE = 0,
    ATTACK = 1,
    DEFEND = -1
}

export enum PLAYER_STATE {
    NONE = 0,
    NORMAL = 1,
    FREEZE = 2,
    SPEED = 3,
}