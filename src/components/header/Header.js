import { SheetsComponent } from '@engine/SheetsComponent'
import { $ } from '@engine/EngineDOM'
import * as actions from '@/store/actions'

export class Header extends SheetsComponent {
  static className = 'c-sheets-header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    })
  }

  onInput(event) {
    const text = $(event.target).text()
    this.$dispatch(actions.changeTitle(text))
  }

  toHTML() {
    const title = this.$store.title
    return `
      <input type="text" class="c-sheets-header__input" value="${title}">
      <div>
        <div class="c-sheets-header__button">
          <i class="material-icons">
            delete
          </i>
        </div>
        <div class="c-sheets-header__button">
          <i class="material-icons">
            exit_to_app
          </i>
        </div>
      </div>
    `
  }
}
