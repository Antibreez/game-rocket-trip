import { GameSettings } from '../../constants/GameSettings'
import { randomInteger } from '../../utils/randomInteger'
import SAT from 'sat'

export class CloudObstacles {
    #columns
    #rows
    #minSize
    #maxSize
    #sectors = []

    constructor(level) {
        if (level < 10) {
            this.#columns = 5
            this.#rows = 1
            this.#minSize = 20
            this.#maxSize = 80
        } else {
            this.#columns = 8
            this.#rows = 2
            this.#minSize = 20
            this.#maxSize = 80
        }

        const columnWidth = GameSettings.CANVAS_WIDTH / this.#columns
        const rowHeight = GameSettings.CANVAS_HEIGHT / this.#rows

        for (let i = 0; i < this.#rows; i += 1) {
            for (let j = 0; j < this.#columns; j += 1) {
                this.#sectors.push({
                    xMin: j * columnWidth,
                    xMax: (j + 1) * columnWidth,
                    yMin: i * rowHeight,
                    yMax: (i + 1) * rowHeight,
                })
            }
        }

        return this.#sectors.map((item) => this.#generateItem(item))

        // return [
        //     new SAT.Polygon(new SAT.Vector(100, 100), [
        //         new SAT.Vector(),
        //         new SAT.Vector(50, 100),
        //         new SAT.Vector(-50, 100),
        //     ]),
        // ]
    }

    #generateItem(item) {
        const { xMin, xMax, yMin, yMax } = item

        const size = randomInteger(this.#minSize, this.#maxSize)

        // console.log('###size', size)

        const leftX = randomInteger(xMin + 10, xMax - 10 - size)
        const topY = randomInteger(yMin + 10, yMax - 10 - size)

        return {
            xPos: leftX,
            instance: new SAT.Polygon(new SAT.Vector(leftX, topY), [
                new SAT.Vector(0, size / 4),
                new SAT.Vector(size / 4, 0),
                new SAT.Vector(size * 0.75, 0),
                new SAT.Vector(size, size / 4),
                new SAT.Vector(size, size * 0.75),
                new SAT.Vector(size * 0.75, size),
                new SAT.Vector(size / 4, size),
                new SAT.Vector(0, size * 0.75),
                new SAT.Vector(0, size / 4),
            ]),
        }

        // return [
        //     { x: leftX, staticX: leftX, y: topY + size / 4 },
        //     { x: leftX + size / 4, staticX: leftX + size / 4, y: topY },
        //     { x: leftX + size * 0.75, staticX: leftX + size * 0.75, y: topY },
        //     { x: leftX + size, staticX: leftX + size, y: topY + size / 4 },
        //     { x: leftX + size, staticX: leftX + size, y: topY + size * 0.75 },
        //     { x: leftX + size * 0.75, staticX: leftX + size * 0.75, y: topY + size },
        //     { x: leftX + size / 4, staticX: leftX + size / 4, y: topY + size },
        //     { x: leftX, staticX: leftX, y: topY + size * 0.75 },
        //     { x: leftX, staticX: leftX, y: topY + size / 4 },
        // ]
    }
}
