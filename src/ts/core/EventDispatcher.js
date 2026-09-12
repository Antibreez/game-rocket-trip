export class EventDispatcher {
    constructor() {
        this._events = {}
    }

    addListener(event, cb) {
        if (typeof cb !== 'function') {
            console.error(
                `The listener callback must be a function, the given type is ${typeof cb}`,
            )
            return
        }

        if (typeof event !== 'string') {
            console.error(`The event name must be a string, the given type is ${typeof event}`)
            return
        }

        if (this._events[event] === undefined) {
            this._events[event] = {
                listeners: [],
            }
        }

        this._events[event].listeners.push(cb)
    }

    removeListener(event, cb) {
        // Check if this event not exists
        if (this._events[event] === undefined) {
            console.error(`This event: ${event} does not exist`)
            return
        }

        this._events[event].listeners = this._events[event].listeners.filter((l) => l !== cb)
    }

    dispatch(event, details) {
        // Check if this event not exists
        // if (this._events[event] === undefined) {
        //     console.error(`This event: ${event} does not exist`)
        //     return
        // }
        this._events[event].listeners.forEach((listener) => {
            listener(details)
        })
    }
}
