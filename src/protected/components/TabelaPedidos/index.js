import React from 'react';

import { DeleteOutlined,SearchOutlined} from '@ant-design/icons';

import './index.css';

import { Table, Button } from 'antd';

function TabelaPedidos() {

    const dataSource = [
        {
            numero: '1',
            cliente: 'Samuel Vasconcelos',
            data: '15/04/2020',
        },
        {
            numero: '2',
            cliente: 'Samuel Vasconcelos',
            data: '15/04/2020',
        },
        {
            numero: '3',
            cliente: 'Samuel Vasconcelos',
            data: '15/04/2020',
        },
    ];

    const columns = [
        {
            title: 'Nº',
            dataIndex: 'numero',
            key: 'numero',

        },
        {
            title: 'Cliente',
            dataIndex: 'cliente',
            key: 'cliente',
        },
        {
            title: 'Data',
            dataIndex: 'data',
            key: 'data',
        },
        {
            title: 'Ações',
            dataIndex: 'acoes',
            key: 'acoes',
            render: _ => (
                <span>
                    <Button
                        type='primary'
                        style={{ marginLeft: '2px' }}
                        icon={<SearchOutlined />}
                    />
                    <Button
                        type='primary'
                        style={{ marginLeft: '2px' }}
                        danger
                        icon={<DeleteOutlined />} 
                        />
                </span>
            ),
        },
    ];



    return (  
        <Table dataSource={dataSource} columns={columns} className='Tabela' />   
    );
}

export default TabelaPedidos;