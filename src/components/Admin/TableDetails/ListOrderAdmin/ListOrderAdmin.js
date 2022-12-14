import { map } from 'lodash';
import React from 'react';
import { OrderItemAdmin } from '../';
import './ListOrderAdmin.scss';

export function ListOrderAdmin(props) {
    const { orders, onReloadOrders } = props;
    return (
        <div className='list-orders-admin'>
            {map(orders, (order) => (
                <OrderItemAdmin key={order.id} order={order} onReloadOrders={onReloadOrders}/>
            ))}
        </div>
    )
}
