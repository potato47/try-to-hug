import { RoomScene } from "./RoomScene";
import { PLAYER_ROLE } from "../Constants";

const {ccclass, property} = cc._decorator;

@ccclass
export class HugPanel extends cc.Component {

    @property(cc.Node)
    private helpFrameNode: cc.Node = null;
    @property(cc.Node)
    private noFrameNode: cc.Node = null;
    @property(cc.ProgressBar)
    private progressBar: cc.ProgressBar = null;

    private progress = 0;
    private roomScene: RoomScene;

    public init(roomScene: RoomScene) {
        this.roomScene = roomScene;
    }

    public show() {
        cc.log('show');
        this.node.parent.active = true;
        this.progress = 50;
        this.progressBar.progress = this.progress / 100;
        this.addListeners();
        setTimeout(() => {
            this.hide();
        }, 5000);
    }

    private hide() {
        this.node.parent.active = false;
        this.removeListeners();
        this.roomScene.onHugOver(this.progress);
    }

    private onPlayer1Click() {
        if (this.roomScene.board.player1.role === PLAYER_ROLE.ATTACK) {
            this.progress += 2;
            if (this.progress > 100) {
                this.progress = 100;
            }
            this.progressBar.progress = this.progress / 100;
        } else {
            this.progress -= 1;
            if (this.progress < 0) {
                this.progress = 0;
            }
            this.progressBar.progress = this.progress / 100;
        }

    }

    private onPlayer2Click() {
        if (this.roomScene.board.player1.role === PLAYER_ROLE.ATTACK) {
            this.progress -= 1;
            if (this.progress < 0) {
                this.progress = 0;
            }
            this.progressBar.progress = this.progress / 100;
        } else {
            this.progress += 2;
            if (this.progress > 100) {
                this.progress = 100;
            }
            this.progressBar.progress = this.progress / 100;
        }
    }

    private addListeners() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, (event) => {
            if (event.keyCode === cc.KEY.space) {
                this.onPlayer1Click();
            } else if (event.keyCode === cc.KEY.enter) {
                this.onPlayer2Click();
            }
        }, this);
    }

    private removeListeners() {
        cc.systemEvent.targetOff(this);
    }

    onHelpFrame() {
        this.helpFrameNode.active = true;
    }

    onNoFrame() {
        this.helpFrameNode.active = false;
        this.noFrameNode.active = true;
    }

    onHideFrame() {
        this.noFrameNode.active = false;
    }
}
