import React, { useState, useEffect } from 'react';
import { Table, Button,Input } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined,DeleteOutlined,EditOutlined } from '@ant-design/icons';
import api from '../../../service/api';
import { useHistory } from 'react-router-dom';
import { notificarSucesso, notificarErro } from '../Notificacao';
import {showConfirm} from '../ConfirmAcao';

function TabelaHortalicas() {

    const [lista, setLista] = useState('');
    
    const [loadingTable, setLoadingTable] = useState(false);
    const [handleUpdateTable, setHandleUpdateTable] = useState(true);

    const [searchText, setSearchText]  = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    const history = useHistory();


    useEffect(() => {
        async function carregaHortalicas() {
            setLoadingTable(true);
            const { data } = await api.get('/hortalica');
            setLista(data);
            setLoadingTable(false);
        }
        carregaHortalicas();
    }, [handleUpdateTable]);


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
                    onClick={_ => {
                        editarHortalica(record.key);
                    }}
                />
                <Button
                    type='primary'
                    style={{ marginLeft: '2px' }}
                    danger
                    icon={<DeleteOutlined />}
                    onClick={_ => {
                        const title = 'Deseja excluir a hortaliça?'
                        const content = `Ao clicar em OK você excluirá a hortaliça de código ${record.key}`;
                        const params = { key:record.key };
                        showConfirm(title, content, excluiHortalica, params);
                    }
                }
                />
            </span>
        )
    }

    const editarHortalica = (key) => {
        history.push({
            pathname:'/editarHortalica',
            search:`?key=${key}`
        })
    }

    const excluiHortalica = async ({key}) =>{
        try {
            await api.delete(`/hortalica/${key}`);
            setHandleUpdateTable(!handleUpdateTable);
            notificarSucesso('Hortaliça removida com sucesso.')
        } catch (e) {
            const {mensagem} = e.response.data;
            notificarErro(mensagem);
        }
    }
    
    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Buscar ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Buscar
            </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Resetar
            </Button>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                    text
                ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };

    const columns = [
        {
            title: 'Codigo',
            dataIndex: 'key',
            key: 'key',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.key - b.key,

        },
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => ((a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0)),
            ...getColumnSearchProps('nome'),
        },
        {
            title: 'Categoria',
            dataIndex: 'categoria',
            key: 'categoria',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => ((a.categoria > b.categoria) ? 1 : ((b.categoria > a.categoria) ? -1 : 0)),
            
            filters: [
                {
                    text: 'Folhas',
                    value: 'Folhas',
                },
                {
                    text: 'Raizes',
                    value: 'Raizes',
                },
                {
                    text: 'Legumes',
                    value: 'Legumes',
                },
            ],
            onFilter: (value, record) => record.categoria.indexOf(value) === 0,
        },
        {
            title: 'Classificação',
            dataIndex: 'classificacao',
            key: 'classificacao',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.classificacao - b.classificacao,

        },
        {
            title: 'Valor (R$)',
            dataIndex: 'valor',
            key: 'valor',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.valor - b.valor,
        },
        acoes,
    ];

    return (
        <Table dataSource={lista} columns={columns} className='Tabela' loading={loadingTable}  pagination= { {pageSizeOptions: ['5','10','20', '40'], showSizeChanger: true,pageSize:5}}/>
    );
}

export default TabelaHortalicas;