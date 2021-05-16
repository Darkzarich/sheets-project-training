import Router from '@engine/router/Router'
import Page from '@engine/router/Page'
import Route from '@engine/router/Route'

// Mock classes
class DashboardPage extends Page {
  getRoot() {
    const root = document.createElement('div')
    root.innerHTML = 'dashboard'
    return root
  }
}
class SheetsPage extends Page {}
class SheetsPageWithRoot extends Page {
  getRoot() {}
}

describe('Router', () => {
  let router
  let $root

  beforeEach(() => {
    $root = document.createElement('div')
    router = new Router($root, {
      default: DashboardPage,
      dashboard: DashboardPage,
      sheets: SheetsPage,
    })
  })

  test('should throw Error if no selector is passed in Router', () => {
    expect(() => {
      new Router()
    }).toThrowError()
  })

  test('should be defined', () => {
    expect(router).toBeDefined()
  })

  test('should render Dashboard Page', () => {
    router.changePageHandler()
    expect($root.innerHTML).toBe('<div>dashboard</div>')
  })
})

describe('Route', () => {
  let router
  let $root

  beforeEach(() => {
    $root = document.createElement('div')
    window.location = '/'
    router = new Router($root, {
      default: DashboardPage,
      dashboard: DashboardPage,
      sheets: SheetsPageWithRoot,
    })
  })

  test('should return current path from hash', () => {
    window.location.hash = '#dashboard'
    expect(Route.path).toBe('dashboard')
  })

  test('should return parameters from hash', () => {
    window.location.hash = '#sheets/123'
    expect(Route.param).toBe('123')
  })

  test('should change page after "push"', () => {
    Route.push('sheets')
    router.changePageHandler()
    expect(router.currentPage).toBeInstanceOf(SheetsPageWithRoot)
  })
})

describe('Page', () => {
  test('should throw an error if "getRoot" is not implemented after inherit', () => {
    const page = new SheetsPage()
    expect(page.getRoot).toThrowError()
  })
})
