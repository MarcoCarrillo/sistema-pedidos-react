import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { HeaderPage, AddOrderForm } from '../../components/Admin';
import { ModalBasic } from '../../components/Common';
import { ListOrderAdmin } from '../../components/Admin/TableDetails';
import { useOrder, useTable } from '../../hooks'

export function TableDetailsAdmin() {
  const [reloadOrders, setReloadOrders] = useState(false);
  const { loading, orders, getOrdersByTable } = useOrder();
  const { table, getTable } = useTable();
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    getOrdersByTable(id, '', 'ordering=-status,created_at')
  }, [id, reloadOrders]);

  useEffect(() => {
    getTable(id);
  }, [id])

  const onReloadOrders = () => setReloadOrders(prev => !prev);
  const openCloseModal = () => setShowModal(prev => !prev);
  
  console.log(orders);

  return (
    <>
    <HeaderPage 
        title={`Mesa ${table?.number || ''}`} 
        btnTitle='Añadir producto' 
        btnClick={openCloseModal} 
      />
      {loading ? (
        <Loader active inline='centered'>
          Cargando...
        </Loader>) :
          <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders} />
      }

      <ModalBasic show={showModal} onClose={openCloseModal} title={`Añadir productos al pedido - Mesa ${table?.number || ''}`}>
        <AddOrderForm idTable={id} openCloseModal={openCloseModal} />
      </ModalBasic>
    </>
  )
}
