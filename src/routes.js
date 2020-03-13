import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './protected/pages/Home';
import Pedidos from './protected/pages/Pedidos';
import Usuarios from './protected/pages/Usuarios';
import Hortalicas from './protected/pages/Hortalicas';

function Rotas() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/pedidos" component={Pedidos} />
                <Route path="/usuarios" component={Usuarios} />
                <Route path="/hortalicas" component={Hortalicas} />
            </Switch>
        </Router>
    );
}

export default Rotas;
