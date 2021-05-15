import Page from '@engine/router/Page'
import { $ } from '@engine/EngineDOM'
import { createSheetsList } from './dashboard.functions'

export default class DashboardPage extends Page {
  getRoot() {
    const newId = Date.now().toString()

    return $.create('div', 'l-dashboard').html(`
      <div class="c-dashboard">
      <div class="c-dashboard__header">
        <h1>Sheets Project Dashboard</h1>
      </div>
      <div class="c-dashboard__new">
        <div class="c-dashboard__table-cards">
          <a href="#sheets/${newId}" class="c-dashboard__create">
            New <br />
            table
          </a>
        </div>
      </div>
      <div class="c-dashboard-table">
        ${createSheetsList()}
      </div>
    `)
  }
}
