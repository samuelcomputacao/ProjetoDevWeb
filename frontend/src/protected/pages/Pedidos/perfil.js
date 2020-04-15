import React, { useState, useEffect } from 'react';
import { ArrowRightOutlined, DeleteOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    Button,
    Divider,
    notification,
    Modal,
    InputNumber,
    DatePicker
} from 'antd';

import { Breadcrumb, Container } from 'react-bootstrap';
import Titulo from '../../components/Titulo';
import TabelaHortalicas from '../../components/TabelaHortalicas';
import api from '../../../service/api';
import {showConfirm} from '../../components/ConfirmAcao';
import {notificarErro,notificarSucesso} from '../../components/Notificacao';
const { Item } = Breadcrumb;


function PerfilPedidos() {
    const acoes = {
        title: 'Inserir',
        dataIndex: 'inserir',
        key: 'inserir',
        render: (text, record) => (
            <span>
                <Button
                    type='primary'
                    style={{ marginLeft: '2px' }}
                    icon={<ArrowRightOutlined />}
                    onClick={_ => {
                        setHortalica(record);
                        showModal();
                    }}
                    title='Inserir'
                />
            </span>
        )
    }

    const openNotification = (msg, descricao) => {
        notification.open({
            message: `${msg}`,
            description:
                `${descricao}`,
        });
    };

    const acoesPedido = {
        title: 'Remover',
        dataIndex: 'remover',
        key: 'remover',
        render: (_, record) => (
            <span>
                <Button
                    type='primary'
                    style={{ marginLeft: '2px' }}
                    icon={<DeleteOutlined />}
                    danger
                    onClick={_ => {
                        removerPedido(record.key);
                    }}
                    title='Remover'
                />
            </span>
        )
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
            span: 5,
        },
    };

    const [data, setData] = useState('');
    const [quantidade, setQuantidade] = useState(1);
    const [pedido, setPedido] = useState([]);
    const [hortalicas, setHortalicas] = useState([]);
    const [hortalica, setHortalica] = useState({});
    const [valorTotal,setValorTotal] = useState(0);

    const loading = false;

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [handlerUpdateTable, setHandlerUpdateTable] = useState(false);

    useEffect(()=>{
        async function carregaHortalicas(){
            const {data} = await api.get('/hortalica');
            setHortalicas(data);
        }
        carregaHortalicas();
    },[])

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setConfirmLoading(true)
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const salvarPedido = () => {
        alert(data);
    }

    const inserirHortalica = () => {
        if(quantidade <= 0){
            notificarErro('Quantidade inválida.');
        }else{
            let possui = false;
            pedido.map((hort) => {
                if (hort.key === hortalica.key) {
                    possui = true;
                }
                return(hort);
            });
            if (!possui) {
                setPedido([...pedido, {...hortalica,quantidade}])
                setValorTotal(valorTotal + (hortalica.valor * quantidade));
                setHandlerUpdateTable(!handlerUpdateTable);
                setQuantidade(1);
            } else {
                openNotification('Aviso!', 'A hortaliça já foi adicionada!');
            }
            handleCancel();
        }
    }

    const removerPedido = (key) => {
        let pedidoAux = [];
        let valorReferencia = 0;
        pedido.map((hort) => {
            if (hort.key !== key) {
              pedidoAux = [...pedidoAux,hort];
            }else{
                valorReferencia = hort.valor*hort.quantidade;
            }
            return(hort);
        });
        showConfirm('Remover hortaliça',`Deseja remover a hortaliça de código: ${key}?`,atualizarPedido,{pedidoAux,valorReferencia});
    }

    const atualizarPedido = async ({pedidoAux,valorReferencia}) => {
       await setPedido(pedidoAux);
       setValorTotal(valorTotal - valorReferencia);
    }


    const getPedidos = () =>{
        return pedido;
    }

    const getHortalicas = () => {
        return hortalicas;
    }

    const onChangeData = (date, dateString) => {
        setData(date);
    }


    return (
        <div>
            <Breadcrumb>
                <Item href="/">Principal</Item>
                <Item href="/pedidos">Pedidos</Item>
                <Item active >Cadastrar</Item>
            </Breadcrumb>
            <Container>
                <Titulo name='Cadastro de Pedidos' />
                <Divider />
                <h2>Hortaliças</h2>
                <TabelaHortalicas getData={getHortalicas} acoes={acoes} />
                <Divider />
                <h2>Pedido</h2>
                <TabelaHortalicas getData={getPedidos} acoes={acoesPedido} handleUpdateTable/>
                <Divider />
                <Form {...layout}>
                    <Form.Item
                        {...tailLayout}
                        label='Valor Total: '>
                        <Input readOnly value={valorTotal}/>
                    </Form.Item>
                    <Form.Item
                        {...tailLayout}
                        label='Data: '>
                        <DatePicker onChange={onChangeData} format={'DD/MM/YYYY'}/>
                    </Form.Item>
                </Form>
                <Button type='primary  ' onClick={salvarPedido}>Salvar</Button>
                <Modal
                    title="Quantidade"
                    visible={visible}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                          Camcelar
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={inserirHortalica}>
                          Adicionar
                        </Button>,
                      ]}
                    
                    >
                    <Form {...layout}>
                        <Form.Item {...tailLayout}
                            label='Quantidade: '
                        >
                        <InputNumber min={0} onChange={(value) =>{
                            setQuantidade(value);
                        }}/>
                        </Form.Item>
                    </Form>
                </Modal>
                <Divider />
            </Container>
        </div>
    );
}
export default PerfilPedidos;