import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { HeaderPage } from '../../components/Admin';
import { ListOrderAdmin } from '../../components/Admin/TableDetails';
import { useOrder, useTable } from '../../hooks'

export function TableDetailsAdmin() {
  const [reloadOrders, setReloadOrders] = useState(false);
  const { loading, orders, getOrdersByTable } = useOrder();
  const { table, getTable } = useTable();
  const { id } = useParams();
  // console.log(table);


  useEffect(() => {
    getOrdersByTable(id, '', 'ordering=-status,created_at')
  }, [id, reloadOrders]);

  useEffect(() => {
    getTable(id);
  }, [id])

  const onReloadOrders = () => setReloadOrders(prev => !prev);
  
  console.log(orders);

  return (
    <>
    <HeaderPage title={`Mesa ${table?.number || ''}`} />
      {loading ? (
        <Loader active inline='centered'>
          Cargando...
        </Loader>) :
          <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders} />
      }
    </>
  )
}
