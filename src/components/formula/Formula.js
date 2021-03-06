import { SheetsComponent } from '@engine/SheetsComponent'

export class Formula extends SheetsComponent {
  static className = 'c-sheets-formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options,
    })
  }

  toHTML() {
    return `
    <div class="c-sheets-formula__info">
      fx
    </div>
      <div class="c-sheets-formula__input" data-formula contenteditable spellcheck="false">
    </div>
    `
  }

  init() {
    super.init()

    this.$formula = this.$root.find('[data-formula]')

    this.$on('table:select', ($cell) => {
      this.$formula.text($cell.data.formula || $cell.text())
    })
  }

  storeChanged({ currentText }) {
    this.$formula.text(currentText)
  }

  onInput() {
    this.$emit('formula:input', this.$formula.text())
  }

  onKeydown(event) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }
}
