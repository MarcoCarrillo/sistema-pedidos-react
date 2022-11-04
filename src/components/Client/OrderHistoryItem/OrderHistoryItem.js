import React from "react";
import { Image } from "semantic-ui-react";
import classNames from "classnames";
import moment from "moment";
import "moment/locale/es";
import { ORDER_STATUS } from "../../../utils/constants";
import "./OrderHistoryItem.scss";

export function OrderHistoryItem(props) {
  const { order } = props;
  const { title, image, price } = order.product_data;

  return (
    <div
      className={classNames("order-history-item", {
        [order.status.toLowerCase()]: true,
      })}
    >
      <div className="order-history-item__time">
        <span>
          Pedido {moment(order.created_at).startOf("second").fromNow()}
        </span>
      </div>

      <div className="order-history-item__product">
        <Image src={image} />
        <p style={{fontSize: 12}}>{title}</p>
      </div>

      {order.status === ORDER_STATUS.PENDING ? (
        <span style={{fontSize: 12}}>Pedido en curso</span>
      ) : (
        <span style={{fontSize: 12}}>Entregado</span>
      )}
    </div>
  )
}