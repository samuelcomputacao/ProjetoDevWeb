import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './protected/pages/Home';
import Pedidos from './protected/pages/Pedidos';
import Usuarios from './protected/pages/Usuarios';
import Hortalicas from './protected/pages/Hortalicas';
import CadastroHortalicas from './protected/pages/Hortalicas/cadastrar';
import CadastroUsuarios from './protected/pages/Usuarios/cadastrar';
import CadastroPedidos from './protected/pages/Pedidos/cadastrar';
import EditarUsuario from './protected/pages/Usuarios/editar';
import EditarHortalica from './protected/pages/Hortalicas/editar';
function Rotas() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Pedidos} />
                <Route path='/pedidos' component={Pedidos} />
                <Route path='/usuarios' component={Usuarios} />
                <Route path='/hortalicas' component={Hortalicas} />
                <Route path='/cadastroHortalicas' component={CadastroHortalicas} />
                <Route path='/editarHortalica' component={EditarHortalica} />
                <Route path='/cadastroUsuarios' component={CadastroUsuarios} />
                <Route path='/editarUsuario' component={EditarUsuario}/> 
                <Route path='/cadastroPedidos' component={CadastroPedidos} />
                <Route path='/home' component={Home}/>
            </Switch>
        </Router>
    );
}

export default Rotas;
