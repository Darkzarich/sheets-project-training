import { TABLE_RESIZE } from './types'

export function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE: {
      const type = action.payload.type === 'row' ? 'rowState' : 'colState'
      const prevState = state[type] || {}
      prevState[action.payload.id] = action.payload.value
      return { ...state, [type]: prevState }
    }
    default:
      return state
  }
}
