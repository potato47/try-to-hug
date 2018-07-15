import { DIRECTION, PLAYER_ROLE, PLAYER_STATE } from "../Constants";
import { RoomScene } from "./RoomScene";
import { Board } from "./Board";

const {ccclass, property} = cc._decorator;

@ccclass
export class Player extends cc.Component {

    @property(cc.Float)
    private speed: number = 200;
    @property(cc.Animation)
    private animation: cc.Animation = null;

    private dir = DIRECTION.IDLE;
    private collisionX: number;
    private collisionY: number;
    private touchingNumber: number;
    public isAddSpeed: boolean;
    public isAddArmor: boolean;
    public isFreeze: boolean;
    public role: PLAYER_ROLE;
    private moveActions: Array<DIRECTION>;
    private board: Board;
    private oriPos: cc.Vec2;
    private state: PLAYER_STATE;
    private lastSkillTime: number = 0;

    protected onLoad() {
        this.oriPos = this.node.position;
    }

    public resetPos() {
        this.node.position = this.oriPos;
    }

    public init(role: PLAYER_ROLE, board: Board) {
        this.collisionX = 0;//x轴是否碰撞，0：没有碰撞，-1：左方有碰撞，1：右方有碰撞
        this.collisionY = 0;
        this.touchingNumber = 0;//同时碰撞物体的个数
        this.isAddSpeed = false;
        this.isAddArmor = false;
        this.isFreeze = false;
        this.role = role;
        this.state = PLAYER_STATE.NONE;
        this.moveActions = [];
        this.board = board;
    }

    public active(role: PLAYER_ROLE) {
        this.role = role;
        this.state = PLAYER_STATE.NORMAL;
        this.resetPos();
    }

    public pause() {
        this.state = PLAYER_STATE.NONE;
    }

    public resume() {
        this.state = PLAYER_STATE.NORMAL;
        this.resetPos();
    }

    public useSkill() {
        if (this.state === PLAYER_STATE.NONE) return;
        let skillTime = new Date().getTime();
        if (skillTime - this.lastSkillTime > 1000) {
            if (this.role === PLAYER_ROLE.ATTACK) {
                this.addSpeed();
            } else {
                this.addArmor();
            }
            this.lastSkillTime = skillTime;
        }
    }

    private addSpeed() {
        this.isAddSpeed = true;
        this.node.getChildByName('dialog').getChildByName('label').getComponent(cc.Label).string = '抱';
        this.node.getChildByName('dialog').active = true;
        setTimeout(() => {
            this.isAddSpeed = false;
        }, 100);
        setTimeout(() => {
            this.node.getChildByName('dialog').active = false;
        }, 500);
    }

    private addArmor() {
        if (this.isFreeze) return;
        this.isAddArmor = true;
        this.node.getChildByName('skill').active = true;
        this.dir = DIRECTION.IDLE;
        this.node.getChildByName('dialog').getChildByName('label').getComponent(cc.Label).string = '滚';
        this.node.getChildByName('dialog').active = true;
        setTimeout(() => {
            this.isAddArmor = false;
            this.node.getChildByName('skill').active = false;
            this.updateDir();
            this.node.getChildByName('dialog').active = false;
        }, 500);
    }

    public freeze() {
        this.isFreeze = true;
        this.node.getChildByName('freeze').active = true;
        this.dir = DIRECTION.IDLE;
        setTimeout(() => {
            this.isFreeze = false;
            this.node.getChildByName('freeze').active = false;
            this.updateDir();
        }, 2000);
    }

    public rebound(dir: DIRECTION) {
        this.dir = dir;
        this.isAddSpeed = true;
        setTimeout(() => {
            this.isAddSpeed = false;
        }, 100);
    }

    public move(dir: DIRECTION) {
        if (dir === this.dir) {
            return;
        }
        this.moveActions.push(dir);
        this.updateDir();
        
    }

