import React, { useState, useEffect } from 'react';
import { Button, Input ,Table} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import api from '../../../service/api';
import './index.css';

function TabelaUsuarios({ dataSource, acoes }) {

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [lista, setLista] = useState([]);
    const [loadingTable,setLoadingTable] = useState(false);

    useEffect(() => {
        async function carregaUsuarios() {
            setLoadingTable(true);
            const { data } = await api.get('/usuario');
            setLista(data);
            setLoadingTable(false);
        }
        carregaUsuarios();
    }, []);


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
            title: 'CpfCnpj',
            dataIndex: 'cpfCnpj',
            key: 'cpfCnpj',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => ((a.cpfCnpj > b.cpfCnpj) ? 1 : ((b.cpfCnpj > a.cpfCnpj) ? -1 : 0)),
        },
        {
            title: 'CpfCnpj',
            dataIndex: 'cpfCnpj',
            key: 'cpfCnpj',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => ((a.cpfCnpj > b.cpfCnpj) ? 1 : ((b.cpfCnpj > a.cpfCnpj) ? -1 : 0)),
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
             <Table dataSource={lista} columns={columns} className='Tabela' bordered loading={loadingTable}/>
        // <Table striped bordered hover>
        //     <thead>
        //         <tr>
        //             <th>Código</th>
        //             <th>Nome</th>
        //             <th>Cpf/Cnpj</th>
        //             <th>Função</th>
        //             <th>Opções</th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         {lista.map(u => (
        //             <tr key={u.key}>
        //                 <td>{u.key}</td>
        //                 <td>{u.nome}</td>
        //                 <td>{u.cpfCnpj}</td>
        //                 <td>{u.funcao}</td>
        //                 <td><button >click</button></td>
        //             </tr>))}
        //     </tbody>
        // </Table>
    );
}

export default TabelaUsuarios;