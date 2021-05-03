import { SheetsStateComponent } from '@engine/SheetsStateComponent'
import { createToolbar } from './toolbar.template'
import { $ } from '@engine/EngineDOM'
import { defaultCellStyles } from '@/constants'

export class Toolbar extends SheetsStateComponent {
  static className = 'c-sheets-toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    })
  }

  prepare() {
    const initialState = {
      ...defaultCellStyles,
    }
    this.initState(initialState)
  }

  storeChanged({ currentStyles }) {
    this.setState(currentStyles)
  }

  get template() {
    return createToolbar(this.state)
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      const key = Object.keys(value)[0]

      this.$emit('toolbar:apply-style', value)

      this.setState({ [key]: value[key] })
    }
  }
}
