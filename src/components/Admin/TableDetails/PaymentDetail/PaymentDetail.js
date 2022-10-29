import React from 'react'
import { toast } from 'react-toastify';
import { Table, Button, Icon } from 'semantic-ui-react';
import { usePayment } from '../../../../hooks';
import './PaymentDetail.scss';

export function PaymentDetail(props) {
    const { payment, orders, openCloseModal, onReloadOrders } = props;
    const { closePayment } = usePayment();

    const getIconPayment = key => {
        if (key === 'CARD') return 'credit card outline'
        if (key === 'CASH') return 'money'
        else return null
    }

    const onCloseTable = async () => {
        await closePayment(payment.id)
        toast.success('Cuenta cerrada exitosamente')
        openCloseModal();
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

            <Button primary fluid onClick={onCloseTable}>Marcar como pagada y cerrar cuenta</Button>
        </div>
    )
}
