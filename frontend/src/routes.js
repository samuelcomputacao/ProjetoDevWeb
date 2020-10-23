import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './protected/pages/Home';
import Pedidos from './protected/pages/Pedidos';
import Usuarios from './protected/pages/Usuarios';
import Hortalicas from './protected/pages/Hortalicas';
import PerfilUsuario from './protected/pages/Usuarios/perfil';
import PerfilHortalica from './protected/pages/Hortalicas/perfil';
import PerfilPedidos from './protected/pages/Pedidos/perfil';
import ResetPassword from './resetPassorwod';
import Menu from './protected/components/Menu';
import Login from './login';
function Rotas() {
    return (
        <Router>
            <Menu />
            <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/pedidos' component={Pedidos} />
                <Route path='/usuarios' component={Usuarios} />
                <Route path='/hortalicas' component={Hortalicas} />
                <Route path='/perfilHortalica' component={PerfilHortalica} />
                <Route path='/perfilUsuario' component={PerfilUsuario} />
                <Route path='/perfilPedidos' component={PerfilPedidos} />
                <Route path='/home' component={Home} />
                <Route path='/resetPassword' component={ResetPassword} />
            </Switch>
        </Router>
    );
}

export default Rotas;
