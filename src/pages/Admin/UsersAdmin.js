import React, { useState, useEffect } from 'react';
import { HeaderPage, TableUsers, AddEditUserForm } from '../../components/Admin';
import { Loader } from 'semantic-ui-react';
import { ModalBasic } from '../../components/Common';
import { useUser } from '../../hooks';

export function UsersAdmin() {
  const { loading, users, getUsers } = useUser();
  console.log('loading',loading);
  console.log('users' ,users);

  const [titleModal, setTitleModal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    getUsers();
  }, [refetch])
  
  const openCloseModal = () => setShowModal( prev => !prev);
  const onRefetch = () => setRefetch(prev => !prev );

  const addUser = () => {
    setTitleModal('Nuevo Usuario');
    setContentModal(<AddEditUserForm onClose={openCloseModal} onRefetch={onRefetch} />);
    openCloseModal();
  }

  return (
    <>
      <HeaderPage title='Usuarios' btnTitle='Nuevo usuario' btnClick={addUser} />
      {loading ? (
        <Loader active inline='centered'>
          Cargando...
        </Loader>
      ) : (
        <TableUsers users={users}/>
      )}

      <ModalBasic size='tiny' show={showModal} onClose={openCloseModal} title={titleModal} children={contentModal} />
    </>
  )
}
