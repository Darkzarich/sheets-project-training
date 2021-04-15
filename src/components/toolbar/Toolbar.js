import {SheetsComponent} from '@engine/SheetsComponent'

export class Toolbar extends SheetsComponent {
  static className = 'c-sheets-toolbar';

  toHTML() {
    return `
    <div class="c-sheets-toolbar__button">
      <i class="material-icons">
        format_align_left
      </i>
    </div>
    <div class="c-sheets-toolbar__button">
      <i class="material-icons">
        format_align_center
      </i>
    </div>
    <div class="c-sheets-toolbar__button">
      <i class="material-icons">
        format_align_right
      </i>
    </div>
    <div class="c-sheets-toolbar__button">
      <i class="material-icons">
        format_bold
      </i>
    </div>
    <div class="c-sheets-toolbar__button">
      <i class="material-icons">
        format_italic
      </i>
    </div>
    <div class="c-sheets-toolbar__button">
      <i class="material-icons">
        format_underlined
      </i>
    </div>
    <div class="c-sheets-toolbar__button">
      <i class="material-icons">
        strikethrough_s
      </i>
    </div>
    `
  }
}