import React, { useState } from 'react';
import { ArrowRightOutlined, DeleteOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    Button,
    Divider,
    notification,
    Modal,
    InputNumber
} from 'antd';

import Menu from '../../components/Menu';
import { Breadcrumb, Container } from 'react-bootstrap';
import Titulo from '../../components/Titulo';
import TabelaHortalicas from '../../components/TabelaHortalicas';
const { Item } = Breadcrumb;


function CadastroPedidos() {
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
        render: (text, record) => (
            <span>
                <Button
                    type='primary'
                    style={{ marginLeft: '2px' }}
                    icon={<DeleteOutlined />}
                    danger
                    onClick={_ => {
                        alert(record)
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

    const hortalicasBKP = [
        {
            key: '1',
            nome: 'Alface',
            categoria: 'Folhas',
            classificacao: '5',
            valor: 3,
        },
        {
            key: '2',
            nome: 'Coentro',
            categoria: 'Folhas',
            classificacao: '5',
            valor: 2,
        },
        {
            key: '3',
            nome: 'Cebola',
            categoria: 'Folhas',
            classificacao: '5',
            valor: 5,

        },
    ];


    const [data, setData] = useState('');
    const [quantidade, setQuantidade] = useState(0);
    const [pedido, setPedido] = useState([]);
    const hortalicas = [...hortalicasBKP];
    const [hortalica, setHortalica] = useState({});

    const loading = false;

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

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
        let possui = false;
        pedido.map((hort) => {
            if (hort.key === hortalica.key) {
                possui = true;
            }
            return(hort);
        });
        if (!possui) {
            console.log({...hortalica,quantidade});
            setPedido([...pedido, {...hortalica,quantidade}])
        } else {
            openNotification('Aviso!', 'A hortaliça já foi adicionada!');
        }
        handleCancel();
    }



    return (
        <div>
            <Menu />
            <Breadcrumb>
                <Item href="/">Principal</Item>
                <Item href="/pedidos">Pedidos</Item>
                <Item active >Cadastrar</Item>
            </Breadcrumb>
            <Container>
                <Titulo name='Cadastro de Pedidos' />
                <Divider />
                <h2>Hortaliças</h2>
                <TabelaHortalicas dataSource={hortalicas} acoes={acoes} />
                <Divider />
                <h2>Pedido</h2>
                <TabelaHortalicas dataSource={pedido} acoes={acoesPedido} />
                <Divider />
                <Form {...layout}>
                    <Form.Item
                        {...tailLayout}
                        label='Valor Total: '>
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item
                        {...tailLayout}
                        label='Data: '>
                        <Input value={data} onChange={(evnt) => { setData(evnt.target.value) }} />
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

export default CadastroPedidos;