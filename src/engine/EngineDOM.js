class EngineDOM {
  constructor(selector) {
    this.$el =
      typeof selector === 'string' ? document.querySelector(selector) : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  get data() {
    return this.$el.dataset
  }

  css(styles = {}) {
    if (typeof styles === 'object') {
      for (const key in styles) {
        if (key in styles) {
          this.$el.style[key] = styles[key]
        }
      }

      return this
    }

    return this.$el.style
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getPos() {
    return this.$el.getBoundingClientRect()
  }

  clear() {
    this.html('')
    return this
  }

  append(node) {
    if (node instanceof EngineDOM) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }

    return this
  }

  id(parse) {
    if (parse) {
      const id = this.id().split(':')
      return {
        row: +id[0],
        col: +id[1],
      }
    }
    return this.data.id
  }

  focus() {
    this.$el.focus()
    return this
  }

  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text
      return this
    }
    return this.$el.textContent.trim()
  }

  addClass(className) {
    return $(this.$el.classList.add(className))
  }

  removeClass(className) {
    return $(this.$el.classList.remove(className))
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
}

export const $ = (selector) => {
  return new EngineDOM(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
