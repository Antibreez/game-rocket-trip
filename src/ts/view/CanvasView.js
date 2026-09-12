import { AbstractView } from './AbstractView'
import { GameSettings } from '../constants/GameSettings'
import { PlayerView } from './canvas/PlayerView'
import { BgView } from './canvas/BgView'
import { ObstaclesView } from './canvas/ObstaclesView'

export class CanvasView extends AbstractView {
    #canvas
    #ctx
    #playerView
    #bgView
    #obstaclesView

    constructor() {
        super()

        this._element = document.getElementById('canvas-screen')
        this.#canvas = this._element.querySelector('#canvas')
        this.#canvas.setAttribute('width', GameSettings.CANVAS_WIDTH)
        this.#canvas.setAttribute('height', GameSettings.CANVAS_HEIGHT)
        this.#ctx = this.#canvas.getContext('2d')

        this.#playerView = new PlayerView(this.#ctx)
        this.#bgView = new BgView(this.#ctx)
        this.#obstaclesView = new ObstaclesView(this.#ctx)
    }

    render(state) {
        const { playerState, bgState, obstaclesState, collision } = state

        this.#ctx.clearRect(0, 0, GameSettings.CANVAS_WIDTH, GameSettings.CANVAS_HEIGHT)

        this.#bgView.render(bgState)
        this.#playerView.render({ ...playerState, collision })
        this.#obstaclesView.render({ ...obstaclesState, collision })
    }
}
