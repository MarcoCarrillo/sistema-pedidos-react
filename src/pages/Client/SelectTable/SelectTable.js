import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form, Image } from 'semantic-ui-react';
import { useTable } from '../../../hooks';
import './SelectTable.scss';

export function SelectTable(props) {
    const navigate = useNavigate();

    const [tableNum, setTableNum] = useState(null);
    const { isExistTable } = useTable();
    
    const onSubmit = async () => {
        if (!tableNum){
            toast.error('Aun no has colocado el número de mesa')
        } else {
            const exist = await isExistTable(tableNum);
            console.log(exist);
            if (exist) {
                navigate(`/client/${tableNum}`);
            } else {
                toast.error('La mesa que ingresaste no existe')
            }
        }
    }

    return (
        <div className='select-table'>
            <div className='select-table__content'>
                <Image src='https://i.ibb.co/0B3MdZx/logo-tiburoneros.jpg' size='small' centered />
                <h1>Bienvenido</h1>
                <h2>Ingresa tu número de mesa</h2>

                <Form onSubmit={onSubmit}>
                    <Form.Input placeholder='Ejemplo: 1, 3, 5' type='number' onChange={(_, data) => setTableNum(data.value)}/>
                    <Button primary fluid>
                        Entrar
                    </Button>
                </Form>
            </div>
        </div>
    )
}
