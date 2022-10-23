import React from 'react'
import { Button, Image } from 'semantic-ui-react';
import classNames from 'classnames';
import moment from 'moment';
import 'moment/locale/es';
import './OrderItemAdmin.scss';

export function OrderItemAdmin(props) {
    const { order } = props;
    const { title, image, price } = order.product_data;

    return (
        <div className={classNames('order-item-admin',{ 
           [order.status.toLowerCase()]: true,
        })}>
            <div className='order-item-admin__time'>
                <span>{moment(order.created_at).format('HH:mm')}</span>
                <span> - {moment(order.created_at).startOf('second').fromNow()}</span>
            </div>
            <div className='order-item-admin__product'>
                <Image src={image} />
                <p>{title}</p>
                
            </div>
            <div>
                <p className='price'>${price}</p>
            </div>
            <div>
                <Button>Marcar como entregado</Button>
            </div>
        </div>
    )
}
