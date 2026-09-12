import { EventTypes } from '../constants/EventTypes'
import { AbstractView } from './AbstractView'

export class StartView extends AbstractView {
    #buttonEl

    constructor() {
        super()

        this._element = document.getElementById('start-screen')
        this.#buttonEl = this._element.querySelector('.start-screen__button')

        this.#addEventListeners()
    }

    #onButtonClick() {
        this.dispatch(EventTypes.START_GAME)
        this.#buttonEl.blur()
        this.#buttonEl.setAttribute('disabled', true)
    }

    #addEventListeners() {
        this.#buttonEl.addEventListener('click', this.#onButtonClick.bind(this))
    }
}
