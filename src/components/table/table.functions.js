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
