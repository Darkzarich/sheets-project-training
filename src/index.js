import './scss/index.scss'

import Router from '@engine/router/Router'
import DashboardPage from './pages/DashboardPage'
import SheetsPage from './pages/SheetsPage'

new Router('#app', {
  default: DashboardPage,
  dashboard: DashboardPage,
  sheets: SheetsPage,
})
