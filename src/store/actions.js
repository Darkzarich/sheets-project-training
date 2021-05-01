import { TABLE_RESIZE } from './types'

// Action creators

export function tableResize(payload) {
  return {
    type: TABLE_RESIZE,
    payload,
  }
}
