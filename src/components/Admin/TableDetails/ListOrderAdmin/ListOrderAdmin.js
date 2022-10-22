import { map } from 'lodash';
import React from 'react';
import { OrderItemAdmin } from '../';
import './ListOrderAdmin.scss';

export function ListOrderAdmin(props) {
    const { orders } = props;
    console.log(orders);
    return (
        <div className='list-orders-admin'>
            {map(orders, (order) => (
                <OrderItemAdmin key={order.id} order={order} />
            ))}
        </div>
    )
}
