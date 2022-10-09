
import React, { useCallback, useEffect, useState } from 'react'
import { Form, Image, Button, Dropdown, Checkbox } from 'semantic-ui-react';
import { useCategory } from '../../../../hooks';
import { useDropzone } from 'react-dropzone';
import { map } from 'lodash';
import './AddEditProductForm.scss'

export function AddEditProductForm() {
    const [categoriesFormat, setCategoriesFormat] = useState([]);
    const [previewImage, setPreviewImage] = useState(null)
    const { categories, getCategories } = useCategory();

    useEffect(() => {
        getCategories();
        setCategoriesFormat(formatDropdownData(categories))
    }, [categories]);

    const onDrop = useCallback(async (acceptedFile) => {
        const file = acceptedFile[0];
        setPreviewImage(URL.createObjectURL(file));
    }, [])

    const {getRootProps, getInputProps} = useDropzone({
        accept: '/image/jpeg, image/png',
        noKeyboard: true,
        multiple: false,
        onDrop
    })

  return (
    <Form className='add-edit-product-form'>
        <Form.Input name='title' placeholder='Nombre del producto' />
        <Form.Input name='price' type='number' placeholder='Precio' />
        
        <Dropdown placeholder='Categoria' fluid selection search options={categoriesFormat} />

        <div className='add-edit-product-form__active'>
            <Checkbox toggle />
            Producto activo
        </div>
        
        <input {...getInputProps()} />
        
        <Button type='button' fluid {...getRootProps()}>Subir imagen</Button>
        <Image src={previewImage} />
        <Button type='submit' primary fluid>Crear producto</Button>
    </Form>
  )
}

function formatDropdownData(data) {
    return map(data, (item) => ({
        key: item.id,
        text: item.title,
        value: item.id
    }))
}