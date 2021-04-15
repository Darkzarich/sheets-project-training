import {DOMEventListener} from '@engine/DOMEventListener'

export class SheetsComponent extends DOMEventListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
  }

  /**
   * Returns template of a component
   * @return {string} template
   */
  toHTML() {
    return ''
  }

  init() {
    this.initDOMEventListener()
  }
}
