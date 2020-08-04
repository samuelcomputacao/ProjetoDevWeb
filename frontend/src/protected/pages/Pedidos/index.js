import React, { useEffect, useState } from 'react';
import TabelaPedidos from '../../components/TabelaPedidos';
import Titulo from '../../components/Titulo';
import { CloseOutlined, SearchOutlined, ReloadOutlined, CheckOutlined} from '@ant-design/icons';
import { Container, Breadcrumb } from 'react-bootstrap';
import { Divider, Button, Modal, Form, DatePicker } from 'antd';
import { showConfirm } from '../../components/ConfirmAcao';
import { notificarErro, notificarSucesso } from '../../components/Notificacao';
import { getKeyUsuarioLogado, isFuncionarioLogado, isClienteLogado} from '../../../service/usuario';
import FooterButtons from '../../components/FooterButtons';
import api from '../../../service/api';
import {useHistory} from 'react-router-dom';
const { Item } = Breadcrumb;


function Pedidos() {

    const [handlerUpdateTable, setHandlerUpdateTable] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState('');
    const [dateString, setDateString] = useState('');
    const [pedido, setPedido] = useState({});
    const history = useHistory();

    useEffect(() => {
    }, []);

   

    const buscarPedidos = async () => {
        const { data } = await api.get('/pedido', { params: { keyUsuario: getKeyUsuarioLogado() } });
        return data;

    }

    const acoes = {
        title: 'Ações',
        dataIndex: 'acoes',
        key: 'acoes',
        render: (_, record) => (
            <span>
                <Button
                    type='primary'
                    style={{ margin: '1px' }}
                    icon={<SearchOutlined />}
                    title='Ver Pedido'
                    onClick={_ => { handlerVisualizar(record.key) }}
                />
                {record.status === 'REALIZADO' &&
                    <Button
                        type='primary'
                        style={{ margin: '1px' }}
                        danger
                        title='Cancelar Pedido'
                        icon={<CloseOutlined />}
                        onClick={_ => {
                            showConfirm("Cancelar Pedido", "Deseja Cancelar o pedido?", cancelarPedido, record.key);
                        }
                        }
                    />
                }
                {(record.status === 'FINALIZADO' && isClienteLogado()) &&
                    <Button
                        type='primary'
                        style={{ margin: '1px'}}
                        title='Repetir Pedido'
                        icon={<ReloadOutlined />}
                        onClick={_ => { repetirPedido(record) }}
                    />
                }
                {(record.status === 'REALIZADO' && isFuncionarioLogado()) &&
                    <Button
                        type='primary'
                        style={{ margin: '1px' }}
                        title='Aceitar Pedido'
                        icon={<CheckOutlined />}
                        onClick={_ => { repetirPedido(record) }}
                    />
                }
            </span>
        )
    };

    const cancelarPedido = async (key) => {
        try {
            await api.delete(`/pedido/${key}`, { params: { keyUsuario: getKeyUsuarioLogado() } });
            notificarSucesso('Pedido cancelado com sucesso!');
            setHandlerUpdateTable(!handlerUpdateTable);
        } catch (e) {
            const { mensagem } = e.response.data;
            notificarErro(mensagem);
        }
    }

    const repetirPedido = (record) => {
        setPedido(record);
        showConfirm("Repetir Pedido", "Deseja repetir o pedido?", abrirModal);
    }

    const abrirModal = () => {
        setModalVisible(true);
        setLoading(false);
    }

    const confirmRepetir = async () => {
        setLoading(true);
        if (dateString) {
            try {
                await api.post(`/pedido/renovar/${pedido.key}`, {}, {
                    params: {
                        keyUsuario: getKeyUsuarioLogado(),
                        data: dateString
                    }
                });
                notificarSucesso('Pedido refeito com sucesso.');
                setModalVisible(false);

            } catch (e) {
                const { mensagem } = e.response.data;
                notificarErro(mensagem);
            }
        } else {
            notificarErro('Selecione a data.');
        }
        setLoading(false);
    }

    const handleCancel = () => {
        setModalVisible(false);
        setLoading(false);
    }

    const layout = {
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 5,
        },
    };

    const tailLayout = {
        wrapperCol: {
            offset: 2,
            span: 10,
        },
    };

    const onChangeData = (date, dateString) => {
        const dataSelecionada = new Date(date).getTime();
        const dataAtual = new Date().getTime();
        if (dataSelecionada < dataAtual) {
            if(dataSelecionada === 0){
                setData('');
                setDateString('');
            }else{
                notificarErro('Data Inválida.');
            }
        } else {
            setData(date);
            setDateString(dateString);
        }
    }

    const handlerCadastrar = () => {
        history.push({
            pathname:'/perfilPedidos',
            search:'?cadastro=1' 
        });
    }

    const handlerVisualizar = (key) => {
        history.push({
            pathname:'/perfilPedidos',
            search:`?cadastro=0&key=${key}` 
        });
    }

    return (
        <div>
            <Breadcrumb>
                <Item href="/">Principal</Item>
                <Item active>Pedidos</Item>
            </Breadcrumb>
            <Container>
                <Titulo nome="Pedidos" />
                <Divider />
                <TabelaPedidos getData={buscarPedidos} acoes={acoes} handlerUpdateTable={handlerUpdateTable} />
                <Divider />
                <FooterButtons label1='Cadastrar' label2='Voltar' callback1={handlerCadastrar} callback2={history.goBack} visible1={isClienteLogado()} visible2={false}/>
            </Container>
            <Modal
                title="Data do Pedido"
                visible={modalVisible}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancelar
                        </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={confirmRepetir}>
                        Ok
                        </Button>,
                ]}

            >
                <Form {...layout}>
                    <Form.Item
                        {...tailLayout}
                        label='Data: '>
                        <DatePicker value={data} onChange={onChangeData} format={'DD/MM/YYYY'} locale={'pt-BR'} />
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    );
}

export default Pedidos;