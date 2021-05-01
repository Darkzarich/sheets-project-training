import { CHANGE_TEXT, TABLE_RESIZE } from './types'

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
    default:
      return state
  }
}
