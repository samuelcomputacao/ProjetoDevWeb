import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './protected/pages/Home';
import {withRouter} from 'react-router-dom';
import Rotas from './routes';
function App() {
  return (
      <Rotas></Rotas>
  );
}

export default App;
