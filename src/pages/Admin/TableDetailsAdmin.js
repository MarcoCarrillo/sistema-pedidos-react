import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { Dropdown, Icon, Loader } from 'semantic-ui-react';
import { HeaderPage } from '../../components/Admin';
import { ListOrderAdmin } from '../../components/Admin/TableDetails';
import { useOrder } from '../../hooks'

export function TableDetailsAdmin() {
  const { loading, orders, getOrdersByTable } = useOrder();
  const { id } = useParams();


  useEffect(() => {
    getOrdersByTable(id, '', 'ordering=-status,created_at')
  }, [])
  
  console.log(orders);

  return (
    <>
    <HeaderPage title={`Mesa ${id}`} />
      {loading ? (
        <Loader active inline='centered'>
          Cargando...
        </Loader>) :
          <ListOrderAdmin orders={orders} />
      }
    </>
  )
}
