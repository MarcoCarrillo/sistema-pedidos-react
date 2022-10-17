import React from 'react'
import { map, size } from 'lodash';
import { TableAdmin } from '../TableAdmin';
import './TablesListAdmin.scss'

export function TablesListAdmin(props) {
const { tables } = props;

  return (
    <div className='tables-list-admin'>
      {map(tables, (table) => (
        <TableAdmin key={table.number} table={table} />
      ))}
    </div>
  )
}
