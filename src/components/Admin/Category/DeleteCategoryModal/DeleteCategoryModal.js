import React from 'react'
import { Button, Modal } from 'semantic-ui-react';
import { useCategory } from '../../../../hooks';

export function DeleteCategoryModal(props) {
    const { onClose, onRefetch, category } = props;
    const { deleteCategory } = useCategory();
    console.log(category)
    const onDeleteCategory = async (id) => {
        try {
            await deleteCategory(id);
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
            <Button color='green' content='Eliminar' onClick={() => onDeleteCategory(category)} />
        </div>
    
  )
}