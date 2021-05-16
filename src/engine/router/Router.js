import { $ } from '@engine/EngineDOM'
import Route from '@engine/router/Route'

const PAGE_REGEXP = new RegExp('[a-z]+')
export default class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router')
    }

    if (!routes.default) {
      throw new Error('"default" route is not provided for Router')
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

    this.$placeholder.clear()

    const currentRoute = Route.path.match(PAGE_REGEXP)
    const Page = this.routes[currentRoute ? currentRoute[0] : 'default']
    this.currentPage = new Page(Route.param)
    this.$placeholder.append(this.currentPage.getRoot())
    this.currentPage.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
