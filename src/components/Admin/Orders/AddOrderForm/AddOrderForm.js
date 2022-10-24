import React, { useState, useEffect } from 'react'
import { Form, Dropdown, Button, Image } from 'semantic-ui-react';
import { map } from 'lodash';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useProduct } from '../../../../hooks';
import './AddOrderForm.scss';
import { toast } from 'react-toastify';

export function AddOrderForm(props) {
    const {idTable, openCloseModal} = props;
    const [productsFormat, setProductsFormat] = useState([]);
    const [productsData, setProductsData] = useState([]);
    const { products, getProducts, getProductById } = useProduct();
    // console.log(products);
    // console.log(productsFormat);
    console.log(productsData);

    useEffect(() => {
        getProducts();
    }, [])

    useEffect(() => {
        setProductsFormat(formatDropdownData(products))
    }, [products])

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            console.log('Añadiendo nuevos productos');
            console.log(formValue);
        }
    });

    useEffect(() => {
        addProductList();
    },[formik.values])

    const addProductList = async () => {
        try {
            const productsId = formik.values.products;
            const arrayTemp = [];
            for await (const idProduct of productsId) {
                const response = await getProductById(idProduct);
                arrayTemp.push(response)
            }
            setProductsData(arrayTemp);
        } catch (error) {
            console.log(error);
            toast.error('Ha ocurrido un error al añadir el producto, intentalo mas tarde')
        }
    }

    return (
    <Form className='add-order-form' onSubmit={formik.handleSubmit}>
        <Dropdown 
            placeholder='Productos' 
            fluid 
            selection 
            search 
            options={productsFormat} 
            value={null}  
            onChange={(_, data) => formik.setFieldValue('products', [...formik.values.products, data.value])}  
        />
        <div className='add-order-form__list'>
            {map(productsData, (product, index) => (
                <div className='add-order-form__list-product' key={index}>
                    <div>
                        <Image src={product.image} avatar size='tiny' />
                        <span>{product.title}</span>
                    </div>
                    <div>
                        <span>Precio: ${product.price}</span>
                    </div>
                    <Button type='button' content='Eliminar' color='red' />
                </div>
            ))}
        </div>

        <Button primary fluid type='submit' content='Añadir productos' />
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

function initialValues() {
    return {
        products: [],
    }
}

function validationSchema() {
    return {
        products: Yup.array().required(true)
    }
}