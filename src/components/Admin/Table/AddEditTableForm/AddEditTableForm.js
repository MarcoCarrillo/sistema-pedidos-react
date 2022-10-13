import React from 'react'
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './AddEditTableForm.scss'

export function AddEditTableForm(props) {
  const { onClose } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (formValue) => {
      console.log(formValue);
    }
  })

  return (
    <Form className='add-edit-table-form' onSubmit={formik.handleSubmit}>
      <Form.Input 
        name='number' 
        type='number' 
        placeholder='Numero de la mesa'  
        value={formik.values.number}
        onChange={formik.handleChange}
        error={formik.errors.number}
      />
      <Button type='submit' primary fluid content='Crear' ></Button>
    </Form>
  )
}

function initialValues() {
  return {
    number: ''
  }
}

function validationSchema() {
  return {
    number: Yup.number().required(true)
  }
}