import { EventTypes } from '../constants/EventTypes'
import { EventDispatcher } from '../core/EventDispatcher'

export class InputController extends EventDispatcher {
    constructor() {
        super()

        this._onKeyDown = this.#onKeyDown.bind(this)
        this._onKeyUp = this.#onKeyUp.bind(this)
    }

    #onKeyDown(e) {
        if (e.code === 'Space') {
            if (e.repeat) return

            this.dispatch(EventTypes.SPACE_KEY_DOWN)
        }
    }

    #onKeyUp(e) {
        if (e.code === 'Space') {
            this.dispatch(EventTypes.SPACE_KEY_UP)
        }
    }

    addEventListeners() {
        console.log('3####ADD')

        window.addEventListener('keydown', this._onKeyDown)
        window.addEventListener('keyup', this._onKeyUp)
    }

    removeEventListeners() {
        console.log('3####STOP')

        window.removeEventListener('keydown', this._onKeyDown)
        window.removeEventListener('keyup', this._onKeyUp)
    }
}
