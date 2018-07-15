const {ccclass, property} = cc._decorator;

@ccclass
export class OverPanel extends cc.Component {

    @property(cc.Label)
    firstLabel: cc.Label = null;
    @property(cc.Label)
    secondLabel: cc.Label = null;
    @property(cc.Node)
    firstPlayer1Icon: cc.Node = null;
    @property(cc.Node)
    firstPlayer2Icon: cc.Node = null;
    @property(cc.Node)
    secondPlayer1Icon: cc.Node = null;
    @property(cc.Node)
    secondPlayer2Icon: cc.Node = null;

    public show(isFirstPlayerWin: boolean, winScore: number, failScore: number) {
        this.node.active = true;
        this.firstLabel.string = winScore + '';
        this.secondLabel.string = failScore + '';
        if (isFirstPlayerWin) {
            this.firstPlayer1Icon.active = true;
            this.firstPlayer2Icon.active = false;
            this.secondPlayer1Icon.active = false;
            this.secondPlayer2Icon.active = true;
        } else {
            this.firstPlayer1Icon.active = false;
            this.firstPlayer2Icon.active = true;
            this.secondPlayer1Icon.active = true;
            this.secondPlayer2Icon.active = false;
        }
    }

}
