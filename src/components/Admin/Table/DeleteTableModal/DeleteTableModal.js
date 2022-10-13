import React from 'react';
import { toast } from 'react-toastify';
import { Button } from 'semantic-ui-react';
import { useTable } from '../../../../hooks';


export function DeleteTableModal(props) {
    const { onClose, onRefetch, table } = props;
    const { deleteTable } = useTable();

    const onDeleteTable = async (id) => {
        try {
            await deleteTable(id);
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
                ¿Estás seguro que quieres eliminar la mesa? Ésta acción es irreversible. <br />
            </p> 
            <Button negative content='Cancelar' onClick={() => onClose()} />
            <Button color='green' content='Eliminar' onClick={() => onDeleteTable(table.id)} />
        </div>
    
  )
}
