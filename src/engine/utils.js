// Pure functions

export const capitalize = (string) => {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const swapPropsIfLess = (obj1, obj2, prop) => {
  if (obj1[prop] > obj2[prop]) {
    const temp = obj1[prop]
    obj1[prop] = obj2[prop]
    obj2[prop] = temp
  }
}

export const storage = (key, data = null) => {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export const toCSS = (styleObj = {}) => {
  return Object.keys(styleObj)
    .map((key) =>
      styleObj[key] ? `${fromCamelToKebab(key)}: ${styleObj[key]};` : ''
    )
    .join('')
}

export const fromCamelToKebab = (str) => {
  return str.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())
}

export const isEqual = (a, b) => {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}
