const CODES = {
  A: 65,
  Z: 90,
}

const toCell = (content, index) => {
  return `
    <div class="c-sheets-table__cell" contenteditable data-col-index="${index}">${content}</div>
`
}

const toColumn = (letter, index) => {
  return `
    <div class="c-sheets-table__col" data-resizable data-col-index="${index}">
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

export const createTable = (rowCount = 27) => {
  const colCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colCount).fill('').map(toChar).map(toColumn).join('')

  const cells = new Array(colCount).fill('').map(toCell).join('')

  rows.push(createRow(cols, ''))

  for (let i = 0; i < rowCount; i++) {
    rows.push(createRow(cells, i + 1))
  }

  return rows.join('')
}
