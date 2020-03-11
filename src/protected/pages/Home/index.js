import React from 'react';
import Menu from '../../components/Menu';
import TabelaPedidos from '../../components/TabelaPedidos';
import { Container } from 'react-bootstrap';
import Titulo from '../../components/Titulo';

function Home() {
    return (
        <div>
            <Menu></Menu>
            <Container>
                <Titulo  name='Pedidos'/>
                <TabelaPedidos/>
            </Container>
        </div>
    );
}

export default Home;