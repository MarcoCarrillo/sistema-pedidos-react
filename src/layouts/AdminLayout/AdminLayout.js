import React from 'react';
import './AdminLayout.scss';
import { LoginAdmin } from  '../../pages/Admin'
import { useAuth } from '../../hooks';
import { TOKEN } from '../../utils/constants';

export function AdminLayout(props) {
    const { children } = props;
    const { auth } = useAuth();
    console.log(auth)

    if(!localStorage.getItem(TOKEN)) return <LoginAdmin />;

    return (
        <div>
            <h2>AdminLayout</h2>
            {children}
        </div>
    );
}
