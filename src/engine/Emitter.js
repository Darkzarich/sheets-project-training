export default class Emitter {
  constructor() {
    this.listeners = {}
  }

  emit(event, ...args) {
    if (Array.isArray(this.listeners[event])) {
      this.listeners[event].forEach((listener) => listener(...args))
    }
  }

  on(event, callback) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(callback)

    return () => {
      this.listeners[event] = this.listeners[event].filter(
        (listener) => listener !== callback
      )
    }
  }
}
