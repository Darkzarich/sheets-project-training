import { defaultCellStyles } from '@/constants'
import { toCSS } from '@engine/utils'
import { parse } from './table.parser'

const CODES = {
  A: 65,
  Z: 90,
}
export function createTable(rowCount = 20, store = {}) {
  const toCell = (colIndex, rowIndex) => {
    const id = `${rowIndex}:${colIndex}`

    const styleString = toCSS({
      width: store.colState[colIndex] || '',
      ...defaultCellStyles,
      ...store.stylesState[id],
    })

    const cellData = store.dataState[id]

    return `
      <div 
        class="c-sheets-table__cell" 
        contenteditable
        data-col-index="${colIndex}" 
        data-id="${id}"
        data-formula="${cellData || ''}"
        style="${styleString}"
      >${parse(cellData) || ''}</div>
  `
  }

  const toColumn = (letter, colIndex) => {
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
    const rowNumber = null || row

    const resizer =
      rowNumber !== null
        ? '<div class="c-sheets-table__row-resize" data-resize="row"></div>'
        : ''

    const styleString = toCSS({
      height: store.rowState[rowNumber] || '',
    })

    return `
      <div class="c-sheets-table__row" data-resizable style="${styleString}" data-row-index="${rowNumber}">
        <div class="c-sheets-table__row-info">
          ${row !== null ? rowNumber + 1 : ''}
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

  rows.push(createRow(cols, null))

  for (let row = 0; row < rowCount; row++) {
    const cells = new Array(colCount)
      .fill('')
      .map((_, col) => toCell(col, row))
      .join('')

    rows.push(createRow(cells, row))
  }

  return rows.join('')
}
