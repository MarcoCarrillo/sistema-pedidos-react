import React, {Fragment, useEffect, useState} from 'react';
import { Loader } from 'semantic-ui-react';
import { HeaderPage, TableTablesAdmin, AddEditTableForm, DeleteTableModal } from '../../components/Admin';
import { ModalBasic } from '../../components/Common';
import { useTable } from '../../hooks';

export function TablesAdmin() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);

    const { loading, tables, getTables } = useTable();

    useEffect(() => {
      getTables()
    }, [refetch]);

    const openCloseModal = () => setShowModal(prev => !prev);
    const onRefetch = () => setRefetch(prev => !prev); 

    const addTable = () => {
        setTitleModal('Crear mesa');
        setContentModal(<AddEditTableForm onClose={openCloseModal} onRefetch={onRefetch} />);
        openCloseModal();
    }

    const updateTable = (data) => {
        setTitleModal('Actualizar mesa');
        setContentModal(
        <AddEditTableForm 
            onClose={openCloseModal} 
            onRefetch={onRefetch} 
            table={data}
        />);
        openCloseModal();
    }

    const deleteTable = (data) => {
        setTitleModal('Actualizar mesa');
        setContentModal(
        <DeleteTableModal 
            onClose={openCloseModal} 
            onRefetch={onRefetch} 
            table={data}
        />);
        openCloseModal();
    }
    
    return (
        <Fragment>
            <HeaderPage title='Mesas' btnTitle='Crear nueva mesa'  btnClick={addTable}/>
            {loading ? 
                <Loader active inline='centered'>Cargando...</Loader>
            :(
                <TableTablesAdmin tables={tables} updateTable={updateTable} deleteTable={deleteTable}/>
            )}

            <ModalBasic show={showModal} onClose={openCloseModal} title={titleModal} children={contentModal} />
        </Fragment>
    )
}
