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

    this.$on('table:select', (text) => {
      this.$formula.text(text)
    })

    this.$on('table:input', (text) => {
      this.$formula.text(text)
    })
  }

  onInput(event) {
    console.log(event)
    const text = event.target.textContent.trim()
    this.$emit('formula:input', text)
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.$emit('formula:focus')
    }
  }
}
