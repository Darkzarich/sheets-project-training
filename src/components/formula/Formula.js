import {SheetsComponent} from '@engine/SheetsComponent'

export class Formula extends SheetsComponent {
  static className = 'c-sheets-formula'

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
    })
  }

  toHTML() {
    return `
    <div class="c-sheets-formula__info">
      fx
    </div>
    <div class="c-sheets-formula__input" contenteditable spellcheck="false">
    </div>
    `
  }

  onInput(event) {
    console.log('Formula: onInput', event)
  }
}
