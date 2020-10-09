import React, { useState } from 'react';
import { Container, Breadcrumb } from 'react-bootstrap';
import TabelaUsuarios from '../../components/TabelaUsuarios';
import { Modal, Radio, Button, Divider, Form, Input, Select, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import Titulo from '../../components/Titulo';
import { showConfirm } from '../../components/ConfirmAcao';
import { notificarSucesso, notificarErro } from '../../components/Notificacao';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import FooterButtons from '../../components/FooterButtons';
import api from '../../../service/api';
import './index.css';
import { isFuncionarioLogado } from '../../../service/usuario';
import { categorias } from '../../util/categorias';

const { Item } = Breadcrumb;
const { Group } = Radio;

function Usuarios() {

    const [modalVisible, setModalVisible] = useState(false);
    const [tipoCadastro, setTipoCadastro] = useState(0);

    const [handleUpdateTable, setHandleUpdateTable] = useState(false);

    const [filtro, setFiltro] = useState('');

    const history = useHistory();

    const [form] = Form.useForm();

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

    const carregaUsuarios = async (page, pageSize) => {
        let recurso = `/usuario?page=${page}&pageSize=${pageSize}`;
        if (filtro) {
            recurso += '&' + filtro;
        }
        const { data } = await api.get(recurso);
        return data;
    }

    const carregaTotal = async () => {
        let recurso = '/usuario/total';
        if (filtro) {
            recurso += '?' + filtro;
        }
        const { data } = await api.get(recurso);
        return data;
    }

    const excluiUsuario = async ({ key }) => {
        try {
            await api.delete(`/usuario/${key}`);
            notificarSucesso('Usuário removido com sucesso.')
            setHandleUpdateTable(!handleUpdateTable);
        } catch (e) {
            const { mensagem } = e.response.data;
            notificarErro(mensagem);
        }
    }

    const editarUsuario = async (usuario) => {
        history.push({
            pathname: '/perfilUsuario',
            search: `?key=${usuario.key}&tipo=${usuario.tipoUsuario}`
        });
    }

    const onFinish = async (values) => {
        const { nome, funcao, cpfCnpj, key, orderby} = values;
        setFiltro(`nome=${nome ? nome : ''}&funcao=${funcao ? funcao : ''}&cpfCnpj=${cpfCnpj ? cpfCnpj : ''}&key=${key?key:''}&orderby=${orderby ? orderby : ''}`);
        setHandleUpdateTable(!handleUpdateTable);
    };

    const getFiltro = () => {
        return (
            <Form
                form={form}
                onFinish={onFinish}
            >
                <Row gutter={24}>
                    <Col span={8} key='nome'>
                        <Form.Item
                            label='Nome'
                            name="nome"
                        >
                            <Input id='nomeId' placeholder='Nome' />
                        </Form.Item>
                    </Col>
                    <Col span={8} key='cpfCnpj'>
                        <Form.Item
                            label='Cpf/Cnpj'
                            name="cpfCnpj"
                        >
                            <Input placeholder='CPF ou CNPJ' />
                        </Form.Item>
                    </Col>
                    <Col span={8} key='funcao'>
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
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col>
                        <Form.Item
                            label='Código'
                            name="key"
                        >
                            <Input placeholder='key' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} key='orderby'>
                        <Form.Item name="orderby" label="Ordenar Por">
                            <Radio.Group>
                                <Radio value="nome">Nome</Radio>
                                <Radio value="key">Código</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} key='filtrar'>
                        <Form.Item >
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                Filtrar
                    </Button>
                            <Button
                                type="danger"
                                onClick={() => {
                                    form.resetFields();
                                }}
                                style={{ marginLeft: '2px' }}
                            >
                                Limpar
                        </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        );
    }

    const acoes = (record) => {
        return (
            <span>
                <Button
                    type='primary'
                    style={{ marginLeft: '2px' }}
                    icon={<EditOutlined />}
                    onClick={
                        _ => { editarUsuario(record) }
                    }
                />
                <Button
                    type='primary'
                    style={{ marginLeft: '2px' }}
                    danger
                    icon={<DeleteOutlined />}
                    onClick={_ => {
                        const title = 'Deseja excluir o usuário?'
                        const content = `Ao clicar em OK você excluirá o usuário de código ${record.key}`;
                        const params = { key: record.key };
                        showConfirm(title, content, excluiUsuario, params);
                    }
                    }
                />
            </span>
        );
    }

    return (
        <div>
            <Breadcrumb>
                <Item href="/">Principal</Item>
                <Item active>Usuarios</Item>
            </Breadcrumb>
            <Container className='Container'>
                <Titulo nome='Usuários' />
                <Divider />
                <TabelaUsuarios getData={carregaUsuarios} getTotal={carregaTotal} acoes={acoes} handleUpdateTable getFiltro={getFiltro} />
                <Divider />
                <FooterButtons label1='Cadastrar' visible1={isFuncionarioLogado()} callback1={openModal} visible2={false} />
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
}

export default Usuarios;