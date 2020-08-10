import React, { useEffect,useState } from 'react';
import 'antd/dist/antd.css';
import { Container } from 'react-bootstrap';
import { Form, Input, Button, Divider,Modal,Radio } from 'antd';
import Titulo from './protected/components/Titulo';
import api from '../src/service/api';
import { getToken, setToken } from '../src/service/usuario';
import { notificarErro } from '../src/protected/components/Notificacao';
import { useHistory } from 'react-router-dom';
const { Group } = Radio;

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

const Login = () => {

    const history = useHistory();
    const [modalVisible, setModalVisible] = useState(false);
    const [tipoCadastro, setTipoCadastro] = useState(0);


    useEffect(() => {
        const vefificaToken = async () => {
            try {
                const token = await getToken();
                if (token) {
                    const { data } = await api.get('/verificaToken', { params: { Authentication: token } });
                    const { auth } = data;
                    if (auth === true) {
                        history.push('/pedidos');
                    }
                }
            } catch (e) {

            }
        }
        vefificaToken();
    }, [history]);


    const onFinish = async values => {
        try {
            const { cpfCnpj, senha } = values;
            const { data } = await api.get('/login', { params: { cpfCnpj, senha } });
            const { token } = data;
            setToken(token);
            history.push('/pedidos');
        } catch (e) {
            notificarErro(e.response.data.mensagem);
        }   
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const redirectResetPassword = () => {
        history.push('/resetPassword');
    }

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };

    const onChange = e => {
        setTipoCadastro(e.target.value);
    };

    const openModal = () => {
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    const redirectCadastro = () => {
        history.push({
            pathname: '/perfilUsuario',
            search: `?tipo=${tipoCadastro}`
        });
    }

    return (
        <div>
            <Titulo nome="Login" />
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

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" style={{ margin: '2px' }}>
                            Entrar
                        </Button>
                        <Button type="primary" htmlType="button" onClick={openModal} style={{ margin: '2px' }}>
                            Cadastre-se?
                        </Button>
                        <Button type="link" htmlType="button" onClick={redirectResetPassword}>
                            Esqueceu a senha?
                        </Button>
                    </Form.Item>
                </Form>
                <Modal
                    visible={modalVisible}
                    title="Tipo de Cadastro!"
                    onOk={redirectCadastro}
                    onCancel={closeModal}
                    footer={[
                        <Button key='back' danger type='primary' onClick={closeModal}>
                            Cancelar
                    </Button>,
                        <Button key='submit' type='primary' onClick={redirectCadastro}>
                            Confirmar
                    </Button>,
                    ]}
                >
                    <Group onChange={onChange} value={tipoCadastro}>
                        <Radio style={radioStyle} value={0}>
                            Pessoa Física
                    </Radio>
                        <Radio style={radioStyle} value={1}>
                            Pessoa Jurídica
                     </Radio>
                    </Group>
                </Modal>
            </Container>
        </div>
    );
};

export default Login;