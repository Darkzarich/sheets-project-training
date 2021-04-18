import { SheetsComponent } from '@engine/SheetsComponent.js'
import { createTable } from './table.template'

export class Table extends SheetsComponent {
  static className = 'c-sheets-table'

  constructor($root) {
    super($root, {
      name: 'Table',
      // listeners: ['mousedown', 'click', 'mousemove', 'mouseup'],
    })
  }

  toHTML() {
    return createTable()
  }
}
