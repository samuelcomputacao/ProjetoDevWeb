import React from 'react';
import { Container, Breadcrumb } from 'react-bootstrap';
import TabelaUsuarios from '../../components/TabelaUsuarios';
import './index.css';
const { Item } = Breadcrumb;

function Usuarios() {
    return (
        <div>
            <Breadcrumb>
                <Item href="/">Principal</Item>
                <Item active>Usuarios</Item>
            </Breadcrumb>
            <Container className='Container'>
                <div id='divUsuarioId'>
                <TabelaUsuarios />
                </div>
            </Container>
        </div>
    );
}

export default Usuarios;