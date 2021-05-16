import { Sheets } from '@/components/sheets/Sheets'
import { Header } from '@/components/header/Header'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Formula } from '@/components/formula/Formula'
import { Table } from '@/components/table/Table'

import { storage, debounce } from '@engine/utils'
import { createStore } from '@engine/store/createStore'
import { rootReducer } from '@/store/rootReducer'
import { initialStateFromKey } from '@/store/initialState'
import Page from '@engine/router/Page'

export default class SheetsPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString()
    const storeKey = `sheets-state:${params}`
    const store = createStore(rootReducer, initialStateFromKey(storeKey))

    const stateToStoreMiddleware = debounce((state) => {
      storage(storeKey, state)
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
