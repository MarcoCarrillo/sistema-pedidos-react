import React, { useEffect, useState } from 'react'
import { Loader } from 'semantic-ui-react';
import { AddEditCategoryForm, HeaderPage, TableCategoryAdmin } from '../../components/Admin';
import { useCategory } from '../../hooks';
import { ModalBasic } from '../../components/Common';

export function CategoriasAdmin() {
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState(null)
    const [contentModal, setContentModal] = useState(null)
    const { loading, categories, getCategories } = useCategory();
    useEffect(() => {
        getCategories();
    }, []);

    const openCloseModal = () => setShowModal(prev => !prev);

    const addCategory = () => {
        setTitleModal('Nueva categoria');
        setContentModal(<AddEditCategoryForm/>)
        openCloseModal()
    }
    
  return (
    <>
        <HeaderPage
            title= "Categorias" btnTitle="Nueva categoria" btnClick={addCategory}
        />    
        {loading ? (
            <Loader active inline="centered">Cargando...</Loader>
        ): <TableCategoryAdmin categories={categories} />}
        <ModalBasic 
            show={showModal}
            onClose={openCloseModal}
            title={titleModal}
            children={contentModal}
        />
    </>
  )
}