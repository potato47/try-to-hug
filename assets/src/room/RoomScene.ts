import { Board } from "./Board";
import { DIRECTION, PLAYER_ROLE } from "../Constants";
import { HugPanel } from "./HugPanel";
import { Timer } from "./Timer";
import { OverPanel } from "./OverPanel";

const {ccclass, property} = cc._decorator;

@ccclass
export class RoomScene extends cc.Component {
    
    @property(Board)
    public board: Board = null;
    @property(HugPanel)
    private hugPanel: HugPanel = null;
    @property(Timer)
    private timer: Timer = null;
    @property(cc.Label)
    private player1ScoreLabel: cc.Label = null;
    @property(cc.Label)
    private player2ScoreLabel: cc.Label = null;
    @property(OverPanel)
    private overPanel: OverPanel = null;

    private player1Score: number = 0;
    private player2Score: number = 0;
    private round: number = 0;

    protected start() {
        this.board.init(this);
        this.hugPanel.init(this);
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        this.addListeners();
        this.newGame();
    }

    private newGame() {
        this.timer.reset(60, -1, 0, this.onTimerOver.bind(this));
        this.timer.run();
        this.round++;
        this.board.activePlayers(this.round);
    }

    private onTimerOver() {
        this.board.pausePlayers();
        cc.log('攻守交换');
        if (this.round >= 2) {
            this.overGame();
        } else {
            this.node.getChildByName('ExchangeRole').getComponent(cc.Animation).play();
            this.newGame();
        }
    }

    private overGame() {
        if (this.player1Score > this.player2Score) {
            this.overPanel.show(true, this.player1Score, this.player2Score);     
        } else {
            this.overPanel.show(false, this.player2Score, this.player1Score);   
        }
        setTimeout(() => {
            cc.director.loadScene('loading');
        }, 10000);
    }

    onHug() {
        cc.log('show hug panel');
        this.board.pausePlayers();
        this.timer.pause();
        this.hugPanel.show();
    }

    onHugOver(score) {
        cc.log(score);
        if (this.board.player1.role === PLAYER_ROLE.ATTACK) {
            this.player1Score += score;
            this.player1ScoreLabel.string = this.player1Score + '';
        } else {
            this.player2Score += score;
            this.player2ScoreLabel.string = this.player2Score + '';
        }
        this.timer.resume();
        this.board.activePlayers(this.round);
    }

    private onKeyDown(event) {
        switch(event.keyCode) {
            case cc.KEY.w:
                this.board.movePlayer1(DIRECTION.UP);
                break;
            case cc.KEY.a:
                this.board.movePlayer1(DIRECTION.LEFT);
                break;
            case cc.KEY.s:
                this.board.movePlayer1(DIRECTION.DOWN);
                break;
            case cc.KEY.d:
                this.board.movePlayer1(DIRECTION.RIGHT);
                break;
            case cc.KEY.space:
                this.board.skillPlayer1();
                break;
            case cc.KEY.up:
                this.board.movePlayer2(DIRECTION.UP);
                break;
            case cc.KEY.left:
                this.board.movePlayer2(DIRECTION.LEFT);
                break;
            case cc.KEY.down:
                this.board.movePlayer2(DIRECTION.DOWN);
                break;
            case cc.KEY.right:
                this.board.movePlayer2(DIRECTION.RIGHT);
                break;
            case cc.KEY.enter:
                this.board.skillPlayer2();
                break;
            default:
                break;
        }
    }

    private onKeyUp(event) {
        switch(event.keyCode) {
            case cc.KEY.w:
                this.board.tryStopPlayer1(DIRECTION.UP);
                break;
            case cc.KEY.a:
                this.board.tryStopPlayer1(DIRECTION.LEFT);
                break;
            case cc.KEY.s:
                this.board.tryStopPlayer1(DIRECTION.DOWN);
                break;
            case cc.KEY.d:
                this.board.tryStopPlayer1(DIRECTION.RIGHT);
                break;
            case cc.KEY.space:
                // this.board.recoverPlayer1();
                break;
            case cc.KEY.up:
                this.board.tryStopPlayer2(DIRECTION.UP);
                break;
            case cc.KEY.left:
                this.board.tryStopPlayer2(DIRECTION.LEFT);
                break;
            case cc.KEY.down:
                this.board.tryStopPlayer2(DIRECTION.DOWN);
                break;
            case cc.KEY.right:
                this.board.tryStopPlayer2(DIRECTION.RIGHT);
                break;
            case cc.KEY.enter:
                // this.board.recoverPlayer2();
                break;
            default:
                break;
        }
    }

    private addListeners() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    private removeListeners() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    protected onDestroy() {
        this.removeListeners();
    }
}