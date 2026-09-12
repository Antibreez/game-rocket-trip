import { EventDispatcher } from '../core/EventDispatcher'
import { EventTypes } from '../constants/EventTypes'

export class GameLoop extends EventDispatcher {
    #settings = {}
    #step
    #rAf
    #stepMs
    #last = 0
    #alpha
    #acc = 0
    // #testTime = 0
    #updated = false
    #stoped = false

    constructor(settings = {}) {
        super()

        this.#settings = {
            fps: 60,
            ...settings,
        }

        this.#step = 1 / this.#settings.fps
        this.#stepMs = this.#step * 1000

        this._loop = this.#loop.bind(this)
    }

    start() {
        this.#stoped = false
        this.#rAf = requestAnimationFrame(this._loop)
    }

    stop() {
        this.#stoped = true
        cancelAnimationFrame(this.#rAf)
    }

    #loop(time) {
        if (this.#stoped) return
        // if (!this.#testTime) this.#testTime = time

        // if (time - this.#testTime < 200) {
        //     this.#rAf = requestAnimationFrame(this._loop)
        //     return
        // }

        // this.#testTime = time

        if (!this.#last) this.#last = time

        const frameMs = time - this.#last

        this.#last = time

        this.#acc += Math.min(frameMs, 250)

        // console.log('## frameMs !!!!', frameMs)
        // console.log('## stepMs !!!!', this.#stepMs)
        // console.log('##acc =====', this.#acc)

        while (this.#acc >= this.#stepMs) {
            // console.log('##==========================')

            this.dispatch(EventTypes.UPDATE_GAME, this.#step)

            this.#acc -= this.#stepMs
            // console.log('##acc =====', this.#acc)
            this.#updated = true
        }

        this.#alpha = this.#acc / this.#stepMs

        // console.log('####alpha VIEW', this.#alpha)
        if (this.#updated) {
            this.dispatch(EventTypes.RENDER_GAME, this.#alpha)
            this.#updated = false
        }

        this.#rAf = requestAnimationFrame(this._loop)
    }
}
