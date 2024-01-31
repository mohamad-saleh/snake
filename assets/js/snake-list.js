class SnakeList extends Base {
    constructor() {
        super()
        this.snakes = [new Snake(availableMove[this.defaultMove].x, availableMove[this.defaultMove].y)]
    }

    draw = () => {
        this.snakes.forEach(snake => snake.draw('rgb(0,200,50)'))
    }

    reset = () => {
        this.snakes = [new Snake(availableMove[this.defaultMove].x, availableMove[this.defaultMove].y)]
    }
}