import React, { useState } from 'react';
import { Container, Breadcrumb } from 'react-bootstrap';
import TabelaUsuarios from '../../components/TabelaUsuarios';
import { Modal, Radio, Button, Divider } from 'antd';
import { useHistory } from 'react-router-dom';
import Titulo from '../../components/Titulo';
import {showConfirm} from '../../components/ConfirmAcao';
import { notificarSucesso, notificarErro } from '../../components/Notificacao';
import {DeleteOutlined,EditOutlined } from '@ant-design/icons';
import api from '../../../service/api';
import './index.css';

const { Item } = Breadcrumb;
const { Group } = Radio;

function Usuarios() {

    const [modalVisible, setModalVisible] = useState(false);
    const [tipoCadastro, setTipoCadastro] = useState(0);

    const [handleUpdateTable, setHandleUpdateTable] = useState(false);

    const history = useHistory();

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

    const carregaUsuarios = async () => {
        const { data } = await api.get('/usuario');
        return data;
    }

    const excluiUsuario = async ({key}) =>{
        try {
            await api.delete(`/usuario/${key}`);
            notificarSucesso('Usuário removido com sucesso.')
            setHandleUpdateTable(!handleUpdateTable);
        } catch (e) {
            const {mensagem} = e.response.data;
            notificarErro(mensagem);
        }
    }

    const editarUsuario = async (usuario) => {
        history.push({
            pathname: '/perfilUsuario',
            search: `?key=${usuario.key}&tipo=${usuario.tipoUsuario}`
        });

    }

    const acoes = {
        title: 'Ações',
        dataIndex: 'acoes',
        key: 'acoes',
        render: (text, record) => (
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
                        const params = { key:record.key };
                        showConfirm(title, content, excluiUsuario, params);
                    }
                    }
                />
            </span>
        ),
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
                <TabelaUsuarios getData={carregaUsuarios} acoes={acoes} handleUpdateTable/>
                <Divider />
                <Button type='primary' onClick={openModal}>Cadastrar</Button>
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