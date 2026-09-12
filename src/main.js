import './styles/main.scss'
import { GameController } from './ts/controller/GameController'
// import SAT from 'sat'

// const testCanvas = document.getElementById('test-canvas')
// const ctx = testCanvas.getContext('2d')

// // var p = new SAT.Polygon(new SAT.Vector(400, 400), [
// //     new SAT.Vector(-100, -50),
// //     new SAT.Vector(100, -50),
// //     new SAT.Vector(100, 50),
// //     new SAT.Vector(-100, 50),
// // ])

// // const p = new SAT.Circle(new SAT.Vector(200, 200), 100)

// var p = new SAT.Polygon(new SAT.Vector(200, 100), [
//     new SAT.Vector(-100, -50),
//     new SAT.Vector(100, -50),
//     new SAT.Vector(100, 50),
//     new SAT.Vector(-100, 50),
// ])

// var p2 = new SAT.Polygon(new SAT.Vector(200, 250), [
//     new SAT.Vector(-100, -50),
//     new SAT.Vector(100, -50),
//     new SAT.Vector(100, 50),
//     new SAT.Vector(-100, 50),
// ])

// p.rotate(0.5)
// p.translate(0, 10)

// ctx.save()
// ctx.fillStyle = 'black'
// ctx.translate(p.pos.x, p.pos.y)
// ctx.beginPath()
// p.points.forEach(({ x, y }, idx) => {
//     if (idx < 1) {
//         ctx.moveTo(x, y)
//     } else {
//         ctx.lineTo(x, y)
//     }
// })
// // ctx.arc(p.pos.x, p.pos.y, p.r, 0, 360, false)
// ctx.closePath()
// ctx.fill()
// ctx.restore()

// ctx.save()
// ctx.fillStyle = 'red'
// ctx.translate(p2.pos.x, p2.pos.y)
// ctx.beginPath()
// p2.points.forEach(({ x, y }, idx) => {
//     if (idx < 1) {
//         ctx.moveTo(x, y)
//     } else {
//         ctx.lineTo(x, y)
//     }
// })
// // ctx.arc(p.pos.x, p.pos.y, p.r, 0, 360, false)
// ctx.closePath()
// ctx.fill()
// ctx.restore()

// const response = new SAT.Response()
// const collision = SAT.testPolygonPolygon(p, p2, response)

// console.log('####response', collision, response)

// // p.translate(0, 0)
// // p.rotate(0.1)
// // p.setAngle(0.7)
// // p.translate(100, 150)
// // p.setOffset({ x: -100, y: -100 })
// // p.translate(-100, -150)

// console.log('###ppp', p.offset)
// console.log('###ppp', p.calcPoints)

// // p.setAngle(0.1)
// // console.log('####sat', p.calcPoints)

const gameController = new GameController()

gameController.init()

// const STEP = 1 / 25 // 60 updates/sec
// const STEP_MS = STEP * 1000

// let last = 0
// let acc = 0

// function loop(time: number) {
//     if (!last) last = time
//     const frameMs = time - last
//     last = time

//     // защита от “скачка” (например, вкладка была неактивна)
//     acc += Math.min(frameMs, 250)

//     while (acc >= STEP_MS) {
//         console.log('####UPDATE', STEP)
//         // фиксированный dt в секундах
//         acc -= STEP_MS
//     }

//     console.log('###RENDER') // можно рисовать каждый rAF
//     requestAnimationFrame(loop)
// }

// requestAnimationFrame(loop)

// const a = 1
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
// console.log('####HELLO')
