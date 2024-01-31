//Variable
const availableMove = {
    north: {x: 0, y: -1},
    south: {x: 0, y: 1},
    west: {x: -1, y: 0},
    east: {x: 1, y: 0}
}
const NORTH = 'north'
const SOUTH = 'south'
const WEST = 'west'
const EAST = 'east'

// function
const eq = x => y => x === y
const pointEq = p1 => p2 => eq(p1.x)(p2.x) && eq(p1.y)(p2.y)
const dropFirst = arr => arr.slice(1)
const dropLast = arr => arr.slice(0, arr.length - 1)
const rnd = min => max => Math.floor(Math.random() * max) + min
const mod = x => y => ((y % x) + x) % x

// CLasses
class DOMHelper {
    // Static properties
    static canvas = document.getElementById('canvas')
    static ctx = this.canvas.getContext('2d')
    // Static method
    static draw = obj => {
        this.ctx.fillStyle = obj.color
        this.ctx.fillRect(obj.posX, obj.posY, obj.width, obj.height)
    }

    static clear = obj => {
        this.ctx.clearRect(obj.posX, obj.posY, obj.width, obj.height)
    }
}