import React from 'react';
import { Button, Icon, Checkbox } from 'semantic-ui-react';
import { map, size } from 'lodash';
import { TableAdmin } from '../TableAdmin';
import './TablesListAdmin.scss'

export function TablesListAdmin(props) {
const { tables } = props;

  return (
    <div className='tables-list-admin'>
      <Button className='tables-list-admin__reload' primary icon onClick={() => console.log('refetch')}>
        <Icon name='refresh'/>
      </Button>
      <div className='tables-list-admin__reload-toggle'>
        <span>Pedidos en tiempo real</span>
        <Checkbox toggle onChange={(_, data) => console.log(data.checked)} />
      </div>
      {map(tables, (table) => (
        <TableAdmin key={table.number} table={table} />
      ))}
    </div>
  )
}
