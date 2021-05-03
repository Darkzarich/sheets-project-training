import { swapPropsIfLess } from '@engine/utils'

export default class TableSelection {
  static selectedClass = 'c-sheets-table__cell--selected'

  constructor() {
    this._group = []
    this.current = null
  }

  get selectedIds() {
    return this._group.map(($el) => $el.id())
  }

  select($el) {
    this.discardAll()
    this._group.push($el)
    this.current = $el
    $el.focus().addClass(TableSelection.selectedClass)
  }

  discardAll() {
    this._group.forEach(($cell) => {
      $cell.removeClass(TableSelection.selectedClass)
    })
    this._group = []
  }

  selectGroup($endPoint, $root) {
    if (this._group.length > 0) {
      const startPoint = this.current.id(true) // {row, col}
      const endPoint = $endPoint.id(true)

      this.discardAll()

      swapPropsIfLess(startPoint, endPoint, 'row')
      swapPropsIfLess(startPoint, endPoint, 'col')

      for (let row = startPoint.row; row <= endPoint.row; row++) {
        for (let col = startPoint.col; col <= endPoint.col; col++) {
          const $cell = $root.find(`[data-id="${row}:${col}"]`)
          this._group.push($cell)
          $cell.addClass(TableSelection.selectedClass)
        }
      }
    }
  }

  applyStyle(style) {
    this._group.forEach(($el) => $el.css(style))
  }
}
