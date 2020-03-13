import React from 'react';
import Menu from '../../components/Menu';
import { Container,Breadcrumb } from 'react-bootstrap';
import Titulo from '../../components/Titulo';
import TabelaHortalicas from '../../components/TabelaHortalicas';

function Hortalicas() {
    return (
        <div>
            <Menu></Menu>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Principal</Breadcrumb.Item>
                <Breadcrumb.Item active>Hortaliças</Breadcrumb.Item>
            </Breadcrumb>
            <Container>
                <Titulo name='Hortaliças'/>
                <TabelaHortalicas />
            </Container>
        </div>
    );
}

export default Hortalicas;