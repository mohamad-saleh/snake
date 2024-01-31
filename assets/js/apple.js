class Apple extends Base {
    constructor() {
        super();
        this.x = rnd(0)(this.cols - 1)
        this.y = rnd(0)(this.rows - 1)
    }
}