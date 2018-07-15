const {ccclass, property} = cc._decorator;

@ccclass
export class LoadingScene extends cc.Component {

    start() {

    }

    startGame() {
        cc.director.loadScene('room');
    }
}