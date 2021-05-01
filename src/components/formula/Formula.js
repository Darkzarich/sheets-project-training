import { SheetsComponent } from '@engine/SheetsComponent'

export class Formula extends SheetsComponent {
  static className = 'c-sheets-formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
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
      this.$formula.text($cell.text())
    })

    this.$subscribe((state) => {
      this.$formula.text(state.currentText)
    })
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
