import rocketImg from '@/images/rocket.png'
import fireImg from '@/images/fire.png'
import { GameSettings } from '../../constants/GameSettings'

export class PlayerView {
    #ctx
    #deathWiggle = 0
    #dK = 3
    #fireImg
    #rocketImg

    constructor(ctx) {
        this.#ctx = ctx
        this.#fireImg = new Image()
        this.#rocketImg = new Image()
        this.#fireImg.src = fireImg
        this.#rocketImg.src = rocketImg
    }

    render(state) {
        const { instance, angle, fireRate, collision } = state

        const fireHeight = fireRate > -1 ? 0 : Math.abs((fireRate * 10) / 13) + 6
        const fireWidth = (fireHeight * 162) / 164
        console.log('####angle', fireWidth, fireHeight)

        if (collision) {
            this.#dK =
                this.#deathWiggle > 25
                    ? Math.abs(this.#dK) * -1
                    : this.#deathWiggle < 1
                      ? Math.abs(this.#dK)
                      : this.#dK

            this.#deathWiggle += this.#dK
            console.log('###DEATH', this.#deathWiggle)
        }

        // console.log('###prev y', y, this.#pervY)

        // this.#pervY = y

        // this.#ctx.save()
        // this.#ctx.fillStyle = 'rgba(0 0 0 / 30%)'
        // this.#ctx.translate(x, y)
        // this.#ctx.rotate((angle * Math.PI) / 180)
        // this.#ctx.beginPath()
        // this.#ctx.rect(-this.#width / 2, -this.#height / 2, this.#width, this.#height)
        // this.#ctx.fill()
        // this.#ctx.restore()

        this.#ctx.save()
        this.#ctx.fillStyle = `rgba(0 0 0 / ${30 - this.#deathWiggle}%)`
        this.#ctx.translate(instance.pos.x, instance.pos.y)
        // this.#ctx.rotate(angle * Math.PI / 180)
        this.#ctx.beginPath()
        instance.calcPoints.forEach(({ x, y }, idx) => {
            if (idx < 1) {
                this.#ctx.moveTo(x, y)
            } else {
                this.#ctx.lineTo(x, y)
            }
        })
        this.#ctx.closePath()
        this.#ctx.fill()
        this.#ctx.restore()

        this.#ctx.save()
        this.#ctx.translate(instance.pos.x, instance.pos.y)
        this.#ctx.rotate((angle * Math.PI) / 180)
        this.#ctx.drawImage(
            this.#rocketImg,
            -GameSettings.PLAYER_WIDTH / 2,
            -GameSettings.PLAYER_HEIGHT / 2,
            GameSettings.PLAYER_WIDTH,
            GameSettings.PLAYER_HEIGHT,
        )
        this.#ctx.drawImage(
            this.#fireImg,
            -GameSettings.PLAYER_WIDTH / 2 + 6.7 - fireWidth,
            -fireHeight / 2,
            fireWidth,
            fireHeight,
        )
        this.#ctx.restore()
    }
}
