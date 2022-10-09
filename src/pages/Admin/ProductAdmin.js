import React, { Fragment, useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react';
import { HeaderPage, TableProductAdmin, AddEditProductForm } from '../../components/Admin';
import { ModalBasic } from '../../components/Common';
import { useProduct } from '../../hooks';

export function ProductAdmin() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);

    const { loading, products, getProducts } = useProduct();

    useEffect(() => getProducts(), []);

    const openCloseModal = () => setShowModal(prev => !prev);

    const addProduct = () => {
        setTitleModal('Nuevo producto');
        setContentModal(<AddEditProductForm onClose={openCloseModal}/>)
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
                <TableProductAdmin products={products} />
            )}
            <ModalBasic show={showModal} onClose={openCloseModal} title={titleModal} children={contentModal} />
        </Fragment>
    )
}
