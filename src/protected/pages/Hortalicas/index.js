import React from 'react';
import Menu from '../../components/Menu';
import { Breadcrumb, Container } from 'react-bootstrap';
import Titulo from '../../components/Titulo';
import TabelaHortalicas from '../../components/TabelaHortalicas';
import { Divider,Button } from 'antd';
const {Item} = Breadcrumb;

function Hortalicas() {
    return (
        <div>
            <Menu />
            <Breadcrumb>
                <Item href="/">Principal</Item>
                <Item active>Hortaliças</Item>
            </Breadcrumb>
            <Container>
                <Titulo name='Hortaliças' />
                <Divider/>                
                <TabelaHortalicas />
                <Divider/>
                <Button type='primary' href='/CadastroHortalicas'>Cadastrar</Button>
            </Container>
        </div>
    );
}

export default Hortalicas;