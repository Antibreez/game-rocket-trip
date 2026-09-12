import { GameSettings } from '../constants/GameSettings'
import SAT from 'sat'

export class PlayerModel {
    #x
    #y
    #height
    #width
    #prevY
    #speedFactor = 1
    #initialSpeed = 60
    #isOnEdge = false
    #directionFactor = 1
    #fireRate = 0
    #angle = 0
    #instance
    #collisionStarted = false

    constructor() {
        this.#x = GameSettings.PLAYER_X
        this.#y = GameSettings.CANVAS_HEIGHT / 2
        this.#height = GameSettings.PLAYER_HEIGHT
        this.#width = GameSettings.PLAYER_WIDTH

        this.#instance = new SAT.Polygon(new SAT.Vector(this.#x, this.#y), [
            new SAT.Vector(-this.#width / 2, -this.#height / 2),
            new SAT.Vector(this.#width / 2, -this.#height / 2),
            new SAT.Vector(this.#width / 2, this.#height / 2),
            new SAT.Vector(-this.#width / 2, this.#height / 2),
        ])
    }

    #interpolatedValue(a, b, t) {
        const k = this.#isOnEdge ? 0 : t
        return a + (b - a) * k
    }

    update(step, collision) {
        // console.log('####player model', this.#x, this.#y)
        if (this.#isOnEdge) return

        if (collision && !this.#collisionStarted) {
            this.#collisionStarted = true
            this.#directionFactor = 1
            this.#speedFactor = 1
        }

        this.#prevY = this.#y
        this.#y += step * this.#initialSpeed * this.#speedFactor * this.#directionFactor
        this.#speedFactor += 0.1
        this.#fireRate = 2.4 * (this.#speedFactor - 1) * this.#directionFactor
        // this.#fireRate = this.#fireRate + this.#directionFactor * 0.3
        this.#angle =
            this.#directionFactor < 0
                ? Math.max(this.#angle - 0.05 * (this.#speedFactor - 1), -10)
                : this.#angle + 0.02 * (this.#speedFactor - 1)

        if (this.#y + this.#height / 2 >= GameSettings.CANVAS_HEIGHT) {
            this.#y = GameSettings.CANVAS_HEIGHT - this.#height / 2
            this.#speedFactor = 1
            this.#fireRate = 0
            this.#isOnEdge = true
            this.#angle = 0
            return
        }

        if (this.#y - this.#height / 2 <= 0) {
            this.#y = this.#height / 2
            this.#speedFactor = 1
            this.#fireRate = 0
            this.#angle = 0
            this.#isOnEdge = true
        }
    }

    startBoost() {
        this.#directionFactor = -1
        this.#speedFactor = 1
        this.#isOnEdge = false
    }

    stopBoost() {
        this.#directionFactor = 1
        this.#speedFactor = 1
        this.#isOnEdge = false
    }

    getState(alpha) {
        // this.#instance.translate(0, -this.#lastTranslate)

        this.#instance.setAngle((this.#angle * Math.PI) / 180)

        this.#instance.pos = new SAT.Vector(
            this.#x,
            Math.min(
                GameSettings.CANVAS_HEIGHT - this.#height / 2,
                this.#interpolatedValue(this.#y, this.#prevY, alpha),
            ),
        )

        // console.log(
        //     '###PLAYER',
        //     this.#interpolatedValue(this.#y, this.#prevY, alpha) - this.#lastYPosition,
        // )
        // console.log(
        //     '###PLAYER',
        //     this.#instance.calcPoints,
        //     // this.#interpolatedValue(this.#y, this.#prevY, alpha),
        // )

        return {
            instance: this.#instance,
            fireRate: this.#fireRate,
            angle: this.#angle,
        }
    }
}
