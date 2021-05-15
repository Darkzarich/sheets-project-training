import { Sheets } from '@/components/sheets/Sheets'
import { Header } from '@/components/header/Header'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Formula } from '@/components/formula/Formula'
import { Table } from '@/components/table/Table'

import { storage, debounce } from '@engine/utils'
import { createStore } from '@engine/createStore'
import { rootReducer } from '@/store/rootReducer'
import { initialState } from '@/store/initialState'
import Page from '@engine/router/Page'

export default class SheetsPage extends Page {
  getRoot() {
    const store = createStore(rootReducer, initialState)

    const stateToStoreMiddleware = debounce((state) => {
      console.log('App State: ', state)
      storage('sheets-state', state)
    }, 300)

    store.subscribe(stateToStoreMiddleware)

    this.sheets = new Sheets({
      components: [Header, Toolbar, Formula, Table],
      store,
    })

    return this.sheets.getRoot()
  }

  afterRender() {
    this.sheets.init()
  }

  destroy() {
    this.sheets.destroy()
  }
}
