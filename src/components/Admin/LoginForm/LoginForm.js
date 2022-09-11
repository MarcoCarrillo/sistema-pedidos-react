import React from 'react';
import { Button, Form, Image, Header } from 'semantic-ui-react';
import './LoginForm.scss';


export function LoginForm() {
  return (
    <Form className='login-form-admin' >
        <Image src='https://i.ibb.co/0B3MdZx/logo-tiburoneros.jpg' size='small' centered />
        <Header as='h2'>Administración</Header>
        <Form.Input 
            name='email'
            placeholder='Correo electrónico'
        />
        <Form.Input 
            name='password'
            placeholder='Contraseña'
            type='password'
        />
        <Button type='submit' content='Iniciar Sesión' primary fluid />
    </Form>
  )
}
