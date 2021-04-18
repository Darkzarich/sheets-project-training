import { SheetsComponent } from '@engine/SheetsComponent'

export class Header extends SheetsComponent {
  static className = 'c-sheets-header'

  toHTML() {
    return `
      <input type="text" class="c-sheets-header__input" value="New table">
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
