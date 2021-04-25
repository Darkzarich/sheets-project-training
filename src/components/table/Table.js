import { SheetsComponent } from '@engine/SheetsComponent.js'
import { $ } from '@engine/EngineDOM.js'
import { createTable } from './table.template'
import { handleTableResize } from './table.resize'
import {
  isSelectable,
  shouldResize,
  isSelectingGroup,
  getNextCellCord,
  isControlKey,
} from './table.functions'
import TableSelection from './TableSelection'
export class Table extends SheetsComponent {
  static className = 'c-sheets-table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options,
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

    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
    })
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      handleTableResize(event, this.$root)
      return
    }

    if (isSelectable(event)) {
      const target = $(event.target)

      if (isSelectingGroup(event)) {
        this.selection.selectGroup(target, this.$root)
      } else {
        this.selection.select(target)
      }
    }
  }

  onKeydown(event) {
    if (isControlKey(event) && !event.shiftKey) {
      event.preventDefault()

      const nextCellCord = getNextCellCord(
        event,
        this.selection.current.id(true)
      )
      const nextCell = this.$root.find(
        `[data-id="${nextCellCord.row}:${nextCellCord.col}"]`
      )

      this.selection.select(nextCell)
    }
  }
}
