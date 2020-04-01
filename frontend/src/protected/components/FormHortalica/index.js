import React, { useState, useEffect } from 'react';
import { Form, Select, InputNumber, Button, Input, Divider} from 'antd';
import { notificarErro, notificarSucesso } from '../Notificacao';
import { useHistory } from 'react-router-dom';
import api from '../../../service/api';

function FormHortalica({ location }) {

    const history = useHistory();

    const categorias = ['Folhas', 'Temperos', 'Legumes', 'Raizes'];

    const [hortalica, setHortalica] = useState({});

    const [loadingSalvar, setLoadingSalvar] = useState(false);
    const [loadingAtualizar, setLoadingAtualizar] = useState(false);
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        async function buscarHortalica() {
            if (location) {
                const params = new URLSearchParams(location.search);
                const key = params.get('key');
                try {
                    const { data } = await api.get(`/hortalica/${key}`)
                    await setHortalica(data);
                    await setCarregado(true);
                    console.log(data);
                } catch (e) {
                    const { mensagem } = e.reponse.data;
                    notificarErro(mensagem);
                }
            }
        }
        buscarHortalica();
    }, [location]);

    const onFormLayoutChange = ({ size }) => {
        console.log('formChange');
    };

    const onFinish = async values => {
        setLoadingSalvar(true);
        const { nome, categoria, valor } = values;
        try {
            await api.post('/hortalica', { nome, categoria, valor });
            notificarSucesso('Hortaliça cadastrada.')
            setLoadingSalvar(false);
            history.push('/hortalicas');
        } catch (e) {
            const { mensagem } = e.reponse.data;
            notificarErro(mensagem);
            setLoadingSalvar(false);
        }

    };

    const onFinishEdit = async values => {
        setLoadingAtualizar(true);
        const { nome, categoria, valor } = values;
        try {
            await api.post('/hortalica', { nome, categoria, valor });
            notificarSucesso('Hortaliça cadastrada.')
            setLoadingAtualizar(false);
            setTimeout(_ => {
                history.push('/hortalicas')
            }, 200);

        } catch (e) {
            const { mensagem } = e.reponse.data;
            notificarErro(mensagem);
            setLoadingAtualizar(false);
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
    if (carregado) {
        return (
            <div>
                <Form id='formEdit'
                    {...layout}
                    name='basic'
                    initialValues={{
                        remember: true,
                        nome: 'nomeeee',
                        categoria: hortalica.categoria,
                        valor: hortalica.valor
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
                            }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Categoria'
                        name="categoria"
                        rules={[
                            {
                                required: true,
                                message: 'A Categoria é obrigatoria!',
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
                        label='Valor'
                        name="valor"
                        rules={[
                            {
                                required: true,
                                message: 'O valor é obrigatoria!',
                            }]}
                    >
                        <InputNumber defaultValue={0} />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Divider/>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ marginRight: '2px' }}
                            loading={loadingAtualizar}>
                            Atualizar
                        </Button>

                        <Button
                            type='danger'
                            htmlType='submit'
                            href='/hortalicas'
                        >
                            Cancelar
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    } else {
        return (

            <Form id='formCad'
                {...layout}
                name='basic'
                initialValues={{
                    remember: true
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
                    label='Categoria'
                    name="categoria"
                    rules={[
                        {
                            required: true,
                            message: 'A Categoria é obrigatoria!',
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
                    label='Valor'
                    name="valor"
                    rules={[
                        {
                            required: true,
                            message: 'O valor é obrigatoria!',
                        }]}
                >
                    <InputNumber defaultValue={0} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Divider/>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginRight: '2px' }}
                        loading={loadingSalvar}>
                        Salvar
                        </Button>

                    <Button
                        type='danger'
                        htmlType='submit'
                        href='hortalicas'
                    >
                        Cancelar
                        </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default FormHortalica;
