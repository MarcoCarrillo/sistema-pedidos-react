import React, { useState, useEffect } from 'react';
import { HeaderPage, TableUsers } from '../../components/Admin';
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

  useEffect(() => {
    getUsers();
  }, [])
  
  const openCloseModal = () => setShowModal( prev => !prev);

  return (
    <>
      <HeaderPage title='Usuarios' btnTitle='Nuevo usuario' btnClick={openCloseModal} />
      {loading ? (
        <Loader active inline='centered'>
          Cargando...
        </Loader>
      ) : (
        <TableUsers users={users}/>
      )}

      <ModalBasic show={showModal} onClose={openCloseModal} title='Crear Usuario' children={<h2>Content</h2>} />
    </>
  )
}
