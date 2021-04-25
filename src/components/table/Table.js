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
      listeners: ['mousedown', 'keydown', 'keyup'],
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
      console.log('formula input: ', text)
      this.selection.current.text(text)
    })

    this.$on('formula:focus', () => {
      this.selection.current.focus()
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

      this.$emit('table:select', this.selection.current.text())
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

      this.$emit('table:select', this.selection.current.text())
    }
  }

  onKeyup(event) {
    if (!isControlKey(event) && !event.shiftKey) {
      this.$emit('table:input', this.selection.current.text())
    }
  }
}
