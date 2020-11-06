import React, { useEffect } from 'react';
import FormUsuario from '../../components/FormUsuario';
import Titulo from '../../components/Titulo';
import './index.css';
import { Container, Breadcrumb } from 'react-bootstrap';
import { Divider } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useUsuarioContext } from '../../../context/UsuarioContext';
const { Item } = Breadcrumb;

function Home() {

    const {isClienteLogado, isFuncionarioLogado,sair}  = useUsuarioContext();
    const history = useHistory();

    useEffect(()=>{
        const verificaStatusLogin = () => {
            if(!isClienteLogado() && !isFuncionarioLogado()){
                sair();
                history.push('/');
            }
        }
        verificaStatusLogin();
    },[history, isClienteLogado, isFuncionarioLogado, sair]);

    return (
        <div>
            <Breadcrumb>
                <Item >
                    <Link className='link' to='/pedidos'>Principal</Link>
                </Item>
                <Item active>Dados Pessoais</Item>
            </Breadcrumb>
            <Container>
                <Titulo name='Dados do Usuário' />
                <Divider />
                <FormUsuario cod={1} update={true} />
            </Container>

        </div>

    );
}

export default Home;