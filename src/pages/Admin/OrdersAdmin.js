import React, { useEffect } from 'react';
import { HeaderPage, TablesListAdmin } from '../../components/Admin';
import { useTable } from '../../hooks';
import { Loader } from 'semantic-ui-react';

export function OrdersAdmin() {
  const { loading, tables, getTables } = useTable();

  useEffect(() =>{ getTables()}, []);
  console.log(tables);

  return (
    <>
      <HeaderPage title='Mariscos "Los Tiburoneros"' />
      {loading ? (
        <Loader active inline='centered'>
          Cargando...
        </Loader>
      ) : <TablesListAdmin tables={tables} /> }
    </>
  )
}
