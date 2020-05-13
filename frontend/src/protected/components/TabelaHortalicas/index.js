import React, { useState, useEffect } from 'react';
import { Table, Button,Input } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

function TabelaHortalicas({getData, acoes,handleUpdateTable}) {

    const [lista, setLista] = useState([]);
    
    const [loadingTable, setLoadingTable] = useState(false);

    const [searchText, setSearchText]  = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');


    useEffect(() => {
         async function carregaHortalicas() {
            setLoadingTable(true);
            const data  = await getData();
            setLista(data);
            setLoadingTable(false);
         }
         carregaHortalicas();
    
    }, [handleUpdateTable,getData]);


    
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
        <Table dataSource={lista} columns={columns} className='Tabela' loading={loadingTable}  pagination= { {pageSizeOptions: ['5','10','20', '40'], showSizeChanger: true, defaultPageSize:5}}/>
    );
}

export default TabelaHortalicas;