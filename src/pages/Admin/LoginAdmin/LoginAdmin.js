import React from 'react';
import { LoginForm } from '../../../components/Admin';
import './LoginAdmin.scss';
import { Grid } from 'semantic-ui-react'

export function LoginAdmin() {
  return (
    <Grid className='login-admin' textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column className='login-admin__content' style={{ maxWidth: 450 }}>
        <LoginForm />
      </Grid.Column>
    </Grid>
  );
}
