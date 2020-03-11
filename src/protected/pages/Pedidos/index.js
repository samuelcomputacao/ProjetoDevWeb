import React from 'react';
import Menu from '../../components/Menu';
import TabelaPedidos from '../../components/TabelaPedidos';
import Titulo from '../../components/Titulo';
import { Row, Container, Breadcrumb } from 'react-bootstrap';

function Pedidos() {
    return (
        <div>
            <Menu />
            <Breadcrumb>
                <Breadcrumb.Item href="/">Principal</Breadcrumb.Item>
                <Breadcrumb.Item active>Pedidos</Breadcrumb.Item>
            </Breadcrumb>
            <Container>
                <Titulo name="Pedidos" />
                <TabelaPedidos />
            </Container>
        </div>
    );
}

export default Pedidos;