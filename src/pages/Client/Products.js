import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Loader } from 'semantic-ui-react';
import { ListProducts } from '../../components/Client';
import { useProduct } from '../../hooks';

export function Products() {
    const { tableNumber, idCategory } = useParams();
    const { loading, products, getProductByCategory } = useProduct();
    
    useEffect(() => {
        getProductByCategory(idCategory)
    }, [idCategory]);

    console.log(products);


    return (
        <div>
            <Button primary fluid>
                <Link to={`/client/${tableNumber}`}><p style={{color: 'white'}}>Volver a categorias</p></Link>
            </Button>
            <h3>Productos de la categoría</h3>
            {loading ? <Loader active inline='centered'>Cargando...</Loader> 
            : <ListProducts products={products} /> }
        </div>

    )
}
