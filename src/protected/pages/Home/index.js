import React from 'react';
import Menu from '../../components/Menu';
import TabelaPedidos from '../../components/TabelaPedidos';
import Titulo from '../../components/Titulo';
import './index.css';
import { Container,Breadcrumb} from 'react-bootstrap';
const {Item} = Breadcrumb;

function Home() {
    return (
        <div>
            <Menu />
            <Breadcrumb>
                <Item active="/">Principal</Item>
            </Breadcrumb>
            <Container>
                <Titulo name='Pedidos' />
                <TabelaPedidos />
            </Container>

        </div>

    );
}

export default Home;