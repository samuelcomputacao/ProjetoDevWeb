import React from 'react';
import FormUsuario from '../../components/FormUsuario';
import Titulo from '../../components/Titulo';
import './index.css';
import { Container,Breadcrumb} from 'react-bootstrap';
import { Divider } from 'antd';
const {Item} = Breadcrumb;

function Home() {
    return (
        <div>
            <Breadcrumb>
                <Item active="/">Dados Pessoais</Item>
            </Breadcrumb>
            <Container>
                <Titulo name='Dados do Usuário' />
                <Divider/>
                <FormUsuario cod={1} update={true}/>
            </Container>

        </div>

    );
}

export default Home;