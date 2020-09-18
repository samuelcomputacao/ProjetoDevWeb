import React, { useState, useEffect } from 'react';
import { Button, Input, Pagination, Space, Spin } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import './index.css';
import Card from '../Card';
import { notificarErro } from '../Notificacao';
function TabelaUsuarios({ getData, acoes, handleUpdateTable, getTotal }) {

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [lista, setLista] = useState([]);
    const [loadingTable, setLoadingTable] = useState(false);
    const [total, setTotal] = useState(0);

    const [page,setPage] = useState(1);
    const [pageSize,setPageSize] = useState(3);

    useEffect(() => {
        async function init() {
            setLoadingTable(true);
            const data = await getData(page,pageSize);
            const total = await getTotal();
            setTotal(total);
            setLista(data);
            setLoadingTable(false);
        }
        init();
    }, [getData, getTotal, page, pageSize]);

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
                    text: 'FUNCIONARIO',
                    value: 'FUNCIONARIO',
                },
                {
                    text: 'CLIENTE',
                    value: 'CLIENTE',
                },
            ],
            onFilter: (value, record) => record.funcao.indexOf(value) === 0,
        },
        acoes,
    ];

    const onChangePagnator = (pg, ps) => {
        console.log(`PAGE: ${pg} PAGESIZE: ${ps} TOT: ${Math.ceil(total/ps)} TOT: ${pg > Math.ceil(total/ps)}`)
        if(pg > Math.ceil(total/ps)){
            notificarErro('Página inválida!');
        }else{
            if(ps !== pageSize){
                setPage(0);
                setPageSize(ps);
            }else{
                setPage(pg);
            }
        }
    }

    const getConteudo = (usuario) => {
        return (
            <div>
                <p>
                    <span><b>CPF/CNPJ:</b></span>
                    <span>{usuario.cpfCnpj}</span>
                </p>
                <p>
                    <span><b>Função:</b></span>
                    <span>{usuario.funcao}</span>
                </p>
                <p>
                    <span><b>Código:</b></span>
                    <span>{usuario.key}</span>
                </p>
            </div>
        );
    }



    return (
        // <Table dataSource={lista} columns={columns} className='Tabela' bordered loading={loadingTable} pagination={{ pageSizeOptions: ['5', '10', '20', '40'], showSizeChanger: true, defaultPageSize: 5 }} />

        <div>
            {!loadingTable && (
                <div>
                    {
                        lista.map((usuario) => {
                            return (
                                <div key={usuario.key} className='force-display-inline'>
                                    <Card titulo={usuario.nome} conteudo={getConteudo(usuario)} acoes={acoes(usuario)} />
                                </div>
                            );
                        })
                    }
                </div>
            )}{ loadingTable && (
                <Space size='larger'>
                    <Spin size='large'/>
                </Space>
            )}
            <br />
            <center>
                <Pagination showQuickJumper showSizeChanger defaultCurrent={1} total={total} defaultPageSize={pageSize} onChange={onChangePagnator} pageSizeOptions={[1,5,10]}/>
            </center>
        </div>
    );
}

export default TabelaUsuarios;