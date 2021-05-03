import { DOMEventListener } from '@engine/DOMEventListener'

export class SheetsComponent extends DOMEventListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || 'Anonymous'
    this.emitter = options.emitter
    this.store = options.store
    this.subscribe = options.subscribe || []
    this.unsubs = []
    this.storeSub = null

    this.prepare()
  }

  get $store() {
    return this.store.getState()
  }

  /**
   * Returns template of a component
   * @return {string} template
   */
  toHTML() {
    return ''
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  // Emit an event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // Listen to an event from emit, calling callback when detected matching event
  $on(event, callback) {
    const unsub = this.emitter.on(event, callback)
    this.unsubs.push(unsub)
  }

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  // there are only changes it subscribes to
  storeChanged() {}

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
    // this.storeSub.unsubscribe()
  }
}
