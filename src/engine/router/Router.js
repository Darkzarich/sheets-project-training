import { $ } from '@engine/EngineDOM'
import ActiveRoute from '@engine/router/ActiveRoute'

export default class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router')
    }

    this.$placeholder = $(selector)
    this.routes = routes

    this.currentPage = null

    this.changePageHandler = this.changePageHandler.bind(this)

    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler() {
    if (this.currentPage) {
      this.currentPage.destroy()
    }

    const Page = this.routes[ActiveRoute.path]
    const PageClass = Page ? Page : this.routes['default']
    this.currentPage = new PageClass(ActiveRoute.param)
    this.$placeholder.html(this.currentPage.getRoot().html())
    this.currentPage.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
