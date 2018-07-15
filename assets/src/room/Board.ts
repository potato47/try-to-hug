import { Player } from "./Player";
import { RoomScene } from "./RoomScene";
import { DIRECTION, PLAYER_ROLE } from "../Constants";

const {ccclass, property} = cc._decorator;

@ccclass
export class Board extends cc.Component {
    
    @property(Player)
    public player1: Player = null;
    @property(Player)
    public player2: Player = null;
    
    private roomScene: RoomScene = null;
    
    public init(roomScene: RoomScene) {
        this.roomScene = roomScene;
        this.player1.init(PLAYER_ROLE.ATTACK, this);
        this.player2.init(PLAYER_ROLE.DEFEND, this);
    }

    public onCollide() {
        let attactPlayer, defendPlayer;
        if (this.player1.role === PLAYER_ROLE.ATTACK) {
            attactPlayer = this.player1;
            defendPlayer = this.player2;
        } else {
            attactPlayer = this.player2;
            defendPlayer = this.player1;
        }
        this.getComponent(cc.AudioSource).play();
        if (defendPlayer.isAddArmor) {
            let offsetX = defendPlayer.node.x - attactPlayer.node.x;
            let offsetY = defendPlayer.node.y - attactPlayer.node.y;
            if (Math.abs(offsetX) > Math.abs(offsetY)) {
                if (offsetX > 0) {
                    attactPlayer.rebound(DIRECTION.LEFT);
                } else {
                    attactPlayer.rebound(DIRECTION.RIGHT);
                }
            } else {
                if (offsetY > 0) {
                    attactPlayer.rebound(DIRECTION.DOWN);
                } else {
                    attactPlayer.rebound(DIRECTION.UP);
                }
            }
        } else{
            this.roomScene.onHug();
        }
    }

    public movePlayer1(dir: DIRECTION) {
        this.player1.move(dir);
    }

    public skillPlayer1() {
        this.player1.useSkill();
    }

    public tryStopPlayer1(dir: DIRECTION) {
        this.player1.tryStop(dir);
    }

    public movePlayer2(dir: DIRECTION) {
        this.player2.move(dir);
    }

    public skillPlayer2() {
        this.player2.useSkill();
    }

    public tryStopPlayer2(dir: DIRECTION) {
        this.player2.tryStop(dir);
    }

    public pausePlayers() {
        this.player1.pause();
        this.player2.pause();
    }

    public activePlayers(round: number) {
        if (round % 2 === 1) {
            this.player1.active(PLAYER_ROLE.ATTACK);
            this.player2.active(PLAYER_ROLE.DEFEND);
        } else {
            this.player1.active(PLAYER_ROLE.DEFEND);
            this.player2.active(PLAYER_ROLE.ATTACK);
        }
    }

}