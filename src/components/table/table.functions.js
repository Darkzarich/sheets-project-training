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

export const getSelectDirection = (event) => {
  switch (event.key) {
    case 'Tab':
    case 'ArrowRight':
      return [0, 1]
    case 'ArrowLeft':
      return [0, -1]
    case 'ArrowUp':
      return [-1, 0]
    case 'Enter':
    case 'ArrowDown':
      return [1, 0]
  }
}
