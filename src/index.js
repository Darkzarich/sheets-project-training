import './scss/index.scss'

import {Sheets} from '@/components/sheets/Sheets'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'

const sheets = new Sheets('#app', {
  components: [
    Header,
    Toolbar,
    Formula,
    Table,
  ],
})

sheets.render()
