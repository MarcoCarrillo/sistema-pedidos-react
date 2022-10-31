import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useOrder, useTable } from '../../hooks';
import { Button, Loader } from 'semantic-ui-react';
import { map, size, foreach } from 'lodash';
import { OrderHistoryItem } from '../../components/Client';

export function OrdersHistory() {
    const { tableNumber } = useParams();
    const { loading, orders, getOrdersByTable } = useOrder();
    const { getTableByNumber } = useTable();
    console.log(orders);

    useEffect(() => {
        (async () => {
            const table = await getTableByNumber(tableNumber);
            const idTable = table[0].id;

            getOrdersByTable(idTable, '', 'ordering=-status,-created_at');
        })()
    }, [])

    return (
        <div>
            <Button primary fluid>
                <Link to={`/client/${tableNumber}`}><p style={{color: 'white'}}>Volver a categorias</p></Link>
            </Button>
            <h3>Historial de pedidos</h3>
            {loading ? <Loader active inline='centered'>Cargando...</Loader> 
            : 
                <> {map(orders, (order) => (
                    <OrderHistoryItem key={order.id} order={order} />
                ))}
                    
                </> }
        </div>
    )
}
