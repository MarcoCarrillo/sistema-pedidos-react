import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { HeaderPage, AddOrderForm, ConfirmPaymentModal } from '../../components/Admin';
import { ModalBasic } from '../../components/Common';
import { ListOrderAdmin, PaymentDetail } from '../../components/Admin/TableDetails';
import { useOrder, useTable, usePayment } from '../../hooks';
import { forEach, size } from 'lodash';
import { toast } from 'react-toastify';

export function TableDetailsAdmin() {
  const [reloadOrders, setReloadOrders] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
  const { table, getTable } = useTable();
  const { createPayment, getPaymentByTable } = usePayment();
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

  useEffect(() => {
    (async () => {
      const response = await getPaymentByTable(id);
      if (size(response) > 0) setPaymentData(response[0]);
    })()
  }, [reloadOrders])

  const onReloadOrders = () => setReloadOrders(prev => !prev);
  const openCloseModalProduct = () => setShowModal(prev => !prev);
  const openCloseModalPayment = () => {
    setShowModalPayment(prev => !prev)
    setPaymentType('');
  };

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
      for await (const order of orders) {
        await addPaymentToOrder(order.id, payment.id)
      }
      if (payment) {
        toast.success('Cuenta generada con éxito');
        onReloadOrders();
        openCloseModalPayment();
      }
    }
    
  }

  return (
    <>
    <HeaderPage 
        title={`Mesa ${table?.number || ''}`} 
        btnTitle={paymentData ? 'Ver cuenta' : 'Añadir productos' }
        btnClick={openCloseModalProduct}
        btnTitleTwo={!paymentData ? 'Generar cuenta' : null}
        btnClickTwo={openCloseModalPayment} 
      />
      {loading ? (
        <Loader active inline='centered'>
          Cargando...
        </Loader>) :
          <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders} />
      }

      <ModalBasic show={showModal} onClose={openCloseModalProduct} title={ paymentData ? 'Cerrar cuenta' : `Añadir productos al pedido - Mesa ${table?.number || ''}`}>
        { paymentData ? 
          <PaymentDetail payment={paymentData} orders={orders} openCloseModal={openCloseModalProduct} onReloadOrders={onReloadOrders} /> : 
          <AddOrderForm idTable={id} openCloseModal={openCloseModalProduct} onReloadOrders={onReloadOrders}/>
        }
       
      </ModalBasic>
      <ConfirmPaymentModal show={showModalPayment} onClose={openCloseModalPayment} idTable={id} onConfirmPayment={onConfirmPayment} paymentType={paymentType} setPaymentType={setPaymentType} />
    </>
  )
}
