import { EventTypes } from '../constants/EventTypes'
import { EventDispatcher } from '../core/EventDispatcher'
import { CanvasView } from './CanvasView'
import { StartView } from './StartView'

export class GameView extends EventDispatcher {
    #startView
    #canvasView

    constructor() {
        super()

        this.#startView = new StartView()
        this.#canvasView = new CanvasView()
    }

    init() {
        this.#addEventListeners()
        this.#startView.show()
    }

    render(state) {
        // console.log('####____update game view', state)

        this.#canvasView.render(state)
    }

    #start() {
        this.#startView.hide()
        this.#canvasView.show()
    }

    #onStart() {
        this.#start()
        this.dispatch(EventTypes.START_GAME)
    }

    #addEventListeners() {
        this.#startView.addListener(EventTypes.START_GAME, this.#onStart.bind(this))
    }
}
