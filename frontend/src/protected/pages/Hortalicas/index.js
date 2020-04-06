import React from 'react';
import { Breadcrumb, Container } from 'react-bootstrap';
import Titulo from '../../components/Titulo';
import TabelaHortalicas from '../../components/TabelaHortalicas';
import { Divider, Button } from 'antd';
const { Item } = Breadcrumb;

function Hortalicas() {

    return (
        <div>
            <Breadcrumb>
                <Item href="/">Principal</Item>
                <Item active>Hortaliças</Item>
            </Breadcrumb>
            <Container>
                <Titulo nome='Hortaliças' />
                <Divider />
                <TabelaHortalicas/>
                <Divider />
                <Button type='primary' href='/perfilHortalica'>Cadastrar</Button>
            </Container>
        </div>
    );
}

export default Hortalicas;