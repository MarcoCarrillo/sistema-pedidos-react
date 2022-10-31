import React, { useState, useEffect } from "react";
import { Button, Loader } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { size } from "lodash";
import { useProduct } from "../../hooks";
import { getProductsCart } from "../../api/cart";
import { ListProductCart } from "../../components/Client";

export function Cart() {
  const [products, setProducts] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const { getProductById } = useProduct();
  const { tableNumber } = useParams();

  useEffect(() => {
    (async () => {
      const idProductsCart = getProductsCart();

      const productsArray = [];
      for await (const idProduct of idProductsCart) {
        const response = await getProductById(idProduct);
        productsArray.push(response);
      }
      setProducts(productsArray);
    })();
  }, [reloadCart]);

  const onReloadCart = () => setReloadCart((prev) => !prev);

  return (
    <div>
        <Button primary fluid>
            <Link to={`/client/${tableNumber}`}><p style={{color: 'white'}}>Volver a categorias</p></Link>
        </Button>
        <h3>Carrito</h3>
        
        {!products ? (
            <Loader active inline='centered'>Cargando...</Loader> 
        ) : size(products) === 0 ? (
            <div style={{ textAlign: "center" }}>
            <p>Tu carrito esta vacio</p>
            <Link to={`/client/${tableNumber}/orders`}>
                <Button primary>Ver pedidos</Button>
            </Link>
            </div>
        ) : (
            <ListProductCart products={products} onReloadCart={onReloadCart} />
        )}
    </div>
  );
}