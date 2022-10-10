import React, { Fragment, useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react';
import { HeaderPage, TableProductAdmin, AddEditProductForm, DeleteProductModal } from '../../components/Admin';
import { ModalBasic } from '../../components/Common';
import { useProduct } from '../../hooks';

export function ProductAdmin() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);

    const { loading, products, getProducts } = useProduct();

    useEffect(() => { 
        getProducts();
    }, [refetch]);

    const openCloseModal = () => setShowModal(prev => !prev);
    const onRefetch = () => setRefetch(prev => !prev);

    const addProduct = () => {
        setTitleModal('Nuevo producto');
        setContentModal(<AddEditProductForm onClose={openCloseModal} onRefetch={onRefetch}/>)
        openCloseModal();
    }

    const updateProduct = (data) => {
        setTitleModal('Actualizar producto');
        setContentModal(<AddEditProductForm onClose={openCloseModal} onRefetch={onRefetch} product={data}/>)
        openCloseModal();
    }

    const deleteProduct = (data) => {
        setTitleModal('Eliminar producto');
        setContentModal(<DeleteProductModal onClose={openCloseModal} onRefetch={onRefetch} product={data}/>)
        openCloseModal();
    }

    return (
        <Fragment>
            <HeaderPage title='Productos' btnTitle='Nuevo producto' btnClick={addProduct}/>
            {loading ? (
                <Loader active inline='centered'>
                    Cargando...
                </Loader>
            ) : (
                <TableProductAdmin products={products} updateProduct={updateProduct} deleteProduct={deleteProduct} />
            )}
            <ModalBasic show={showModal} onClose={openCloseModal} title={titleModal} children={contentModal} />
        </Fragment>
    )
}
