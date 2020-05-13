import React, { useState, useEffect } from 'react';

import './index.css';

import { Table } from 'antd';

function TabelaPedidos({getData,acoes,handlerUpdateTable}) {

    const[loadingTable,setLoadingTable] = useState(false);
    const[lista,setLista] = useState([]);

    useEffect(()=>{
        async function carregarDados(){
            setLoadingTable(true);
            const data = await getData();
            setLista(data);
            setLoadingTable(false);
        }
        carregarDados();
    },[getData,acoes,handlerUpdateTable]);

    const columns = [
        {
            title: 'Nº',
            dataIndex: 'key',
            key: 'key',

        },
        {
            title: 'Cliente',
            dataIndex: 'nome',
            key: 'nome',
        },
        {
            title: 'Data',
            dataIndex: 'data',
            key: 'data',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        acoes,
    ];

    return (  
      <Table columns={columns} dataSource={lista} loadingTable={loadingTable} pagination={{ pageSizeOptions: ['5', '10', '20', '40'], showSizeChanger: true, defaultPageSize: 5 }}/>
    );
}

export default TabelaPedidos;