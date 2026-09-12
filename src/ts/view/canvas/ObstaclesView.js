import { GameSettings } from '../../constants/GameSettings'

export class ObstaclesView {
    #ctx

    constructor(ctx) {
        this.#ctx = ctx
    }

    #renderItem(item, b) {
        // this.#ctx.beginPath()
        // item.forEach(({ x, y }, idx) => {
        //     if (idx < 1) {
        //         this.#ctx.moveTo(x, y)
        //     } else {
        //         this.#ctx.lineTo(x, y)
        //     }
        // })
        // this.#ctx.closePath()
        // this.#ctx.stroke()

        // console.log('####RENDER', item)

        if (b?.pos?.x === item.pos.x && b?.pos?.y === item.pos.y) {
            return
        }

        this.#ctx.save()
        this.#ctx.strokeStyle = 'red'
        this.#ctx.translate(item.pos.x, item.pos.y)
        this.#ctx.beginPath()
        item.points.forEach(({ x, y }, idx) => {
            if (idx < 1) {
                this.#ctx.moveTo(x, y)
            } else {
                this.#ctx.lineTo(x, y)
            }
        })
        this.#ctx.closePath()
        this.#ctx.stroke()
        this.#ctx.restore()
    }

    render(data) {
        const { currentObstacles, nextObstacles, collision } = data

        // console.log('###nextObstacles', nextObstacles)

        // ====== DRAW TEST RULLERS
        const colums = 5
        // const rows = 1
        const columnWidth = GameSettings.CANVAS_WIDTH / colums
        // const rowHeight = GameSettings.CANVAS_HEIGHT / rows

        this.#ctx.strokeStyle = 'black'

        for (let i = 1; i < colums; i += 1) {
            this.#ctx.beginPath()
            this.#ctx.moveTo(i * columnWidth, 0)
            this.#ctx.lineTo(i * columnWidth, GameSettings.CANVAS_HEIGHT)
            this.#ctx.closePath()
            this.#ctx.stroke()
        }
        // =========================

        const b = collision?.b

        currentObstacles.forEach((item) => {
            this.#renderItem(item, b)
        })

        nextObstacles.forEach((item) => {
            this.#renderItem(item, b)
        })
    }
}
