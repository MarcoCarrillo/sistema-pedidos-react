import React from 'react'
import { toast } from 'react-toastify';
import { Button } from 'semantic-ui-react';
import { useProduct } from '../../../../hooks';

export function DeleteProductModal(props) {
    const { onClose, onRefetch, product } = props;
    const { deleteProduct } = useProduct();

    const onDeleteProduct = async (id) => {
        try {
            await deleteProduct(id);
            onRefetch();
            onClose();
        } catch (error) {
            toast.error(error)
            throw error;
        }
    }
    return (
        <div>
           <p>
                ¿Estás seguro que quieres eliminar el producto? Ésta acción es irreversible. <br />
            </p> 
            <Button negative content='Cancelar' onClick={() => onClose()} />
            <Button color='green' content='Eliminar' onClick={() => onDeleteProduct(product.id)} />
        </div>
    
  )
}