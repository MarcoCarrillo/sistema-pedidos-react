import React from 'react'
import { Table, Button, Icon } from 'semantic-ui-react';
import './PaymentDetail.scss';

export function PaymentDetail(props) {
    const { payment, orders, openCloseModal, onReloadOrders } = props;

    const getIconPayment = key => {
        if (key === 'CARD') return 'credit card outline'
        if (key === 'CASH') return 'money'
        else return null
    }

    return (
        <div className='payment-detail'>
            <Table celled striped>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell width={8}>Mesa:</Table.Cell>
                        <Table.Cell width={8}>{payment.table_data.number}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width={8}>Total:</Table.Cell>
                        <Table.Cell width={8}>${payment.totalPayment}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width={8}>Forma de pago:</Table.Cell>
                        <Table.Cell width={8}>
                        <Icon name={getIconPayment(payment.paymentType)} />
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>

            <Button primary fluid onClick={console.log('Cerrar mesa')}>Marcar como pagada y cerrar mesa</Button>
        </div>
    )
}
