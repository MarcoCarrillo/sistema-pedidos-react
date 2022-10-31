import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useOrder, useTable } from '../../hooks';
import { Button, Loader } from 'semantic-ui-react';
import { map, size, foreach } from 'lodash';
import { OrderHistoryItem } from '../../components/Client';
import { ModalConfirm } from '../../components/Common';

export function OrdersHistory() {
    const { tableNumber } = useParams();
    const { loading, orders, getOrdersByTable } = useOrder();
    const { getTableByNumber } = useTable();
    const [showTypePayment, setShowTypePayment] = useState(false);
    console.log(showTypePayment);

    useEffect(() => {
        (async () => {
            const table = await getTableByNumber(tableNumber);
            const idTable = table[0].id;

            getOrdersByTable(idTable, '', 'ordering=-status,-created_at');
        })()
    }, [])

    const openCloseModal = () => setShowTypePayment(prev => !prev);

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
                    <Button fluid color='green' onClick={() => openCloseModal()}>Pedir la cuenta</Button>
                )}
                {map(orders, (order) => (
                    <OrderHistoryItem key={order.id} order={order} />
                ))}
                    
                </> 
            }
            <ModalConfirm title='Tipo de pago' show={showTypePayment} onClose={openCloseModal} onCloseText='Efectivo' onCloseOption={() => console.log('Efectivo')} onConfirmText='Tarjeta de crédito o debito' onConfirm={() => console.log('tajeta')} />    
        </div>
    )
}
