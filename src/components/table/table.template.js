import { toCSS } from '@engine/utils'

const CODES = {
  A: 65,
  Z: 90,
}
export function createTable(rowCount = 20, store = {}) {
  const toCell = (col, row) => {
    const colIndex = col + 1

    const styleString = toCSS({
      width: store.colState[colIndex] || '',
    })

    return `
      <div 
        class="c-sheets-table__cell" 
        contenteditable
        data-col-index="${colIndex}" 
        data-id="${row + 1}:${col + 1}"
        style="${styleString}"
      ></div>
  `
  }

  const toColumn = (letter, index) => {
    const colIndex = index + 1

    const styleString = toCSS({
      width: store.colState[colIndex] || '',
    })

    return `
      <div class="c-sheets-table__col" data-resizable data-col-index="${colIndex}" style="${styleString}">
        ${letter}
        <div class="c-sheets-table__col-resize" data-resize="col"></div>
      </div>
  `
  }

  const createRow = (content, rowNumber) => {
    const resizer = rowNumber
      ? '<div class="c-sheets-table__row-resize" data-resize="row"></div>'
      : ''

    return `
      <div class="c-sheets-table__row" data-resizable>
        <div class="c-sheets-table__row-info">
          ${rowNumber + 1}
          ${resizer}
        </div>
        <div class="c-sheets-table__row-data">${content}</div>
      </div>
    `
  }

  const toChar = (_, index) => {
    return String.fromCharCode(CODES.A + index)
  }

  const colCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colCount).fill('').map(toChar).map(toColumn).join('')

  rows.push(createRow(cols, ''))

  for (let row = 0; row < rowCount; row++) {
    const cells = new Array(colCount)
      .fill('')
      .map((_, col) => toCell(col, row))
      .join('')

    rows.push(createRow(cells, row))
  }

  return rows.join('')
}
