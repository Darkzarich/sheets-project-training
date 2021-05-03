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
import { defaultCellStyles } from '@/constants'
import { parse } from './table.parser'

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

    this.$on('formula:input', (value) => {
      this.selection.current.attr('data-formula', value).text(parse(value))
      this.updateTextInStore(value)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })

    this.$on('toolbar:apply-style', (style) => {
      this.selection.applyStyle(style)
      this.$dispatch(
        actions.applyStyle({
          style,
          ids: this.selection.selectedIds,
        })
      )
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)

    const styles = $cell.getStyles(Object.keys(defaultCellStyles))
    this.$dispatch(actions.changeStyles(styles))
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
        this.$emit('table:select', target)
      } else {
        this.selectCell(target)
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
