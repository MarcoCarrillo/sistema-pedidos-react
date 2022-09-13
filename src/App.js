import React, { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import { Navigation } from './routes';

export default function App() {
  return (
    <Fragment>
      <Navigation />
      <ToastContainer 
        position='bottom-center'
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </Fragment>
    
  );
}
