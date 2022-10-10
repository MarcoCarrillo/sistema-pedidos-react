import React, {Fragment, useEffect} from 'react';
import { Loader } from 'semantic-ui-react';
import { HeaderPage } from '../../components/Admin';
import { useTable } from '../../hooks';

export function TablesAdmin() {
    const { loading, tables, getTables } = useTable();

    useEffect(() => {
      getTables()
    }, []);

    console.log(tables);
    
    return (
        <Fragment>
            <HeaderPage title='Mesas' btnTitle='Crear nueva mesa' />
            {loading ? 
                <Loader active inline='centered'>Cargando...</Loader>
            :(
                <h2>Listado de mesas</h2>
            )}
        </Fragment>
    )
}
