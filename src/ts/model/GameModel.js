import { EventTypes } from '../constants/EventTypes'
import { GameSettings } from '../constants/GameSettings'
import { EventDispatcher } from '../core/EventDispatcher'
import { BgModel } from './BgModel'
import { ObstaclesModel } from './ObstaclesModel'
import { PlayerModel } from './PlayerModel'
import SAT from 'sat'

export class GameModel extends EventDispatcher {
    #playerModel
    #bgModel
    #obstaclesModel
    #progress = {
        prevX: 0,
        x: 0,
        level: 0,
    }
    #startGameOver = false
    #gameOverCountDown = 0
    #collision
    #baseSpeed = 150

    constructor() {
        super()
        // game model
        // will include model parts for phisics, obstacles and etc.
        this.#playerModel = new PlayerModel()
        this.#bgModel = new BgModel()
        this.#obstaclesModel = new ObstaclesModel()
    }

    update(step) {
        if (this.#collision) this.#baseSpeed -= 1

        this.#progress.prevX = this.#progress.x
        this.#progress.x += step * this.#baseSpeed

        if (this.#startGameOver) {
            this.#gameOverCountDown += step * 10

            if (this.#gameOverCountDown > 20) {
                this.dispatch(EventTypes.END_GAME_OVER)
            }
        }

        if (this.#progress.x > GameSettings.CANVAS_WIDTH) {
            this.#progress.x = this.#progress.x - GameSettings.CANVAS_WIDTH
            this.#progress.prevX = this.#progress.prevX - GameSettings.CANVAS_WIDTH
            this.#progress.level += 1
        }

        this.#playerModel.update(step, this.#collision)
        this.#bgModel.update(this.#progress)
        this.#obstaclesModel.update(this.#progress)
        // console.log('###Model update', step)
    }

    startBoost() {
        this.#playerModel.startBoost()
    }

    stopBoost() {
        this.#playerModel.stopBoost()
    }

    getState(alpha) {
        const playerState = this.#playerModel.getState(alpha)
        const obstaclesState = this.#obstaclesModel.getState(alpha)

        const collision = this.#checkObstacleCollision(playerState, obstaclesState)

        if (collision && !this.#startGameOver) {
            this.#startGameOver = true
            this.dispatch(EventTypes.START_GAME_OVER)
        }

        return {
            collision,
            playerState,
            obstaclesState,
            bgState: this.#bgModel.getState(alpha),
        }
    }

    #checkObstacleCollision(playerState, obstaclesState) {
        const { currentObstacles, nextObstacles } = obstaclesState

        if (this.#collision) return this.#collision

        const response = new SAT.Response()

        const filteredObstacles = [...currentObstacles, ...nextObstacles].filter((item) => {
            if (item.pos.x > 0 && item.pos.x < 187) {
                // console.log('#####pos', item.pos.x)
            }

            return item.pos.x > 0 && item.pos.x < 187
        })

        filteredObstacles.forEach((item) => {
            const col = SAT.testPolygonPolygon(playerState.instance, item, response)

            if (col) {
                this.#collision = response
            }
        })

        return this.#collision
        // console.log('####filtered', filteredObstacles)
    }
}
