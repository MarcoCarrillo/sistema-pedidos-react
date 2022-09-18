import React from 'react'
import { toast } from 'react-toastify';
import { Button, Modal } from 'semantic-ui-react';
import { useUser } from '../../../../hooks';

export function DeleteUserModal(props) {
    const { onClose, onRefetch, user } = props;
    const { deleteUser } = useUser();
    console.log(user)
    const onDeleteUser = async (id) => {
        try {
            await deleteUser(id);
            onRefetch();
            onClose();
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
           <p>
                ¿Estás seguro que quieres eliminar al usuario? Ésta acción es irreversible. <br />
            </p> 
            <Button negative content='Cancelar' onClick={() => onClose()} />
            <Button color='green' content='Eliminar' onClick={() => onDeleteUser(user)} />
        </div>
    
  )
}
