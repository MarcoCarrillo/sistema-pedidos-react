import React from 'react';
import './AdminLayout.scss';
import { LoginAdmin } from  '../../pages/Admin';
import { TopMenu } from '../../components/Admin';
import { useAuth } from '../../hooks';
import { TOKEN } from '../../utils/constants';

export function AdminLayout(props) {
    const { children } = props;
    const { auth } = useAuth();
    if(!localStorage.getItem(TOKEN)) return <LoginAdmin />;

    return (
        <div className='admin-layout'>
            <div className='admin-layout__menu'>
                <TopMenu />
            </div>
            <div className='admin-layout__main-content'>
                {children}
            </div>
        </div>
    );
}
