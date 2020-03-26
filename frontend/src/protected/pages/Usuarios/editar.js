import React from 'react';
import FormUsuario from '../../components/FormUsuario';
import {
    Divider,
} from 'antd';
import { Breadcrumb, Container } from 'react-bootstrap';
import Titulo from '../../components/Titulo';
const { Item } = Breadcrumb;


function EditarUsuario({location}) {
    return (
        <div>
            <Breadcrumb>
                <Item href="/">Principal</Item>
                <Item href="/usuarios">Usuários</Item>
                <Item active >Editar</Item>
            </Breadcrumb>
            <Container>
                <Titulo nome='Editar Usuário' />
                <Divider />
                <FormUsuario location={location}/>
            </Container>
        </div>
    );
}

export default EditarUsuario;