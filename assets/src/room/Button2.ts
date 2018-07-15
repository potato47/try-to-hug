const {ccclass, property} = cc._decorator;

@ccclass
export default class Button2 extends cc.Component {

    onBtn2ShowFrame() {
        this.node.getChildByName('effect').active = true;
    }

    onBtn2HideFrame() {
        this.node.getChildByName('effect').active = false;
    }
}
