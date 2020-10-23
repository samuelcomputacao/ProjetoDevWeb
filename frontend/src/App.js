import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Rotas from './routes';
import 'antd/dist/antd.css';
import './App.css';
import UsuarioProvider from './context/UsuarioContext';

function App() {
  return (
    <UsuarioProvider>
      <div className='separeBotoom'>
        <Rotas />
      </div>
    </UsuarioProvider>
  );
}

export default App;
