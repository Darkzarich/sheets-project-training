import {
  CHANGE_TEXT,
  CHANGE_STYLES,
  TABLE_RESIZE,
  APPLY_STYLE,
  CHANGE_TITLE,
  UPDATE_DATE,
} from './types'

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

export function changeStyles(payload) {
  return {
    type: CHANGE_STYLES,
    payload,
  }
}

export function applyStyle(payload) {
  return {
    type: APPLY_STYLE,
    payload,
  }
}

export function changeTitle(payload) {
  return {
    type: CHANGE_TITLE,
    payload,
  }
}

export function updateDate(payload) {
  return {
    type: UPDATE_DATE,
  }
}
