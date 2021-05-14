import './scss/index.scss'

import Router from '@engine/router/Router'

// import { storage, debounce } from '@engine/utils'

// import { Sheets } from '@/components/sheets/Sheets'
// import { Header } from '@/components/header/Header'
// import { Toolbar } from '@/components/toolbar/Toolbar'
// import { Formula } from '@/components/formula/Formula'
// import { Table } from '@/components/table/Table'
// import { createStore } from '@engine/createStore'
// import { rootReducer } from './store/rootReducer'
// import { initialState } from './store/initialState'

// const store = createStore(rootReducer, initialState)

// const stateToStoreMiddleware = debounce((state) => {
//   console.log('App State: ', state)
//   storage('sheets-state', state)
// }, 300)

// store.subscribe(stateToStoreMiddleware)

// const sheets = new Sheets('#app', {
//   components: [Header, Toolbar, Formula, Table],
//   store,
// })

// sheets.render()

new Router('#app', {})
