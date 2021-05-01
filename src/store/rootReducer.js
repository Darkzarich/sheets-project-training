import { TABLE_RESIZE } from './types'

export function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE: {
      const prevState = state.colState || {}
      prevState[action.payload.id] = action.payload.value
      return { ...state, colState: prevState }
    }
    default:
      return state
  }
}
