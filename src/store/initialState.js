import { defaultCellStyles, defaultTitle } from '@/constants'
import { storage, getFormattedDate } from '@/engine/utils'

const defaultState = {
  title: defaultTitle,
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultCellStyles,
  openDate: getFormattedDate(),
}

// clear not needed saved state
const normalize = (state) => ({
  ...state,
  currentStyles: defaultCellStyles,
  currentText: '',
})

export function initialStateFromKey(key) {
  return storage(key)
    ? normalize(storage(key))
    : JSON.parse(JSON.stringify(defaultState))
}
