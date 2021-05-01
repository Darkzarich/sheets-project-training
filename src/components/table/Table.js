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
import * as actions from '@/store/actions'
export class Table extends SheetsComponent {
  static className = 'c-sheets-table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    })
  }

  toHTML() {
    return createTable(27, this.$store)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)

    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
      this.updateTextInStore(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  async resizeTable(event) {
    try {
      const payload = await handleTableResize(event, this.$root)
      this.$dispatch(actions.tableResize(payload))
    } catch (e) {
      console.error('Resize error', e)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
      return
    }

    if (isSelectable(event)) {
      const target = $(event.target)

      if (isSelectingGroup(event)) {
        this.selection.selectGroup(target, this.$root)
      } else {
        this.selection.select(target)
      }

      this.$emit('table:select', target)
    }
  }

  onKeydown(event) {
    if (isControlKey(event) && !event.shiftKey) {
      event.preventDefault()

      const nextCellCord = getNextCellCord(
        event,
        this.selection.current.id(true)
      )
      const $nextCell = this.$root.find(
        `[data-id="${nextCellCord.row}:${nextCellCord.col}"]`
      )

      this.selectCell($nextCell)
    }
  }

  updateTextInStore(text) {
    this.$dispatch(
      actions.changeText({
        text,
        id: this.selection.current.id(),
      })
    )
  }

  onInput() {
    this.updateTextInStore(this.selection.current.text())
  }
}
