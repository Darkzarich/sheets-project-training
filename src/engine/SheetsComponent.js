import { DOMEventListener } from '@engine/DOMEventListener'

export class SheetsComponent extends DOMEventListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || 'Anonymous'
    this.emitter = options.emitter
    this.unsubs = []

    this.prepare()
  }

  /**
   * Returns template of a component
   * @return {string} template
   */
  toHTML() {
    return ''
  }

  // Emit an event
  $emit(event, ...args) {
    this.emitter.emit(event, args)
  }

  // Listen to an event from emit, calling callback when detected matching event
  $on(event, callback) {
    const unsub = this.emitter.on(event, callback)
    this.unsubs.push(unsub)
  }

  // Life hook before draring
  prepare() {}

  // Life hook after drawing
  init() {
    this.initDOMEventListeners()
  }

  // Life hook on destroying a component
  destroy() {
    this.removeDOMEventListeners()
    this.unsubs.forEach((u) => u())
  }
}
