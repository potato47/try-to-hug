const {ccclass, property} = cc._decorator;

@ccclass
export default class Button1 extends cc.Component {

    onBtn1ShowFrame() {
        this.node.getChildByName('effect').active = true;
    }

    onBtn1HideFrame() {
        this.node.getChildByName('effect').active = false;
    }

}
