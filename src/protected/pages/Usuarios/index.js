import React from 'react';
import Menu from '../../components/Menu';
import TabelaPedidos from '../../components/TabelaPedidos';
import { Container,Breadcrumb } from 'react-bootstrap';
import Titulo from '../../components/Titulo';
import TabelaUsuarios from '../../components/TabelaUsuarios';
function Usuarios() {
    return (
        <div>
            <Menu></Menu>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Principal</Breadcrumb.Item>
                <Breadcrumb.Item active>Usuarios</Breadcrumb.Item>
            </Breadcrumb>
            <Container>
                <Titulo name='Usuários' />
                <TabelaUsuarios />
            </Container>

        </div>
    );
}

export default Usuarios;