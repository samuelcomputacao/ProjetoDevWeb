import React, { useState, useEffect } from 'react';
import { notificarErro, notificarSucesso } from '../Notificacao/index';
import api from '../../../service/api';
import {
    Form,
    Button,
    Select,
    Input,
    Divider
} from 'antd';
import { useHistory } from 'react-router-dom';

function FormUsuario({ atualizar, keyUsuario, tipoUsuario }) {

    const [usuario, setUsuario] = useState({});
    const [carregado, setCarregado] = useState(false);

    const [loadingSalvar, setLoadingSalvar] = useState(false);
    const [loadingAtualizar, setloadingAtualizar] = useState(false);

    const categorias = ['Funcionario', 'Cliente'];
    const history = useHistory();

    useEffect(() => {
        async function buscaUsuario() {
            if (atualizar) {
                if (keyUsuario) {
                    try {
                        const { data } = await api.get(`/usuario/${keyUsuario}`);
                        await setUsuario(data);
                        setCarregado(true);
                    } catch (e) {

                    }
                }
            }
        }
        buscaUsuario();
    }, [atualizar, keyUsuario, tipoUsuario]);

    const cadastrarUsuario = async (usuario) => {
        setLoadingSalvar(true);
        const { nome, cpfCnpj, senha, funcao, tipoUsuario } = usuario;
        try {
            await api.post('/usuario', { nome, funcao, cpfCnpj, senha, tipoUsuario });
            notificarSucesso('O usuário foi cadastrado com sucesso.');
            setLoadingSalvar(false);
            setTimeout(() => {
                history.push('/usuarios');
            }, 200);
        } catch (e) {
            const { mensagem } = e.response.data;
            notificarErro(mensagem);
            setLoadingSalvar(false);
        }
    }

    const editarUsuario = async (usuario) => {
        setloadingAtualizar(true);
        const { nome, funcao, senha, key } = usuario;
        try {
            await api.put('/usuario', { nome, funcao, senha }, { params: { 'key': key } });
            notificarSucesso('O usuário foi atualizado com sucesso.');
            setloadingAtualizar(false);
            setTimeout(() => {
                history.push('/usuarios');
            }, 200);
        } catch (e) {
            const { mensagem } = e.response.data;
            notificarErro(mensagem);
            setloadingAtualizar(false);
        }
    }

    const onFormLayoutChange = ({ size }) => {
        console.log('formChange');
    };

    const onFinish = async (values) => {

        const { nome, funcao, cpfCnpj, senha, confirmSenha } = values;

        if (senha !== confirmSenha) {
            notificarErro('As senhas não são iguais');
        } else {

            const usuarioC = {
                nome,
                funcao,
                cpfCnpj,
                senha,
                tipoUsuario
            };
            cadastrarUsuario(usuarioC);
        }
    };

    const onFinishEdit = async (values) => {
        setloadingAtualizar(true);
        const { nome, funcao, cpfCnpj, senha } = values;

        if (nome && funcao && cpfCnpj) {
            const usuarioEdit = {
                nome,
                funcao,
                senha,
                key: usuario.key
            };
            editarUsuario(usuarioEdit);
        }

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

    const validarCpfCnpj = (value) => {
        const regexCpf = '^[0-9]{3}[.][0-9]{3}[.][0-9]{3}[-][0-9]{2}$';
        const regexCnpj = '^[0-9]{3}[.][0-9]{3}[.][0-9]{3}[/][0-9]{4}[-][0-9]{2}$';

        if (value) {
            console.log('Tipo: ' + tipoUsuario);
            if (tipoUsuario === 0) {
                if (value.match(regexCpf)) {
                    return Promise.resolve();
                } else {
                    return Promise.reject('O CPF não se encontra no formato: xxx.xxx.xxx-xx');
                }
            } else if (tipoUsuario === 1) {
                if (value.match(regexCnpj)) {
                    console.log('math cnpj');
                    return Promise.resolve();
                } else {
                    return Promise.reject('O Cnpj não se encontra no formato: xxx.xxx.xxx/xxxx-xx');
                }
            }
        }
        return Promise.resolve();
    }

    if (carregado) {
        return (
            <div>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                        nome: usuario.nome,
                        funcao: usuario.funcao,
                        cpfCnpj: usuario.cpfCnpj
                    }}
                    onFinish={onFinishEdit}
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
                            }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={tipoUsuario === 0 ? 'Cpf' : 'Cnpj'}
                        name="cpfCnpj"

                    >
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item
                        label='Função'
                        name="funcao"
                    >
                        <Select>
                            {
                                categorias.map((cat) => {
                                    return (<Select.Option value={cat} key={cat}>{cat}</Select.Option>)
                                })
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label='Senha'
                        name='senha'
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label='Confirmação'
                        name="confirmSenha"
                        rules={[

                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value && !getFieldValue('senha')) {
                                        return Promise.resolve();
                                    } else if (getFieldValue('senha') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject('As senhas não são iguais!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Divider/>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loadingAtualizar}
                        >
                            Atualizar
                        </Button>

                        <Button
                            type="danger"
                            href="/usuarios"
                            style={{ marginLeft: '2px' }}
                        >
                            Cancelar
                        </Button>
                    </Form.Item>
                </Form>
            </div>);
    } else {

        return (
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
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
                    <Input id='nomeId' />
                </Form.Item>
                <Form.Item
                    label={tipoUsuario === 0 ? 'Cpf' : 'Cnpj'}
                    name="cpfCnpj"
                    rules={[
                        {
                            required: true,
                            message: `O ${tipoUsuario === 0 ? 'Cpf' : 'Cnpj'} é obrigatorio!`
                        },
                        () => ({
                            validator(_, value) {
                                return validarCpfCnpj(value);
                            },
                        }),

                    ]}
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

                <Form.Item
                    label='Senha'
                    name="senha"
                    rules={[
                        {
                            required: true,
                            message: 'A senha é obrigatoria!'
                        }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label='Confirmação'
                    name="confirmSenha"
                    rules={[
                        {
                            required: true,
                            message: 'A confirmação da senha é obrigatoria!'
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('senha') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject('As senhas não são iguais!');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Divider/>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loadingSalvar}
                    >
                        Salvar
                    </Button>
                    <Button
                        type="danger"
                        href="/usuarios"
                        style={{ marginLeft: '2px' }}
                    >
                        Cancelar
                        </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default FormUsuario;