import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormUsuario from '../../components/FormUsuario';
import {
    Form,
    Input,
    Button,
    Select,
    Divider,
    notification
} from 'antd';

import Menu from '../../components/Menu';
import { Breadcrumb, Container } from 'react-bootstrap';
import Titulo from '../../components/Titulo';
const { Item } = Breadcrumb;


function CadastroUsuario() {
  
    const [funcoes, setFuncoes] = useState(['Funcionario', 'Cliente']);
    const [nome, setNome]  = useState('');
    const [funcao, setFuncao] = useState('');
    const [cpfCnpj, setCpfCnpj]  = useState('');

    const history = useHistory();

    const onFormLayoutChange = ({ size }) => {
        console.log('formChange');
    };

    const onFinish = values => {
       setNome(values.nome);
       setFuncao(values.funcao);
       setCpfCnpj(values.cpfCnpj);
       openNotification();
       setTimeout(redirect, 1000);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const layout = {
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 5,
            span: 16,
        },
    };

    const openNotification = () => {
        notification.open({
          message: 'Salvo',
          description:
           'O usuário foi salvo com sucesso',
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      };

    const redirect = () => {
        history.goBack();
    }
      

    return (
        <div>
            <Menu />
            <Breadcrumb>
                <Item href="/">Principal</Item>
                <Item href="/usuarios">Usuários</Item>
                <Item active >Cadastrar</Item>
            </Breadcrumb>
            <Container>
                <Titulo name='Cadastro de Usuários' />
                <Divider />
                <FormUsuario update={false}/>
            </Container>
        </div>
    );
}

export default CadastroUsuario;