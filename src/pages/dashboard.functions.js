import { storage } from '@engine/utils'

export function recordToHTML(recordKey) {
  const record = storage(recordKey)
  const id = recordKey.split(':')[1]

  return `
  <li class="c-dashboard-table__item">
    <a href="/#sheets/${id}"> ${record.title} </a>
    <strong> 02.02.2021 </strong>
  </li>
`
}

export function createSheetsList() {
  const records = getAllStorages()

  if (!records.length) {
    return `<p>No sheets were created yet.</p>`
  }

  return `
    <div class="c-dashboard-table__header">
      <span>Name</span>
      <span>Last open</span>
    </div>

    <ul class="c-dashboard-table__list">
      ${recordsToHTML(records)}
    </ul>
  `
}

export function recordsToHTML(records) {
  return records.map(recordToHTML).join('')
}

export function getAllStorages() {
  const storages = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key.includes('sheets')) {
      storages.push(key)
    }
  }

  return storages
}
