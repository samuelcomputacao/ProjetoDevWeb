import React from 'react';
import FormHortalica from '../../components/FormHortalica';

import {
    Divider,
} from 'antd';

import { Breadcrumb, Container } from 'react-bootstrap';
import Titulo from '../../components/Titulo';
const { Item } = Breadcrumb;


function CadastroHortalica() {

    return (
        <div>
            <Breadcrumb>
                <Item href="/">Principal</Item>
                <Item href="/hortalicas">Hortaliças</Item>
                <Item active >Cadastrar</Item>
            </Breadcrumb>
            <Container>
                <Titulo nome='Cadastro de Hortaliças' />
                <Divider />
                <FormHortalica/>
            </Container>
        </div>
    );
}
export default CadastroHortalica;