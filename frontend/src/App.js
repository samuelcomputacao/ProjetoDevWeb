import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Rotas from './routes';
import 'antd/dist/antd.css';
import Menu from './protected/components/Menu';
function App() {
  return (
    <div>
      <Menu></Menu>
      <Rotas></Rotas>
    </div>

  );
}

export default App;
