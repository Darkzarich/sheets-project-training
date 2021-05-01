import './scss/index.scss'

import { Sheets } from '@/components/sheets/Sheets'
import { Header } from '@/components/header/Header'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Formula } from '@/components/formula/Formula'
import { Table } from '@/components/table/Table'
import { createStore } from '@engine/createStore'
import { rootReducer } from './store/rootReducer'

const store = createStore(rootReducer)

const sheets = new Sheets('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
})

sheets.render()
