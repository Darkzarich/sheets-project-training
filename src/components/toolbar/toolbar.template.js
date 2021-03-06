function toButton(button) {
  return /* html*/ `
  <div data-type="button" data-value='${JSON.stringify(
    button.value
  )}' class="c-sheets-toolbar__button ${button.active ? 'active' : ''}">
    <i class="material-icons">
      ${button.icon}
    </i>
  </div>
`
}

export function createToolbar(state) {
  const buttons = [
    {
      icon: 'format_align_left',
      active: state['textAlign'] === 'left',
      value: {
        textAlign: 'left',
      },
    },
    {
      icon: 'format_align_center',
      active: state['textAlign'] === 'center',
      value: {
        textAlign: 'center',
      },
    },
    {
      icon: 'format_align_right',
      active: state['textAlign'] === 'right',
      value: {
        textAlign: 'right',
      },
    },
    {
      icon: 'format_bold',
      active: state['fontWeight'] === 'bold',
      value: {
        fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold',
      },
    },
    {
      icon: 'format_italic',
      active: state['fontStyle'] === 'italic',
      value: {
        fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic',
      },
    },
    {
      icon: 'format_underlined',
      active: state['textDecoration'] === 'underline',
      value: {
        textDecoration:
          state['textDecoration'] === 'underline' ? 'none' : 'underline',
      },
    },
    {
      icon: 'strikethrough_s',
      active: state['textDecoration'] === 'line-through',
      value: {
        textDecoration:
          state['textDecoration'] === 'line-through' ? 'none' : 'line-through',
      },
    },
  ]

  return buttons.map(toButton).join('')
}
