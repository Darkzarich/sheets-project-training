import { toCSS } from '@engine/utils'

const CODES = {
  A: 65,
  Z: 90,
}
export function createTable(rowCount = 20, store = {}) {
  const toCell = (col, row) => {
    const colIndex = col + 1
    const id = `${row + 1}:${col + 1}`

    const styleString = toCSS({
      width: store.colState[colIndex] || '',
    })

    const cellData = store.dataState[id]

    return `
      <div 
        class="c-sheets-table__cell" 
        contenteditable
        data-col-index="${colIndex}" 
        data-id="${id}"
        style="${styleString}"
      >${cellData || ''}</div>
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

  const createRow = (content, row) => {
    const rowNumber = row !== '' ? row + 1 : ''

    const resizer = rowNumber
      ? '<div class="c-sheets-table__row-resize" data-resize="row"></div>'
      : ''

    const styleString = toCSS({
      height: store.rowState[rowNumber] || '',
    })

    return `
      <div class="c-sheets-table__row" data-resizable style="${styleString}" data-row-index="${rowNumber}">
        <div class="c-sheets-table__row-info">
          ${rowNumber}
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
