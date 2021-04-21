export default class TableSelection {
  static selectedClass = 'c-sheets-table__cell--selected'

  constructor() {
    this._group = []
  }

  select($el) {
    this.discardAll()
    this._group.push($el)
    $el.addClass(TableSelection.selectedClass)
  }

  discardAll() {
    this._group.forEach(($cell) => {
      $cell.removeClass(TableSelection.selectedClass)
    })
    this._group = []
  }

  selectGroup($endPoint, $root) {
    if (this._group.length > 0) {
      const $startPoint = this._group[0]
      const startPoints = $startPoint.data.id.split(':') // [row, col]
      const endPoints = $endPoint.data.id.split(':')

      this.discardAll()

      if (startPoints[0] > endPoints[0]) {
        const temp = startPoints[0]
        startPoints[0] = endPoints[0]
        endPoints[0] = temp
      }

      if (startPoints[1] > endPoints[1]) {
        const temp = startPoints[1]
        startPoints[1] = endPoints[1]
        endPoints[1] = temp
      }

      for (let row = startPoints[0]; row <= endPoints[0]; row++) {
        for (let col = startPoints[1]; col <= endPoints[1]; col++) {
          const $cell = $root.find(`[data-id="${row}:${col}"]`)
          this._group.push($cell)
          $cell.addClass(TableSelection.selectedClass)
        }
      }
    }
  }
}
