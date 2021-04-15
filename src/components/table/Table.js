import {SheetsComponent} from '@engine/SheetsComponent.js'

export class Table extends SheetsComponent {
  static className = 'c-sheets-table'

  toHTML() {
    return `
    <div class="c-sheets-table__row">
    <div class="c-sheets-table__row-info">

    </div>
    <div class="c-sheets-table__row-data">
      <div class="c-sheets-table__col">
        A
      </div>
      <div class="c-sheets-table__col">
        B
      </div>
      <div class="c-sheets-table__col">
        C
      </div>
    </div>
  </div>
  <div class="c-sheets-table__row">
    <div class="c-sheets-table__row-info">
      1
    </div>
    <div class="c-sheets-table__row-data">
      <div 
        class="c-sheets-table__cell c-sheets-table__cell--selected" 
        contenteditable
      >
A1
      </div>
      <div class="c-sheets-table__cell" contenteditable>
B2
      </div>
      <div class="c-sheets-table__cell" contenteditable>
C3
      </div>
    </div>
  </div>
  <div class="c-sheets-table__row">
    <div class="c-sheets-table__row-info">
      2
    </div>
    <div class="c-sheets-table__row-data">
      <div class="c-sheets-table__cell" contenteditable>
A1
      </div>
      <div class="c-sheets-table__cell" contenteditable>
B2
      </div>
      <div class="c-sheets-table__cell" contenteditable>
C3
      </div>
    </div>
  </div>  
    `
  }
}
