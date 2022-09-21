import React, { useEffect } from 'react'
import { Loader } from 'semantic-ui-react';
import { HeaderPage, TableCategoryAdmin } from '../../components/Admin';
import { useCategory } from '../../hooks';

export function CategoriasAdmin() {
    const { loading, categories, getCategories } = useCategory();
    useEffect(() => {
        getCategories();
    }, [])
    
  return (
    <>
        <HeaderPage
            title= "Categorias" btnTitle="Nueva categoria"
        />    
        {loading ? (
            <Loader active inline="centered">Cargando...</Loader>
        ): <TableCategoryAdmin categories={categories} />}
    </>
  )
}
