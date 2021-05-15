import Page from '@engine/router/Page'
import { $ } from '@engine/EngineDOM'

export default class DashboardPage extends Page {
  getRoot() {
    return $.create('div', 'l-dashboard').html(`
    <div class="c-dashboard">
    <div class="c-dashboard__header">
      <h1>Sheets Project Dashboard</h1>
    </div>
    <div class="c-dashboard__new">
      <div class="c-dashboard__table-cards">
        <a href="" class="c-dashboard__create">
          New <br />
          table
        </a>
      </div>
    </div>
    <div class="c-dashboard-table">
      <div class="c-dashboard-table__header">
        <span>Name</span>
        <span>Last open</span>
      </div>

      <ul class="c-dashboard-table__list">
        <li class="c-dashboard-table__item">
          <a href="#"> New table #1 </a>
          <strong> 01.02.2021 </strong>
        </li>
        <li class="c-dashboard-table__item">
          <a href="#"> New table #2 </a>
          <strong> 02.02.2021 </strong>
        </li>
        <li class="c-dashboard-table__item">
          <a href="#"> New table #3 </a>
          <strong> 03.02.2021 </strong>
        </li>
      </ul>
    </div>
    `)
  }
}
