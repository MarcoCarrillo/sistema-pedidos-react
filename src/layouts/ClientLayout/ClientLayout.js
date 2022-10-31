import React, {useEffect} from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Icon, Button, Image, Header } from 'semantic-ui-react';
import { useTable } from '../../hooks';
import './ClientLayout.scss';

export function ClientLayout(props) {
    const { children } = props;
    const { isExistTable } = useTable();
    const { tableNumber } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const exist = await isExistTable(tableNumber);
            if(!exist) {
                navigate('/');
                toast.error(`La mesa ${tableNumber} no existe`);
            } 
        })()
    }, [tableNumber]);

    const closeTable = () => {
        navigate('/');
    }

    const goToCart = () => {
        navigate(`/client/${tableNumber}/cart`);
    }

    const goToOrders = () => {
        navigate(`/client/${tableNumber}/orders`);
    }

    return (
        <div className="client-layout-bg">
      <Container className="client-layout">
        <div className="client-layout__header">
          <Link to={`/client/${tableNumber}`}>
            <Image src='https://i.ibb.co/0B3MdZx/logo-tiburoneros.jpg' size='tiny' centered />
          </Link>
          <Header as='h3'>Mesa {tableNumber}</Header>

          <div>
            <Button icon onClick={goToCart}>
              <Icon name="shop" />
            </Button>
            <Button icon onClick={goToOrders}>
              <Icon name="list" />
            </Button>
            <Button color='red' icon onClick={closeTable}>
              <Icon  name="sign out" />
            </Button>
          </div>
        </div>
        <div className="client-layout__content">{children}</div>
      </Container>
    </div>
    );
}
