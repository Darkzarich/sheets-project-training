import { $ } from '@engine/EngineDOM'
import ActiveRoute from '@engine/router/ActiveRoute'

export default class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router')
    }

    this.$placeholder = $(selector)
    this.routes = routes

    this.changePageHandler = this.changePageHandler.bind(this)

    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler(event) {
    this.$placeholder.html('123')
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
