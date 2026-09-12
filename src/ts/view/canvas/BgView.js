import { GameSettings } from '../../constants/GameSettings'

export class BgView {
    #ctx

    constructor(ctx) {
        this.#ctx = ctx
    }

    render(state) {
        const { x, currentColor, nextColor } = state

        // this.#ctx.save()
        this.#ctx.fillStyle = currentColor
        this.#ctx.fillRect(0 - x, 0, GameSettings.CANVAS_WIDTH, GameSettings.CANVAS_HEIGHT)
        this.#ctx.fillStyle = nextColor
        this.#ctx.fillRect(
            GameSettings.CANVAS_WIDTH - x,
            0,
            GameSettings.CANVAS_WIDTH,
            GameSettings.CANVAS_HEIGHT,
        )

        // this.#ctx.save()
        // this.#ctx.translate(100, 50)
        // this.#ctx.strokeStyle = 'black'
        // this.#ctx.beginPath()
        // this.#ctx.moveTo(-10, -10)
        // this.#ctx.lineTo(10, -10)
        // this.#ctx.lineTo(0, 10)
        // this.#ctx.lineTo(-10, -10)
        // this.#ctx.closePath()
        // this.#ctx.stroke()
        // this.#ctx.restore()
    }
}
