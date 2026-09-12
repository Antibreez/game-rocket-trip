import { EventDispatcher } from '../core/EventDispatcher'

export class AbstractView extends EventDispatcher {
    _element

    constructor() {
        super()
    }

    show() {
        this._element?.classList.add('active')
    }

    hide() {
        this._element?.classList.remove('active')
    }

    update() {}
}
