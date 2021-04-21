import { SheetsComponent } from '@engine/SheetsComponent.js'
import { $ } from '@engine/EngineDOM.js'
import { createTable } from './table.template'
import { handleTableResize } from './table.resize'
import { isSelectable, shouldResize } from './table.functions'
import TableSelection from './TableSelection'
export class Table extends SheetsComponent {
  static className = 'c-sheets-table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    })
  }

  toHTML() {
    return createTable()
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-id="1:1"]')
    this.selection.select($cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      handleTableResize(event, this.$root)
      return
    }

    if (isSelectable(event)) {
      const target = $(event.target)
      this.selection.select(target)
    }
  }
}
