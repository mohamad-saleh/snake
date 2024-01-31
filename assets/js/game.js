class Game {
    constructor() {
        this.snakes = new SnakeList()
        this.apple = new Apple()
        this.lastMove = this.snakes.snakes[0].defaultMove
    }

    start = () => {
        this.draw()
        // Key events
        window.addEventListener('keydown', this.#checkKeyDownHandler)
        requestAnimationFrame(this.go(0))
    }

    draw = () => {
        DOMHelper.clear({
            posX: 0,
            posY: 0,
            width: DOMHelper.canvas.width,
            height: DOMHelper.canvas.height
        })
        DOMHelper.draw({
            color: 'rgba(34, 34, 34, 0.81)',
            posX: 0,
            posY: 0,
            width: DOMHelper.canvas.width,
            height: DOMHelper.canvas.height
        })
        this.snakes.draw();
        this.apple.draw('rgb(255, 50, 0)')
    }


    go = currentTime => nextTime => {
        if (!this.#willCrash()) {
            // if next time grater from current time 100ms will update state and go to next time
            if (nextTime - currentTime > 100) {
                this.updateState();
                this.draw()
                requestAnimationFrame(this.go(nextTime))
            } else {
                requestAnimationFrame(this.go(currentTime))
            }
        } else {
            DOMHelper.draw({
                color: 'rgb(255, 50, 0)',
                posX: 0,
                posY: 0,
                width: DOMHelper.canvas.width,
                height: DOMHelper.canvas.height
            })

            setTimeout(() => {
                this.snakes.reset()
                this.start()
            }, 100)

        }
    }

    updateState = () => {
        let headPos = this.#nextHead()
        let willEat = this.#willEat();
        this.snakes.snakes = willEat ?
            [new Snake(headPos.x, headPos.y)].concat(this.snakes.snakes) :
            [new Snake(headPos.x, headPos.y)].concat(dropLast(this.snakes.snakes))
        this.apple = willEat ? new Apple() : this.apple
    }

// helpers
    #willCrash = () => Boolean(this.snakes.snakes.find(pointEq(this.#nextHead())))

    #willEat = () => pointEq(this.#nextHead())(this.apple)

    #nextHead = () => {
        return !(this.snakes.snakes.length)
            ? {x: 2, y: 2}
            : {
                x: mod(this.snakes.cols)(this.snakes.snakes[0].x + availableMove[this.lastMove].x),
                y: mod(this.snakes.rows)(this.snakes.snakes[0].y + availableMove[this.lastMove].y)
            }
    }

    #checkMove = move => {
        this.lastMove = (availableMove[this.lastMove].x + availableMove[move].x) || (availableMove[this.lastMove].y + availableMove[move].y)
            ? move : this.lastMove
    }

    #checkKeyDownHandler = e => {
        switch (e.key) {
            case 'w':
            case 'h':
            case 'ArrowUp':
                this.#checkMove(NORTH)
                break
            case 'a':
            case 'j':
            case 'ArrowLeft':
                this.#checkMove(WEST)
                break
            case 's':
            case 'k':
            case 'ArrowDown':
                this.#checkMove(SOUTH)
                break
            case 'd':
            case 'l':
            case 'ArrowRight':
                this.#checkMove(EAST)
                break
        }
    }
}