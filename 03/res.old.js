import { readInputFileContents } from "../utils/readInputFileContents.js"
const input = readInputFileContents("03/input.txt")

const SYMBOLS = ["@", "#", "/", "=", "*", "+", "-", "$", "%", "&"]

class Cell {
    constructor(x, y, content = ".") {
        this._x = x
        this._y = y
        this._content = content
    }
    get x() {
        return this._x
    }
    get y() {
        return this._y
    }
    set content(value) {
        return (this._content = value)
    }
    get content() {
        return this._content
    }
}

class Grid {
    constructor(width, height) {
        this._width = width
        this._height = height
        this._data = []
        this.create()
    }
    create() {
        for (let i = 1; i <= this._width; i++) {
            for (let j = 1; j <= this._height; j++) {
                this._data.push(new Cell(i, j))
            }
        }
    }
    cell(x, y) {
        if (x > this._width || x < 1 || y > this._height || y < 1) return undefined
        return this._data[(x - 1) * this._width + y - 1]
    }
    populate(input) {
        const values = input.replaceAll("\r\n", "").split("")
        values.forEach((value, index) => {
            let x = Math.floor(index / this._width) + 1
            let y = (index % this._height) + 1
            this.cell(x, y).content = value
        })
    }
    findGroups() {
        const matchingNodes = []
        const visitedNodes = []
        this._data.forEach((node) => {
            if (visitedNodes.includes(node) || isNaN(node.content)) return
            visitedNodes.push(node)
            const matchingNode = [node]
            const nextCoords = {
                x: node.x + 1,
                y: node.y,
            }
            while (!isNaN(this.cell(nextCoords.x, nextCoords.y)?.content)) {
                matchingNode.push(this.cell(nextCoords.x, nextCoords.y))
                visitedNodes.push(this.cell(nextCoords.x, nextCoords.y))
                nextCoords.x += 1
            }
            nextCoords.x = node.x
            nextCoords.y = node.y + 1
            while (!isNaN(this.cell(nextCoords.x, nextCoords.y)?.content)) {
                matchingNode.push(this.cell(nextCoords.x, nextCoords.y))
                visitedNodes.push(this.cell(nextCoords.x, nextCoords.y))
                nextCoords.y += 1
            }
            matchingNodes.push(matchingNode)
        })
        matchingNodes.forEach((nodes) => {
            let xmin,
                ymin = Infinity
            let xmax,
                ymax = 0
            nodes.forEach((node) => {
                if (xmin > node.x) xmin = node.x
                if (ymin > node.y) ymin = node.y
                if (xmax < node.x) xmax = node.x
                if (ymax < node.y) ymax = node.y
            })
            for (let dX = xmin - 1; dX <= xmax + 1; dX++) {
                for (let dY = ymin - 1; dY <= ymax + 1; dY++) {
                    if (SYMBOLS.include(this.cell(dX, dY).content)) return
                }
            }
            matchingNodes.shift()
            
        })
        console.log(matchingNodes)
    }
}

const grid = new Grid(141, 141)
grid.populate(input)
grid.findGroups()
