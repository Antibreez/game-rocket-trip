import { GameSettings } from '../constants/GameSettings'
import { CloudObstacles } from './obstacles/CloudObstacles'
import SAT from 'sat'

export class ObstaclesModel {
    #x
    #prevX
    #level
    #prevLevel
    #currentObstacles = []
    #nextObstacles = []

    update(state) {
        const { level, x, prevX } = state
        this.#level = level
        this.#x = x
        this.#prevX = prevX

        if (this.#prevLevel !== this.#level) {
            this.#prevLevel = this.#level

            if (level === 0) {
                this.#currentObstacles = []
            } else {
                this.#currentObstacles = [...this.#nextObstacles]
            }

            this.#nextObstacles = new CloudObstacles(level)

            console.log('####next obstacles', this.#currentObstacles)
        }
    }

    getState(alpha) {
        this.#currentObstacles.forEach((item) => {
            // if (idx < 1) {
            //     console.log(
            //         '######item',
            //         item.pos.x - this.#interpolatedValue(this.#x, this.#prevX, alpha),
            //     )
            // }

            // const x = item.pos.x
            const { instance, xPos } = item

            instance.pos = new SAT.Vector(
                xPos - this.#interpolatedValue(this.#x, this.#prevX, alpha),
                instance.pos.y,
            )

            // item.forEach(
            //     (dot) =>
            //         (dot.x = dot.staticX - this.#interpolatedValue(this.#x, this.#prevX, alpha)),
            // )
        })

        this.#nextObstacles.forEach((item) => {
            const { instance, xPos } = item

            instance.pos = new SAT.Vector(
                xPos -
                    this.#interpolatedValue(this.#x, this.#prevX, alpha) +
                    GameSettings.CANVAS_WIDTH,
                instance.pos.y,
            )
            // item.pos = new SAT.Vector(
            //     item.pos.x -
            //         this.#interpolatedValue(this.#x, this.#prevX, alpha) +
            //         GameSettings.CANVAS_WIDTH,
            //     item.pos.y,
            // )
            // item.forEach(
            //     (dot) =>
            //         (dot.x =
            //             GameSettings.CANVAS_WIDTH +
            //             dot.staticX -
            //             this.#interpolatedValue(this.#x, this.#prevX, alpha)),
            // )
        })

        return {
            currentObstacles: this.#currentObstacles.map((item) => item.instance),
            nextObstacles: this.#nextObstacles.map((item) => item.instance),
        }
    }

    #interpolatedValue(a, b, t) {
        return a + (b - a) * t
    }
}
