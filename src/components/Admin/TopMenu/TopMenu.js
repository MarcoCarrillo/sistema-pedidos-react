import React, { useState } from 'react';
import { Icon, Menu, Image, Button, Dropdown } from 'semantic-ui-react';
import { useAuth }  from '../../../hooks'
import { useUser } from '../../../hooks';
import './TopMenu.scss';
import { TOKEN } from '../../../utils/constants';
import { Link } from 'react-router-dom';

export function TopMenu() {
    const { auth, logout } = useAuth();


    const renderName = () => {
        if(auth === null || auth === undefined) {
            return 'Bienvenido!';
        }
        if(auth.me?.first_name && auth.me?.last_name) {
            return `Bienvenido ${auth.me.first_name} ${auth.me.last_name}!`;
        }
        return auth.me?.email;
    }

  return (
    <Menu fixed='top' className='top-menu-admin'>
        <Menu.Menu position='left'>
            <Menu.Item className='top-menu-admin__logo'>
                <Image src='https://i.ibb.co/0B3MdZx/logo-tiburoneros.jpg' size='tiny' centered />
            </Menu.Item>
            <Menu.Item as={Link} to={'/admin'} position='left'>
                <Menu.Item>{renderName()}</Menu.Item>
            </Menu.Item>
        </Menu.Menu>
        <Menu.Menu>
            <Menu.Item>
                <Dropdown
                    text='Status'
                    icon='question'
                    floating
                    labeled
                    button
                    className='icon'
                >
                    <Dropdown.Menu>
                        <Dropdown.Header icon='microchip' content='Mesas' />
                        <Dropdown.Divider />
                        <Dropdown.Item>
                            <Icon name='circle' color='black' />
                            <span>Mesa vacía</span>
                        </Dropdown.Item>
                        <Dropdown.Item text='Mesa vacia'>
                            <Icon name='circle' color='yellow' />
                            <span>Mesa ocupada sin pedidos pendientes</span>
                        </Dropdown.Item>
                        <Dropdown.Item text='Mesa vacia'>
                            <Icon name='circle' color='blue' />
                            <span>Mesa ocupada con pedidos pendientes</span>
                        </Dropdown.Item>
                        <Dropdown.Item text='Mesa vacia'>
                            <Icon name='circle' color='orange' />
                            <span>Numero de productos pendientes</span>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Header icon='pencil' content='Pedidos' />
                        <Dropdown.Divider />
                        <Dropdown.Item>
                            {/* <Icon name='circle' color='black' /> */}
                            <span>Producto pendiente</span>
                        </Dropdown.Item>
                        <Dropdown.Item text='Mesa vacia'>
                            {/* <Icon name='circle' color='yellow' /> */}
                            <span>Producto entregado</span>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                    
                </Dropdown>
                
            </Menu.Item>
        </Menu.Menu>
        <Menu.Item onClick={logout}>
            <Icon size='large' name="sign out" />
            <p>Cerrar Sesion</p>
        </Menu.Item>
        
    </Menu>
  )
}
