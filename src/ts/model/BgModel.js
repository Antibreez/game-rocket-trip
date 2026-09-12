export class BgModel {
    #x = 0
    #prevX = 0
    #colors = ['rgba(0 255 0 / 30%)', 'rgba(0 0 255 / 30%)', 'rgba(255 0 0 / 30%)']
    #currentColorIndex = 0
    #nextColorIndex = 1

    update(state) {
        const { prevX, x, level } = state

        this.#prevX = prevX
        this.#x = x

        this.#currentColorIndex = level % this.#colors.length
        this.#nextColorIndex = (level + 1) % this.#colors.length
    }

    getState(alpha) {
        return {
            x: this.#interpolatedValue(this.#x, this.#prevX, alpha),
            currentColor: this.#colors[this.#currentColorIndex],
            nextColor: this.#colors[this.#nextColorIndex],
        }
    }

    #interpolatedValue(a, b, t) {
        return a + (b - a) * t
    }
}
