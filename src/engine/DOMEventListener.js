import {capitalize} from './utils'

export class DOMEventListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('DOMEventListener: $root element must be provided!')
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMEventListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(
            `Method ${method} is not implemented in ${name} component`
        )
      }
      // reassign method
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])
    })
  }

  removeDOMEventListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

function getMethodName(methodName) {
  return 'on' + capitalize(methodName)
}
