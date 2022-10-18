import React, {useState, useEffect} from 'react'
import { size } from 'lodash';
import { Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ReactComponent as IcTable } from '../../../../assets/mesa.svg';
import { getOrdersByTableApi } from '../../../../api/orders';
import { ORDER_STATUS } from '../../../../utils/constants';
import './TableAdmin.scss'


export function TableAdmin(props) {
  const { table } = props;
  const [orders, setOrders] = useState([]);
  const [tableBusy, setTableBusy] = useState(false);

  console.log(orders);

  useEffect(() => {
    (async () => {
      const response = await getOrdersByTableApi(table.number, ORDER_STATUS.PENDING);
      setOrders(response);
    })()
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getOrdersByTableApi(table.number, ORDER_STATUS.DELIVERED);
      if(size(response) > 0) setTableBusy(response)
      else setTableBusy(false);
    })()
  }, []);

  return (
    <Link className='table-admin' to={`/admin/table/${table.id}`}>
      {size(orders) > 0 ? (
        <Label circular color='orange' >{size(orders)}</Label>
      ) : null}
      <IcTable className={classNames({
        pending: size(orders) > 0,
        busy: tableBusy
      })} />
      <p>Mesa {table.number}</p>
    </Link>
  )
}
