export default class Route {
  static get path() {
    return window.location.hash.slice(1)
  }

  static get param() {
    return Route.path.split('/')[1]
  }

  static push(path, param) {
    window.location.hash = `${path}${param ? `/${param}` : ''}`
  }
}
