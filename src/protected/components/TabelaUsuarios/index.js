import React from 'react';

import { DeleteOutlined,EditOutlined} from '@ant-design/icons';

import './index.css';

import { Table, Button } from 'antd';

function TabelaUsuarios() {

    const dataSource = [
        {
            key: '1',
            nome: 'Samuel Vasconcelos',
            funcao: 'Cliente',
        },
        {
            key: '2',
            nome: 'Samuel Vasconcelos',
            funcao: 'Cliente',
        },
        {
            key: '3',
            nome: 'Samuel Vasconcelos',
            funcao: 'Funcionario',
        },
    ];

    const columns = [
        {
            title: 'Código',
            dataIndex: 'key',
            key: 'key',

        },
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
        },
        {
            title: 'Função',
            dataIndex: 'funcao',
            key: 'funcao',
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
                        
                        icon={<EditOutlined />} 
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

export default TabelaUsuarios;