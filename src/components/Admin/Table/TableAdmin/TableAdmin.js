import React, {useState, useEffect} from 'react'
import { size } from 'lodash';
import { Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ReactComponent as IcTable } from '../../../../assets/mesa.svg';
import { getOrdersByTableApi } from '../../../../api/orders';
import { ORDER_STATUS } from '../../../../utils/constants';
import { usePayment } from '../../../../hooks';
import './TableAdmin.scss'

export function TableAdmin(props) {
  const { table, reload } = props;
  const [orders, setOrders] = useState([]);
  const [tableBusy, setTableBusy] = useState(false);
  const [pendingPayment, setPendingPayment] = useState(false);
  const { getPaymentByTable } = usePayment();

  // console.log(orders);

  useEffect(() => {
    (async () => {
      const response = await getOrdersByTableApi(table.number, ORDER_STATUS.PENDING);
      setOrders(response);
    })()
  }, [reload]);

  useEffect(() => {
    (async () => {
      const response = await getOrdersByTableApi(table.number, ORDER_STATUS.DELIVERED);
      if(size(response) > 0) setTableBusy(response)
      else setTableBusy(false);
    })()
  }, [reload]);

  useEffect(() => {
    (async () => {
      const response = await getPaymentByTable(table.id);
      if (size(response) > 0) setPendingPayment(true);
      else setPendingPayment(false)
    })()
  }, [reload])

  return (
    <Link className='table-admin' to={`/admin/table/${table.id}`}>
      {size(orders) > 0 ? (
        <Label circular color='orange' >{size(orders)}</Label>
      ) : null}

      {pendingPayment && (
        <Label circular color='orange' >Cuenta</Label>
      )}

      <IcTable className={classNames({
        pending: size(orders) > 0,
        busy: tableBusy,
        "pending-payment": pendingPayment
      })} />
      <p>Mesa {table.number}</p>
    </Link>
  )
}
