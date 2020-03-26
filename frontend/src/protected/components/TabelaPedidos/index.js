import React from 'react';

import './index.css';

import { Table } from 'antd';

function TabelaPedidos({dataSource,acoes}) {

    const columns = [
        {
            title: 'Nº',
            dataIndex: 'id',
            key: 'id',

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
        acoes,
    ];



    return (  
        <Table dataSource={dataSource} columns={columns} className='Tabela' />   
    );
}

export default TabelaPedidos;