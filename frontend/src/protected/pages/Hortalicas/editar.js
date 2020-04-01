import React from 'react';
import {Breadcrumb,Container} from 'react-bootstrap';
import {Divider} from 'antd';
import Titulo from '../../components/Titulo';
import FormHortalica from '../../components/FormHortalica';
const {Item} = Breadcrumb;

function EditarHortalica({location}) {
    return (
        <div>
            <Breadcrumb>
                <Item href="/">Principal</Item>
                <Item href="/hortalicas">Hortaliças</Item>
                <Item active >Editar</Item>
            </Breadcrumb>
            <Container>
                <Titulo nome='Editar Hortaliça' />
                <Divider />
                <FormHortalica location={location} />
            </Container>
        </div>
    );
}
export default EditarHortalica;