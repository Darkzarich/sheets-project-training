// Pure functions

/**
 * @param {string} string
 * @return {string} the first letter of string uppercased
 */
export const capitalize = (string) => {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Swaps props values if provided key prop is less for obj2 compared to obj1
 * @param {Object} obj1
 * @param {Object} obj2
 * @param {string} prop
 */
export const swapPropsIfLess = (obj1, obj2, prop) => {
  if (obj1[prop] > obj2[prop]) {
    const temp = obj1[prop]
    obj1[prop] = obj2[prop]
    obj2[prop] = temp
  }
}

/**
 * Sets localStorage key to data. if no data provided gets the value from the key
 * @param {string} key
 * @param {Object} data
 * @return {Object} localStorage parsed value
 */
export const storage = (key, data = null) => {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}

/**
 * Returns HTML-valid styles string from an object. Ensures kebab-case
 * @param {Object} styleObj
 * @return {string} HTML-valid styles string
 */
export const toCSS = (styleObj = {}) => {
  return Object.keys(styleObj)
    .map((key) =>
      styleObj[key] ? `${fromCamelToKebab(key)}: ${styleObj[key]};` : ''
    )
    .join('')
}

/**
 * Transforms camelCase string to kebab-case
 * @param {string} str
 * @return {string} kebab-case string
 */
export const fromCamelToKebab = (str) => {
  return str.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())
}

/**
 * Compare two any values. For objects compare their stringify versions
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
export const isEqual = (a, b) => {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}
