import { SheetsComponent } from '@engine/SheetsComponent'

export class Formula extends SheetsComponent {
  static className = 'c-sheets-formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
      ...options,
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
    const text = event.target.textContent.trim()
    this.$emit('formula:input', text)
  }
}
