import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { HeaderPage, AddOrderForm, ConfirmPaymentModal } from '../../components/Admin';
import { ModalBasic } from '../../components/Common';
import { ListOrderAdmin } from '../../components/Admin/TableDetails';
import { useOrder, useTable, usePayment } from '../../hooks';
import { forEach } from 'lodash';
import { toast } from 'react-toastify';

export function TableDetailsAdmin() {
  const [reloadOrders, setReloadOrders] = useState(false);
  const { loading, orders, getOrdersByTable } = useOrder();
  const { table, getTable } = useTable();
  const { createPayment } = usePayment();
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [showModalPayment, setShowModalPayment] = useState(false);
  const [paymentType, setPaymentType] = useState('');

  useEffect(() => {
    getOrdersByTable(id, '', 'ordering=-status,created_at')
  }, [id, reloadOrders]);

  useEffect(() => {
    getTable(id);
  }, [id])

  const onReloadOrders = () => setReloadOrders(prev => !prev);
  const openCloseModalProduct = () => setShowModal(prev => !prev);
  const openCloseModalPayment = () => {
    setShowModalPayment(prev => !prev)
    setPaymentType('');
  };
  
  // console.log(orders);

  const onConfirmPayment = async () => {
    if (!paymentType) {
      toast.error('Seleccione un tipo de pago')
    } else {
      let totalPayment = 0;
      forEach(orders, (order) => {
        totalPayment += Number(order.product_data.price)
      })
      const paymentData = {
        table: id,
        totalPayment: totalPayment.toFixed(2),
        paymentType: paymentType,
        statusPayment: 'PENDING',
      }
      const payment = await createPayment(paymentData);
      if (payment) {
        toast.success('Cuenta generada con éxito');
        openCloseModalPayment();
      }
    }
    
  }

  return (
    <>
    <HeaderPage 
        title={`Mesa ${table?.number || ''}`} 
        btnTitle='Añadir productos' 
        btnClick={openCloseModalProduct}
        btnTitleTwo='Generar cuenta'
        btnClickTwo={openCloseModalPayment} 
      />
      {loading ? (
        <Loader active inline='centered'>
          Cargando...
        </Loader>) :
          <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders} />
      }

      <ModalBasic show={showModal} onClose={openCloseModalProduct} title={`Añadir productos al pedido - Mesa ${table?.number || ''}`}>
        <AddOrderForm idTable={id} openCloseModal={openCloseModalProduct} onReloadOrders={onReloadOrders}/>
      </ModalBasic>
      <ConfirmPaymentModal show={showModalPayment} onClose={openCloseModalPayment} idTable={id} onConfirmPayment={onConfirmPayment} paymentType={paymentType} setPaymentType={setPaymentType} />
    </>
  )
}
