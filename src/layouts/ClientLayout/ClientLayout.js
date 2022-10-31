import React, {useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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

    }

    return (
        <div>
            <h1>ClientLayout</h1>
            {children}
        </div> 
    );
}