    private updateDir() {
        let moveAction;
        if (this.moveActions.length > 0) {
            moveAction = this.moveActions[this.moveActions.length - 1];
        } else {
            moveAction = DIRECTION.IDLE;
        }
        this.dir = moveAction;
        switch(this.dir) {
            case DIRECTION.LEFT:
                this.animation.play('move_left');
                break;
            case DIRECTION.RIGHT:
                this.animation.play('move_right');
                break;
            case DIRECTION.UP:
                this.animation.play('move_up');
                break;
            case DIRECTION.DOWN:
                this.animation.play('move_down');
                break;
        }
    }

    public tryStop(dir) {
        let i = this.moveActions.indexOf(dir);
        this.moveActions.splice(i);
        if (this.dir === dir) {
            this.updateDir();
        }
    }

    onCollisionEnter(other, self) {
        // this.node.color = cc.Color.RED;
        this.touchingNumber++;
        // 1st step 
        // get pre aabb, go back before collision
        let otherAabb = other.world.aabb;
        let otherPreAabb = other.world.preAabb.clone();

        let selfAabb = self.world.aabb;
        let selfPreAabb = self.world.preAabb.clone();

        // 2nd step
        // forward x-axis, check whether collision on x-axis
        selfPreAabb.x = selfAabb.x;
        otherPreAabb.x = otherAabb.x;

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            if (this.dir === DIRECTION.LEFT && (selfPreAabb.xMax > otherPreAabb.xMax)) {
                // this.node.x = otherPreAabb.xMax - this.node.parent.x;
                this.node.x += (otherPreAabb.xMax - selfAabb.xMin + 1);
                this.collisionX = -1;
            } else if (this.dir === DIRECTION.RIGHT && (selfPreAabb.xMin < otherPreAabb.xMin)) {
                // this.node.x = otherPreAabb.xMin - selfPreAabb.width - this.node.parent.x;
                this.node.x -= (selfAabb.xMax - otherPreAabb.xMin + 1);
                this.collisionX = 1;
            }

            this.dir = DIRECTION.IDLE;
            other.touchingX = true;
            // return;
        }

        // 3rd step
        // forward y-axis, check whether collision on y-axis
        selfPreAabb.y = selfAabb.y;
        otherPreAabb.y = otherAabb.y;

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            if (this.dir === DIRECTION.DOWN && (selfPreAabb.yMax > otherPreAabb.yMax)) {
                // this.node.y = otherPreAabb.yMax - this.node.parent.y;
                this.node.y += (otherPreAabb.yMax - selfAabb.yMin + 1);
                this.collisionY = -1;
            } else if (this.dir === DIRECTION.UP && (selfPreAabb.yMin < otherPreAabb.yMin)) {
                // this.node.y = otherPreAabb.yMin - selfPreAabb.height - this.node.parent.y;
                this.node.y -= (selfAabb.yMax - otherPreAabb.yMin + 1);
                this.collisionY = 1;
            }
            this.dir = DIRECTION.IDLE;
            other.touchingY = true;
        }
        if (other.tag === 1 && this.role === PLAYER_ROLE.ATTACK) {
            this.board.onCollide();
        } 
        if (other.tag === 4) {
            this.freeze();
        }
    }

    onCollisionExit (other) {
        this.touchingNumber--;
        if (this.touchingNumber === 0) {
            this.node.color = cc.Color.WHITE;
        }

        if (other.touchingX) {
            this.collisionX = 0;
            other.touchingX = false;
        } else if (other.touchingY) {
            other.touchingY = false;
            this.collisionY = 0;
        }
    }

    protected update(dt: number) {
        if (this.state === PLAYER_STATE.NONE || this.dir === DIRECTION.IDLE || this.isAddArmor || this.isFreeze) return;
        switch(this.dir) {
            case DIRECTION.LEFT:
                this.node.x -= this.isAddSpeed ? this.speed * dt * 4 : this.speed * dt;
                break;
            case DIRECTION.RIGHT:
                this.node.x += this.isAddSpeed ? this.speed * dt * 4 : this.speed * dt;
                break;
            case DIRECTION.UP:
                this.node.y += this.isAddSpeed ? this.speed * dt * 4 :this.speed * dt;
                break;
            case DIRECTION.DOWN:
                this.node.y -= this.isAddSpeed ? this.speed * dt * 4 : this.speed * dt;
                break;
        }
    }
}