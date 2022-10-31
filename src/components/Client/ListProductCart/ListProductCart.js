import React, { useState, useEffect } from "react";
import { Image, Button, Icon } from "semantic-ui-react";
import { map, forEach } from "lodash";
import { useParams, useNavigate } from "react-router-dom";
import { useOrder, useTable } from "../../../hooks";
import { removeProductCartApi, cleanProductCartApi } from "../../../api/cart";
import "./ListProductCart.scss";
import { toast } from "react-toastify";

export function ListProductCart(props) {
  const { products, onReloadCart } = props;
  const [total, setTotal] = useState(0);
  const { addOrderToTable } = useOrder();
  const { getTableByNumber } = useTable();
  const { tableNumber } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let totalTemp = 0;
    forEach(products, (product) => {
      totalTemp += Number(product.price);
    });
    setTotal(totalTemp.toFixed(2));
  }, [products]);

  const removeProduct = (index) => {
    removeProductCartApi(index);
    toast.success('Producto eliminado del carrito')
    onReloadCart();
  };

  const createOrder = async () => {
    const tableData = await getTableByNumber(tableNumber);
    const idTable = tableData[0].id;

    for await (const product of products) {
      await addOrderToTable(idTable, product.id);
    }

    cleanProductCartApi();
    navigate(`/client/${tableNumber}/orders`);
  };

  return (
    <div className="list-product-cart">
      {map(products, (product, index) => (
        <div key={index} className="list-product-cart__product">
          <div>
            <Image src={product.image} avatar />
            <span>{product.title}</span>
          </div>
          <span>${product.price}</span>
          <Button negative icon onClick={() => removeProduct(index)}>
            <Icon name="close" />
          </Button>
          
        </div>
      ))}

      <Button primary fluid onClick={createOrder}>
        Realizar pedido (${total})
      </Button>
    </div>
  );
}