import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Button, Input, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { notificarErro, notificarSucesso } from '../../components/Notificacao';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import api from '../../../service/api';
import {showConfirm} from '../ConfirmAcao';
import './index.css';
function TabelaUsuarios() {

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [lista, setLista] = useState([]);
    const [loadingTable, setLoadingTable] = useState(false);
    const [handleUpdateTable, setHandleUpdateTable] = useState(true);



    const history = useHistory();


    useEffect(() => {
        async function carregaUsuarios() {
            setLoadingTable(true);
            const { data } = await api.get('/usuario');
            setLista(data);
            setLoadingTable(false);
        }
        carregaUsuarios();
    }, [handleUpdateTable]);

    const excluirUsuario = async ({key}) => {
        try {
            await api.delete(`/usuario/${key}`);
            notificarSucesso('Usuário deletado com sucesso');
            setHandleUpdateTable(!handleUpdateTable);
        } catch (e) {
            const { mensagem } = e.response.data;
            notificarErro(mensagem);
        }
    }



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
                    onClick={
                        _ => { editarUsuario(record) }
                    }
                />
                <Button
                    type='primary'
                    style={{ marginLeft: '2px' }}
                    danger
                    icon={<DeleteOutlined />}
                    onClick={_ => {
                        const title = 'Deseja excluir o usuário?'
                        const content = `Ao clicar em OK você excluirá o usuário de código ${record.key}`;
                        const params = { key:record.key };
                        showConfirm(title, content, excluirUsuario, params);
                    }
                    }
                />
            </span>
        ),
    }

    const editarUsuario = async (usuario) => {
        history.push({
            pathname: '/perfilUsuario',
            search: `?key=${usuario.key}&tipo=${usuario.tipoUsuario}`
        });

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
            title: 'Código',
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
            ...getColumnSearchProps('nome')
        },
        {
            title: 'CpfCnpj',
            dataIndex: 'cpfCnpj',
            key: 'cpfCnpj',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => ((a.cpfCnpj > b.cpfCnpj) ? 1 : ((b.cpfCnpj > a.cpfCnpj) ? -1 : 0)),
        },

        {
            title: 'Função',
            dataIndex: 'funcao',
            filters: [
                {
                    text: 'Funcionario',
                    value: 'Funcionario',
                },
                {
                    text: 'Cliente',
                    value: 'Cliente',
                },
            ],
            onFilter: (value, record) => record.funcao.indexOf(value) === 0,
        },
        acoes,
    ];



    return (

        <Table dataSource={lista} columns={columns} className='Tabela' bordered loading={loadingTable} pagination={{ pageSizeOptions: ['5', '10', '20', '40'], showSizeChanger: true, defaultPageSize: 5 }} />


    );
}

export default TabelaUsuarios;