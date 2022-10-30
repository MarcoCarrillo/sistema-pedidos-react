import React, {useState, useEffect} from 'react';
import { Image } from 'semantic-ui-react';
import { useOrder } from '../../../../hooks';
import { map } from 'lodash';
import './PaymentProductList.scss';

export function PaymentProductList(props) {
    const { payment } = props;
    const [orders, setOrders] = useState([]);
    const { getOrdersByPayment } = useOrder();

    useEffect(() => {
        (async () => {
            const response = await getOrdersByPayment(payment.id);
            setOrders(response);
        })()
    }, [])

    return (
        <div className='payment-product-list'>
            {map(orders, (order) => (
                <div key={order.id} className='payment-product-list__product'>
                    <div>
                        <Image src={order.product_data.image} avatar size='tiny'/>
                        <span>{order.product_data.title}</span>
                    </div>
                    <span>${order.product_data.price}</span>
                </div>
            ))}
        </div>
    )
}
