import React from 'react';
import TabelaPedidos from '../../components/TabelaPedidos';
import Titulo from '../../components/Titulo';
import { DeleteOutlined,SearchOutlined,ReloadOutlined} from '@ant-design/icons';
import {Container, Breadcrumb} from 'react-bootstrap';
import { Divider,Button} from 'antd';
const {Item} = Breadcrumb;

function Pedidos() {
    const dataSource = [
        {
            id: '1',
            cliente: 'Samuel Vasconcelos',
            data: '15/04/2020',
        },
        {
            id: '2',
            cliente: 'Samuel Vasconcelos',
            data: '15/04/2020',
        },
        {
            id: '3',
            cliente: 'Samuel Vasconcelos',
            data: '15/04/2020',
        },
    ];

    const acoes = {
        title: 'Ações',
        dataIndex: 'acoes',
        key: 'acoes',
        render: (text,record) => (
            <span>
                <Button
                    type='primary'
                    style={{ marginLeft: '2px' }}
                    icon={<SearchOutlined />}
                    title='Ver Pedido'
                    onClick={_=>{visualizarPedido(record)}}
                />
                <Button
                    type='primary'
                    style={{ marginLeft: '2px' }}
                    danger
                    title='Apagar Pedido'
                    icon={<DeleteOutlined />} 
                    onClick={_=>{cancelarPedido(record)}}
                    />
                <Button
                    type='primary'
                    style={{ marginLeft: '2px' }}
                    success
                    title='Repetir Pedido'
                    icon={ <ReloadOutlined />} 
                    onClick={_=>{repetirPedido(record)}}
                    />
            </span>
        )
    };

    const visualizarPedido = pedido => {
        alert(pedido.id);
    }

    const cancelarPedido = pedido => {
        alert(pedido.id);
    }

    const repetirPedido = pedido => {
        alert(pedido.id);
    }

    return (
        <div>
            <Breadcrumb>
                <Item href="/">Principal</Item>
                <Item active>Pedidos</Item>
            </Breadcrumb>
            <Container>
                <Titulo name="Pedidos" />
                <Divider/>
                <TabelaPedidos dataSource={dataSource} acoes={acoes} />
                <Divider/>
                <Button type='primary' href='/perfilPedidos'>Cadastrar</Button>
            </Container>
        </div>
    );
}

export default Pedidos;