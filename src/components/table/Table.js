import {SheetsComponent} from '@engine/SheetsComponent.js'
import {createTable} from './table.template'

export class Table extends SheetsComponent {
  static className = 'c-sheets-table'

  toHTML() {
    return createTable()
  }
}
