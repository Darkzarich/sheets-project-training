import { DOMEventListener } from '@engine/DOMEventListener'

export class SheetsComponent extends DOMEventListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || 'Anonymous'
    this.emitter = options.emitter

    this.prepare()
  }

  /**
   * Returns template of a component
   * @return {string} template
   */
  toHTML() {
    return ''
  }

  prepare() {}

  init() {
    this.initDOMEventListeners()
  }

  destroy() {
    this.removeDOMEventListeners()
  }
}
