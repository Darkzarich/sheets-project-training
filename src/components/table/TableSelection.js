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

  groupSelect() {}
}
