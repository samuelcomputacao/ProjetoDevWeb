import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Form,
    Input,
    Button,
    Select,
    notification
} from 'antd';

function FormUsuario({ cod, update }) {

    const [categorias, setCategorias] = useState(['Funcionario', 'Cliente']);
    const [nome, setNome] = useState('');
    const [funcao, setFuncao] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');

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
        if (update) {
            notification.open({
                message: 'Atualizado',
                description:
                    'O usuário foi atualizado com sucesso',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
        }else{
            notification.open({
                message: 'Salvo',
                description:
                    'O usuário foi salvo com sucesso',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
        }
    };

    const redirect = () => {
        history.goBack();
    }

    const getAcao = () => {
        let retorno = 'Salvar';
        if (update) retorno = 'Atualizar';
    }

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onValuesChange={onFormLayoutChange}
            size='larger'>
            <Form.Item
                label='Nome'
                name="nome"
                rules={[
                    {
                        required: true,
                        message: 'O nome é obrigatorio!'
                    }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label='Cpf/Cnpj'
                name="cpfCnpj"
                rules={[
                    {
                        required: true,
                        message: 'O CPF/Cnpj é obrigatorio!'
                    }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label='Função'
                name="funcao"
                rules={[
                    {
                        required: true,
                        message: 'A Função é obrigatoria!',
                    }]}
            >
                <Select>
                    {
                        categorias.map((cat) => {
                            return (<Select.Option value={cat} key={cat}>{cat}</Select.Option>)
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
                {update &&
                    <Button
                        type="primary"
                        htmlType="submit">

                        Atualizar
                    </Button>
                }
                {!update &&
                    <Button
                        type="primary"
                        htmlType="submit">
                        Salvar
                    </Button>
                }
                <Button
                    type="danger"
                    onClick={redirect}
                    htmlType="submit"
                    style={{ marginLeft: '2px' }}
                >
                    Cancelar
                        </Button>

            </Form.Item>
        </Form>
    );
}

export default FormUsuario;