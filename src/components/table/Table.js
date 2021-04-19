import { $ } from '@engine/EngineDOM'
import { SheetsComponent } from '@engine/SheetsComponent.js'
import { createTable } from './table.template'

const MOUSE_BUTTONS = {
  LEFT: 0,
  RIGHT: 2,
}
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
    if (event.target.dataset.resize && event.button === MOUSE_BUTTONS.LEFT) {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-resizable]')
      const resizeType = $resizer.$el.dataset.resize
      const parentPos = $parent.getPos()

      document.onmousemove = (e) => {
        if (e.button === MOUSE_BUTTONS.LEFT) {
          if (resizeType === 'col') {
            const offset = e.pageX - parentPos.right
            const value = `${parentPos.width + offset}px`
            $parent.$el.style.width = value

            document
              .querySelectorAll(
                `[data-cell-resizable]:nth-child(${$parent.$el.dataset.rowIndex})`
              )
              .forEach((el) => {
                el.style.width = value
              })
          } else {
            const offset = e.pageY - parentPos.bottom
            const value = `${parentPos.height + offset}px`
            $parent.$el.style.height = value
          }
        }
      }

      document.onmouseup = (e) => {
        if (e.button === MOUSE_BUTTONS.LEFT) {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    }
  }
}
