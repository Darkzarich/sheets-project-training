import { SheetsComponent } from '@engine/SheetsComponent'
import { $ } from '@engine/EngineDOM'
import * as actions from '@/store/actions'
import { debounce } from '@engine/utils'
import Route from '@engine/router/Route'

export class Header extends SheetsComponent {
  static className = 'c-sheets-header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  onInput(event) {
    const text = $(event.target).text()
    this.$dispatch(actions.changeTitle(text))
  }

  onClick(event) {
    const data = $(event.target).data

    if (data && data.action) {
      switch (data.action) {
        case 'delete':
          if (
            window.confirm('Are you really sure you want to delete this sheet?')
          ) {
            localStorage.removeItem(`sheets-state:${Route.param}`)
            Route.push('dashboard')
          }
          break
        case 'close':
          Route.push('dashboard')
          break
      }
    }
  }

  toHTML() {
    const title = this.$store.title
    return `
      <input type="text" class="c-sheets-header__input" value="${title}">
      <div>
        <div class="c-sheets-header__button" data-action="delete">
          <i class="material-icons">
            delete
          </i>
        </div>
        <div class="c-sheets-header__button" data-action="close">
          <i class="material-icons">
            exit_to_app
          </i>
        </div>
      </div>
    `
  }
}
