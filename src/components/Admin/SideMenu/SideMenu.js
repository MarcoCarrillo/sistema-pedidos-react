import React from 'react'
import { Menu, Icon } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks'; 
import './SideMenu.scss'

export function SideMenu(props) {
    const { children } = props;
    const { pathname } = useLocation();
    return (
        <div className='side-menu-admin'>
            <MenuLeft pathname={pathname}/>
            <div className='content'>{children}</div>
        </div>
    );
}

function MenuLeft(props) {
    const { pathname } = props;
    const { auth } = useAuth();
    console.log(auth);

    return(
        <Menu fixed='left' borderless className='side' vertical>
            <Menu.Item as={Link} to={'/admin'} active={pathname === '/admin'}>
                <p className='item-menu'><Icon name='pencil' size='large' /> Pedidos</p>
            </Menu.Item>
            <Menu.Item as={Link} to={'/admin/tables'} active={pathname === '/admin/tables'}>
                <p className='item-menu'><Icon name='microchip' size='large' /> Mesas</p>
            </Menu.Item>
            {auth.me?.is_staff && (
                <div>
                    <Menu.Item as={Link} to={'/admin/payments-history'} active={pathname === '/admin/payments-history'}>
                        <p className='item-menu'><Icon name='history' size='large' /> Historial de Pedidos</p>
                    </Menu.Item>
                    <Menu.Item as={Link} to={'/admin/categories'} active={pathname === '/admin/categories'}>
                        <p className='item-menu'><Icon name='book' size='large' /> Categorias</p>
                    </Menu.Item>
                    <Menu.Item as={Link} to={'/admin/products'} active={pathname === '/admin/products'}>
                        <p className='item-menu'><Icon name='food' size='large' /> Productos</p>
                    </Menu.Item>
                    <Menu.Item as={Link} to={'/admin/users'} active={pathname === '/admin/users'}>
                        <p className='item-menu'><Icon name='users' size='large' /> Usuarios</p>
                    </Menu.Item>
                </div>
            
            )}
            
        </Menu>
    );
}