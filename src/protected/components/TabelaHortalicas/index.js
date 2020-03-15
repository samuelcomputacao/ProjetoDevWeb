import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import './index.css';
import { Table, Button } from 'antd';

function TabelaHortalicas() {
    const dataSource = [
        {
            key: '1',
            nome: 'Alface',
            categoria: 'Folhas',
            classificacao: '5',
            valor: '2,00'
        },
        {
            key: '2',
            nome: 'Alface',
            categoria: 'Folhas',
            classificacao: '5',
            valor: '2,00',
        },
        {
            key: '3',
            nome: 'Alface',
            categoria: 'Folhas',
            classificacao: '5',
            valor: '2,00',
        },
    ];

    const columns = [
        {
            title: 'Codigo',
            dataIndex: 'key',
            key:'key'

        },
        {
            title: 'Nome',
            dataIndex: 'nome',
            key:'nome'
        },
        {
            title: 'Categoria',
            dataIndex: 'categoria',
            key:'categoria'
        },
        {
            title: 'Classificação',
            dataIndex: 'classificacao',
            key:'classificacao'

        },
        {
            title: 'Valor',
            dataIndex: 'valor',
            key:'valor'
        },

        {
            title: 'Ações',
            dataIndex: 'acoes',
            key:'acoes',
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

export default TabelaHortalicas;