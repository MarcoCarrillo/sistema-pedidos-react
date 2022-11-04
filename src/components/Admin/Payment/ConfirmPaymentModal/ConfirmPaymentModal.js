import React from 'react';
import { useState } from 'react';
import { Button, Modal, Form, Checkbox, Header, Message, Icon } from 'semantic-ui-react';
import './ConfirmPaymentModal.scss'

export function ConfirmPaymentModal(props) {
    const { show, onClose, idTable, onConfirmPayment, paymentType, setPaymentType, error } = props;

    return (
        <Modal
            open={show}
            onClose={onClose}
        >
            <Modal.Header><Icon name='money' /> Generar la cuenta - Mesa {idTable} </Modal.Header>
            <Modal.Content>
                <Header as={'h4'}> ¿Estás seguro que deseas pedir la cuenta? <br/> <br/>Selecciona el tipo de pago:</Header>
                <Form>
                    <Form.Field>
                        <Checkbox
                            radio
                            label='Tarjeta de crédito o debito'
                            name='checkboxRadioGroup'
                            value='CARD'
                            checked={paymentType === 'CARD'}
                            onChange={(e, data) => setPaymentType(data.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox
                        radio
                        label='Efectivo'
                        name='checkboxRadioGroup'
                        value='CASH'
                        checked={paymentType === 'CASH'}
                        onChange={(e, data) => setPaymentType(data.value)}
                        />
                    </Form.Field>
                </Form>
                
                 
            </Modal.Content>
            <Modal.Actions>
            <Button negative onClick={onClose}>
                Cancelar
            </Button>
            <Button positive onClick={onConfirmPayment}>
                Aceptar
            </Button>
            </Modal.Actions>
        </Modal>
    )
}
