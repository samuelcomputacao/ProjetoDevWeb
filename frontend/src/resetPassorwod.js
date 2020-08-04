import React from 'react';
import 'antd/dist/antd.css';
import { Container } from 'react-bootstrap';
import { Form, Input, Button, Divider } from 'antd';
import Titulo from './protected/components/Titulo';
import api from '../src/service/api';
import {notificarErro, notificarSucesso} from '../src/protected/components/Notificacao';
import {useHistory} from 'react-router-dom';

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
const ResetPassword = () => {
    const history = useHistory();
    const onFinish = async values => {
        try{
            const {cpfCnpj,senha,confirmSenha} = values;
            if(senha===confirmSenha){
                await api.post('/resetPassword',{cpfCnpj,senha});
                notificarSucesso('Senha alterada com sucesso!');
                history.push('/');
            }else{
                notificarErro('As senhas não são iguais.');
            }
        }catch(e){
            notificarErro(e.response.data.mensagem);
        }
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Titulo nome="Nova Senha" />
            <Divider />
            <Container className='Container'>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Cpf/Cnpj"
                        name="cpfCnpj"
                        rules={[
                            {
                                required: true,
                                message: 'O CpfCnpj é obrigatório!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Senha"
                        name="senha"
                        rules={[
                            {
                                required: true,
                                message: 'A senha é obrigatória!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Confime a Senha"
                        name="confirmSenha"
                        rules={[
                            {
                                required: true,
                                message: 'A confirmação da senha é obrigatória!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" style={{margin:'2px'}}>
                            Mudar senha
                        </Button>
                    </Form.Item>
                </Form>
            </Container>
        </div>
    );
};

export default ResetPassword;