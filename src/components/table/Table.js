import { SheetsComponent } from '@engine/SheetsComponent.js'
import { createTable } from './table.template'
import { handleTableResize } from './table.resize'
import { shouldResize } from './table.functions'
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

  onMousedown(event) {
    if (shouldResize(event)) {
      handleTableResize(event, this.$root)
    }
  }
}
