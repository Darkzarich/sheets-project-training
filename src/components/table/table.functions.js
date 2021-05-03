const MOUSE_BUTTONS = {
  LEFT: 0,
  RIGHT: 2,
}

export const isLeftMouseButton = (event) => {
  return event.button === MOUSE_BUTTONS.LEFT
}

export const shouldResize = (event) => {
  return Boolean(event.target.dataset.resize) && isLeftMouseButton(event)
}

export const isSelectable = (event) => {
  return Boolean(event.target.dataset.id)
}

export const isSelectingGroup = (event) => {
  return event.shiftKey
}

export const isControlKey = (event) => {
  return [
    'Tab',
    'ArrowRight',
    'ArrowLeft',
    'ArrowUp',
    'Enter',
    'ArrowDown',
  ].includes(event.key)
}

export const getNextCellCord = (event, { row, col }) => {
  const MIN_VALUE = 0
  switch (event.key) {
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowLeft':
      col--
      break
    case 'ArrowUp':
      row--
      break
    case 'Enter':
    case 'ArrowDown':
      row++
      break
  }

  return { row: Math.max(MIN_VALUE, row), col: Math.max(MIN_VALUE, col) }
}
