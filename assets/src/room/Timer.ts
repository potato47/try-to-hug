const {ccclass,property} = cc._decorator;

@ccclass
export class Timer extends cc.Component {

    @property(cc.Label)
    private timerLabel: cc.Label = null;
    
    private isRunning = false;
    public time:number = 0;
    public order = 1;
    public completeTime: number = null;
    private completeCb: Function = null;
    public isTimeOver = false;
    public isPause = false;

    public run() {
        this.schedule(this.tick,0.1);
    }

    private tick() {
        if (this.isPause) return;
        this.time += 0.1 * this.order;
        if (this.completeTime !== null) {
            if (this.order > 0 ? this.time >= this.completeTime : this.time <= this.completeTime) {
                this.time = this.completeTime;
                this.isTimeOver = true;
                this.stop();
                if (this.completeCb) {
                    this.completeCb();
                }
            }
        }
        this.timerLabel.string = this.time.toFixed(1) + " s";
    }

    public stop() {
        this.unschedule(this.tick);
    }

    public pause() {
        this.isPause = true;
    }

    public resume() {
        this.isPause = false
    }

    public reset(time = 0, order = 1, completeTime?: number, completeCb?: Function) {
        this.time = time;
        this.order = order;
        this.isTimeOver = false;
        this.timerLabel.string = time + ".0 s";
        if (completeCb) {
            this.completeCb = completeCb;
        }
        if (completeTime !== undefined) {
            this.completeTime = completeTime;
        }
    }
}