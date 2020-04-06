import React, { useState, useEffect } from 'react';
import FormUsuario from '../../components/FormUsuario';
import {
    Divider,
} from 'antd';
import { Breadcrumb, Container } from 'react-bootstrap';
import Titulo from '../../components/Titulo';
const { Item } = Breadcrumb;


function PerfilUsuario({ location }) {

    const [tipoUsuario, setTipoUsuario] = useState(0);
    const [key, setKey] = useState('');
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        async function buscaUsuario() {
            if (location) {
                console.log('entrou location');
                const params = new URLSearchParams(location.search);
                const k = params.get('key');
                const t = params.get('tipo');
                if (t) {
                    await setTipoUsuario(parseInt(t));
                }

                if (k) {
                    await setKey(k);
                    setCarregado(true);
                } 
            }
        }
        buscaUsuario();
    }, [location,carregado]);
    if (carregado) {
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
                    <FormUsuario tipoUsuario={tipoUsuario} keyUsuario={key} atualizar />
                </Container>
            </div>
        );
    }else {
        return(
            <div>
            <Breadcrumb>
                <Item href="/">Principal</Item>
                <Item href="/usuarios">Usuários</Item>
                <Item active >Cadastrar</Item>
            </Breadcrumb>
            <Container>
                <Titulo nome='Cadastrar Usuário' />
                <Divider />
                <FormUsuario tipoUsuario={tipoUsuario} atualizar={false} />
            </Container>
        </div>
        );
    }
}

export default PerfilUsuario;