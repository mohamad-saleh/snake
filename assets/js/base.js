class Base {
    //fields
    x = 0
    y = 0

    constructor(cols = 20, rows = 14) {
        this.cols = cols
        this.rows = rows
        this.defaultMove = 'east'
    }
    //Methods
    draw = (color) => {
        DOMHelper.draw({
            color: color,
            posX: this.positionX(this.x),
            posY: this.positionY(this.y),
            width: this.positionX(1),
            height: this.positionY(1)
        });
    }
    //Helpers
    positionX = c => Math.round(c * DOMHelper.canvas.width / this.cols)
    positionY = r => Math.round(r * DOMHelper.canvas.height / this.rows)
}