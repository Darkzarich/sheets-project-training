import { SheetsComponent } from './SheetsComponent'

export class SheetsStateComponent extends SheetsComponent {
  constructor(...args) {
    super(...args)
  }

  get template() {
    return JSON.stringify(this.state, null, 2)
  }

  initState(initialState) {
    this.state = { ...initialState }
  }

  setState(newState) {
    this.state = { ...this.state, ...newState }
    this.$root.html(this.template)
  }

  toHTML() {
    return this.template
  }
}
