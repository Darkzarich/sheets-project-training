import { defaultCellStyles, defaultTitle } from '@/constants'
import { storage } from '@/engine/utils'

const defaultState = {
  title: defaultTitle,
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultCellStyles,
}

// clear not needed saved state
const normalize = (state) => ({
  ...state,
  currentStyles: defaultCellStyles,
  currentText: '',
})

export const initialState = storage('sheets-state')
  ? normalize(storage('sheets-state'))
  : defaultState
