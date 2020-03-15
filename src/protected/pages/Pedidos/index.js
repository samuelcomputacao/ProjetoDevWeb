import React from 'react';
import Menu from '../../components/Menu';
import TabelaPedidos from '../../components/TabelaPedidos';
import Titulo from '../../components/Titulo';
import {Container, Breadcrumb} from 'react-bootstrap';
import { Divider,Button} from 'antd';
const {Item} = Breadcrumb;

function Pedidos() {
    return (
        <div>
            <Menu />
            <Breadcrumb>
                <Item href="/">Principal</Item>
                <Item active>Pedidos</Item>
            </Breadcrumb>
            <Container>
                <Titulo name="Pedidos" />
                <Divider/>
                <TabelaPedidos />
                <Divider/>
                <Button type='primary' href='/CadastroHortalicas'>Cadastrar</Button>
            </Container>
        </div>
    );
}

export default Pedidos;