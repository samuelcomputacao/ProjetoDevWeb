import React from 'react';
import FormUsuario from '../../components/FormUsuario';
import {
    Divider,
} from 'antd';
import { Breadcrumb, Container } from 'react-bootstrap';
import Titulo from '../../components/Titulo';
const { Item } = Breadcrumb;


function CadastroUsuario({location}) {

    return (
        <div>
            <Breadcrumb>
                <Item href="/">Principal</Item>
                <Item href="/usuarios">Usuários</Item>
                <Item active >Cadastrar</Item>
            </Breadcrumb>
            <Container>
                <Titulo nome='Cadastro de Usuários' />
                <Divider />
                <FormUsuario location={location}/>
            </Container>
        </div>
    );
}

export default CadastroUsuario;