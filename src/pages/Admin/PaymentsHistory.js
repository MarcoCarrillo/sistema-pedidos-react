import React, {useEffect} from 'react'
import { HeaderPage } from '../../components/Admin';
import { TablePayments } from '../../components/Admin';
import { Loader } from 'semantic-ui-react';
import { usePayment } from '../../hooks';

export function PaymentsHistory() {
  const { loading, payments, getPayments } = usePayment();

  useEffect(() => {
    getPayments();
  }, [])

  return (
    <>
        <HeaderPage title='Historial de pedidos' />
        { loading ? (
          <Loader active inline='centered'>
            Cargando...
          </Loader>
        ) : (
          <TablePayments payments={payments} />
        )}
    </>
  )
}
