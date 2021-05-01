import { CHANGE_TEXT, TABLE_RESIZE } from './types'

// Action creators

export function tableResize(payload) {
  return {
    type: TABLE_RESIZE,
    payload,
  }
}

export function changeText(payload) {
  return {
    type: CHANGE_TEXT,
    payload,
  }
}
