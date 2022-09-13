import React from 'react';
import { Button, Form, Image, Header } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { loginApi } from '../../../api/user'; 
import './LoginForm.scss';


export function LoginForm() {
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async formValue => {
            try {
                const response = await loginApi(formValue);
                const { access } = response;
                console.log(access)
            } catch (error) {
                toast.error(error.message)
            }
        }
    });

    return (
    <Form className='login-form-admin' onSubmit={formik.handleSubmit}>
        <Image src='https://i.ibb.co/0B3MdZx/logo-tiburoneros.jpg' size='small' centered />
        <Header as='h2'>Administración</Header>
        <Form.Input 
            name='email'
            placeholder='Correo electrónico'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
        />
        <Form.Input 
            name='password'
            placeholder='Contraseña'
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
        />
        <Button type='submit' content='Iniciar Sesión' primary fluid />
    </Form>
    );
}

function initialValues() {
    return {
        email: "",
        password: ""
    }
}

function validationSchema() {
    return {
        email: Yup.string().email(true).required(true),
        password: Yup.string().required(true)
    };
}