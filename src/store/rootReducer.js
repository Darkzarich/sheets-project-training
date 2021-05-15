import { getFormattedDate } from '@engine/utils'
import {
  CHANGE_TEXT,
  CHANGE_STYLES,
  TABLE_RESIZE,
  APPLY_STYLE,
  CHANGE_TITLE,
  UPDATE_DATE,
} from './types'

export function rootReducer(state, action) {
  console.log('Action: ', action)
  switch (action.type) {
    case TABLE_RESIZE: {
      const type = action.payload.type === 'row' ? 'rowState' : 'colState'
      const prevState = state[type] || {}
      prevState[action.payload.id] = action.payload.value
      return { ...state, [type]: prevState }
    }
    case CHANGE_TEXT: {
      const prevState = state.dataState || {}
      prevState[action.payload.id] = action.payload.text
      return {
        ...state,
        currentText: action.payload.text,
        dataState: prevState,
      }
    }
    case CHANGE_STYLES: {
      return { ...state, currentStyles: action.payload }
    }
    case APPLY_STYLE: {
      const val = state.stylesState || {}
      action.payload.ids.forEach((id) => {
        val[id] = { ...val[id], ...action.payload.style }
      })
      return {
        ...state,
        stylesState: val,
        currentStyles: { ...state.currentStyles, ...action.payload.style },
      }
    }
    case CHANGE_TITLE: {
      return {
        ...state,
        title: action.payload,
      }
    }
    case UPDATE_DATE: {
      return {
        ...state,
        openDate: getFormattedDate(),
      }
    }
    default:
      return state
  }
}
