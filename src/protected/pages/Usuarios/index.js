import React from 'react';
import Menu from '../../components/Menu';
import { Container,Breadcrumb } from 'react-bootstrap';
import Titulo from '../../components/Titulo';
import TabelaUsuarios from '../../components/TabelaUsuarios';
import { Divider,Button } from 'antd';
const {Item} = Breadcrumb;
function Usuarios() {
    return (
        <div>
            <Menu></Menu>
            <Breadcrumb>
                <Item href="/">Principal</Item>
                <Item active>Usuarios</Item>
            </Breadcrumb>
            <Container>
                <Titulo name='Usuários' />
                <Divider/>
                <TabelaUsuarios />
                <Divider/>
                <Button type='primary' href='/cadastroUsuarios'>Cadastrar</Button>
            </Container>

        </div>
    );
}

export default Usuarios;