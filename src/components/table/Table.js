import { SheetsComponent } from '@engine/SheetsComponent.js'
import { $ } from '@engine/EngineDOM.js'
import { createTable } from './table.template'
import { handleTableResize } from './table.resize'
import {
  isSelectable,
  shouldResize,
  isSelectingGroup,
  getSelectDirection,
  isControlKey,
} from './table.functions'
import TableSelection from './TableSelection'
export class Table extends SheetsComponent {
  static className = 'c-sheets-table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
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

      if (isSelectingGroup(event)) {
        this.selection.selectGroup(target, this.$root)
      } else {
        this.selection.select(target)
      }
    }
  }

  onKeydown(event) {
    if (isSelectable(event) && isControlKey(event)) {
      event.preventDefault()

      const direction = getSelectDirection(event)
      const currentCord = this.selection.current.id(true)
      const nextCell = this.$root.find(
        `[data-id="${currentCord.row + direction[0]}:${
          currentCord.col + direction[1]
        }"]`
      )
      nextCell.focus()
      this.selection.select(nextCell)
    }
  }
}
