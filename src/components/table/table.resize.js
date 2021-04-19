import { $ } from '@engine/EngineDOM'
import { isLeftMouseButton } from './table.functions'

export const handleTableResize = (event, $root) => {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-resizable]')
  const resizeType = $resizer.$el.dataset.resize
  const parentPos = $parent.getPos()

  if (resizeType === 'col') {
    $resizer.css({
      bottom: -window.screen.height + 'px',
      height: '2000px',
      opacity: 1,
    })
  } else {
    $resizer.css({
      right: -window.screen.width + 'px',
      width: '2000px',
      opacity: 1,
    })
  }

  document.onmousemove = (e) => {
    if (isLeftMouseButton(e)) {
      if (resizeType === 'col') {
        const offset = e.pageX - parentPos.right
        $resizer.css({
          right: -offset + 'px',
        })
      } else {
        const offset = e.pageY - parentPos.bottom
        $resizer.css({
          bottom: -offset + 'px',
        })
      }
    }
  }

  document.onmouseup = (e) => {
    if (isLeftMouseButton(e)) {
      document.onmousemove = null
      document.onmouseup = null

      if (resizeType === 'col') {
        const offset = e.pageX - parentPos.right
        const value = parentPos.width + offset + 'px'
        $root
          .findAll(`[data-col-index="${$parent.data.colIndex}"`)
          .forEach((el) => {
            el.style.width = value
          })
      } else {
        const offset = e.pageY - parentPos.bottom
        const value = parentPos.height + offset + 'px'
        $parent.css({
          height: value,
        })
      }

      $resizer.css({
        height: null,
        bottom: null,
        right: null,
        opacity: null,
      })
    }
  }
}
