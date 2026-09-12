import { EventTypes } from '../constants/EventTypes'
import { GameView } from '../view/GameView'
import { GameModel } from '../model/GameModel'
import { GameLoop } from './GameLoop'
import { InputController } from './InputController'

export class GameController {
    #inputController
    #gameView
    #gameModel
    #gameLoop
    #gameSettings = {
        fps: 60,
    }

    constructor() {
        this.#gameView = new GameView()
        this.#gameModel = new GameModel()
        this.#gameLoop = new GameLoop(this.#gameSettings)
        this.#inputController = new InputController()
    }

    init() {
        this.#gameView.init()
        this.#gameView.addListener(EventTypes.START_GAME, this.#onGameStart.bind(this))
        this.#gameLoop.addListener(EventTypes.UPDATE_GAME, this.#onGameUpdate.bind(this))
        this.#gameLoop.addListener(EventTypes.RENDER_GAME, this.#onGameRender.bind(this))
        this.#inputController.addListener(EventTypes.SPACE_KEY_DOWN, this.#onSpaceDown.bind(this))
        this.#inputController.addListener(EventTypes.SPACE_KEY_UP, this.#onSpaceUp.bind(this))
        this.#gameModel.addListener(EventTypes.START_GAME_OVER, this.#onGameOverStart.bind(this))
        this.#gameModel.addListener(EventTypes.END_GAME_OVER, this.#onGameOverEnd.bind(this))
    }

    #onSpaceDown() {
        this.#gameModel.startBoost()
    }

    #onSpaceUp() {
        this.#gameModel.stopBoost()
    }

    #onGameStart() {
        this.#gameLoop.start()
        this.#inputController.addEventListeners()
    }

    #onGameUpdate(step) {
        // path step to model for update
        this.#gameModel.update(step)
    }

    #onGameOverStart() {
        // this.#gameLoop.stop()
        this.#inputController.removeEventListeners()
    }

    #onGameOverEnd() {
        this.#gameLoop.stop()
    }

    #onGameRender(alpha) {
        // get current state from model and pass to view for render
        const state = this.#gameModel.getState(alpha)

        this.#gameView.render(state)
    }
}
