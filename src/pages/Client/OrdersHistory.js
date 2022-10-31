import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useOrder, useTable, usePayment } from '../../hooks';
import { Button, Loader } from 'semantic-ui-react';
import { map, size, forEach } from 'lodash';
import { OrderHistoryItem } from '../../components/Client';
import { ModalConfirm } from '../../components/Common';

export function OrdersHistory() {
    const { tableNumber } = useParams();
    const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
    const { getTableByNumber } = useTable();
    const { createPayment, getPaymentByTable } = usePayment();
    const [showTypePayment, setShowTypePayment] = useState(false);
    const [idTable, setIdTable] = useState(null);
    const [askBill, setAskBill] = useState(null);

    useEffect(() => {
        (async () => {
            const table = await getTableByNumber(tableNumber);
            const idTableTemp = table[0].id;
            setIdTable(idTableTemp);

            getOrdersByTable(idTableTemp, '', 'ordering=-status,-created_at');
        })()
    }, [])

    useEffect(() => {
        (async () => {
            if (idTable){
                const response = await getPaymentByTable(idTable);
                setAskBill(response);
            }
            
        })()
    }, [idTable])

    const openCloseModal = () => setShowTypePayment(prev => !prev);

    const onCreatePayment = async (paymentType) => {
        openCloseModal();

        let totalPayment = 0;
        forEach(orders, (order) => {
          totalPayment += Number(order.product_data.price);
        });
    
        const paymentData = {
          table: idTable,
          totalPayment: totalPayment.toFixed(2),
          paymentType,
          statusPayment: "PENDING",
        };
    
        const payment = await createPayment(paymentData);
        for await (const order of orders) {
          await addPaymentToOrder(order.id, payment.id);
        }
        window.location.reload();
    }

    return (
        <div>
            <Button primary fluid>
                <Link to={`/client/${tableNumber}`}><p style={{color: 'white'}}>Volver a categorias</p></Link>
            </Button>
            <h3>Historial de pedidos</h3>
            {loading ? <Loader active inline='centered'>Cargando...</Loader> 
            : 
                <>
                {size(orders) > 0 &&(
                    <Button fluid color='green' onClick={() => size(askBill) === 0 &&  openCloseModal()}>
                        {size(askBill) > 0 ? (
                            `La cuenta ya está pedida, espere un momento por favor`
                        ) : (
                            'Pedir la cuenta'
                        )}
                    </Button>
                )}
                {map(orders, (order) => (
                    <OrderHistoryItem key={order.id} order={order} />
                ))}
                    
                </> 
            }
            <ModalConfirm title='Tipo de pago' show={showTypePayment} onClose={openCloseModal} onCloseText='Efectivo' onCloseOption={() => onCreatePayment('CASH')} onConfirmText='Tarjeta de crédito o debito' onConfirm={() => onCreatePayment('CARD')} />    
        </div>
    )
}
