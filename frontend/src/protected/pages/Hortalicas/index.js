import React, { useState, useEffect } from 'react';
import { Breadcrumb, Container } from 'react-bootstrap';
import Titulo from '../../components/Titulo';
import TabelaHortalicas from '../../components/TabelaHortalicas';
import { showConfirm } from '../../components/ConfirmAcao';
import { notificarSucesso, notificarErro } from '../../components/Notificacao';
import { useHistory } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {isClienteLogado } from '../../../service/usuario';
import api from '../../../service/api';

import { Divider, Button } from 'antd';
const { Item } = Breadcrumb;

function Hortalicas() {

    const [clienteLogado, setClienteLogado] = useState(false);
    const [funcionarioLogado, setFuncionarioLogado] = useState(false);

    useEffect(() => {
        const verificarUsuarioLogado = async () => {
            const clienteLogado = await isClienteLogado();
            setClienteLogado(clienteLogado);
            setFuncionarioLogado(!clienteLogado);
        }
        verificarUsuarioLogado();
    }, []);

    const history = useHistory();

    const [handleUpdateTable, setHandleUpdateTable] = useState(false);

    const carregaHortalicas = async () => {
        const { data } = await api.get('/hortalica');
        return data;
    }


    const excluiHortalica = async ({ key }) => {
        try {
            await api.delete(`/hortalica/${key}`);
            notificarSucesso('Hortaliça removida com sucesso.')
            setHandleUpdateTable(!handleUpdateTable);
        } catch (e) {
            const { mensagem } = e.response.data;
            notificarErro(mensagem);
        }
    }

    const editarHortalica = (key) => {
        history.push({
            pathname: '/perfilHortalica',
            search: `?key=${key}`
        })
    }

    const acoes = {
        title: 'Ações',
        dataIndex: 'acoes',
        key: 'acoes',
        render: (_, record) => (
            <span>
                {funcionarioLogado &&
                    <div>
                        <Button
                            title={'Editar hortaliça'}
                            type='primary'
                            style={{ marginLeft: '2px' }}
                            icon={<EditOutlined />}
                            onClick={_ => {
                                editarHortalica(record.key);
                            }}
                        />

                        <Button
                            title={'Excluir hortaliça'}
                            type='primary'
                            style={{ marginLeft: '2px' }}
                            danger
                            icon={<DeleteOutlined />}
                            onClick={_ => {
                                const title = 'Deseja excluir a hortaliça?'
                                const content = `Ao clicar em OK você excluirá a hortaliça de código ${record.key}`;
                                const params = { key: record.key };
                                showConfirm(title, content, excluiHortalica, params);
                            }
                            }
                        />
                    </div>
                }
                {clienteLogado &&
                    <Button
                        type='primary'
                        style={{ marginLeft: '2px' }}
                        danger
                        title={'Avaliar Hortaliça'}
                        icon={<DeleteOutlined />}

                    />
                }
            </span>
        )
    }

    return (
        <div>
            <Breadcrumb>
                <Item href="/">Principal</Item>
                <Item active>Hortaliças</Item>
            </Breadcrumb>
            <Container>
                <Titulo nome='Hortaliças' />
                <Divider />
                <TabelaHortalicas getData={carregaHortalicas} acoes={acoes} handleUpdateTable />
                <Divider />
                {funcionarioLogado &&
                    <Button type='primary' href='/perfilHortalica'>Cadastrar</Button>
                }
            </Container>
        </div>
    );
}

export default Hortalicas;