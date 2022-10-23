import React from 'react'
import { Form, Dropdown, Button } from 'semantic-ui-react';
import './AddOrderForm.scss';

export function AddOrderForm(props) {
    const {idTable, openCloseModal} = props;


    return (
    <Form className='add-order-form'>
        <Dropdown placeholder='Productos' fluid selection search />
        <div className='add-order-form__list'>
            
        </div>

        <Button primary fluid type='submit' content='Añadir productos a la mesa' />
    </Form>
    )
}
