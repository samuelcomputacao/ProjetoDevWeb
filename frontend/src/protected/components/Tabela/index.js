import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import './index.css';
import ProgressBar from '../ProgressBar';
import { notificarErro } from '../Notificacao';
function Tabela({ getData, getTotal, handleUpdateTable, getFiltro, getCard }) {

    const [lista, setLista] = useState([]);
    const [loadingTable, setLoadingTable] = useState(false);
    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        async function init() {
            setLoadingTable(true);
            const total = await getTotal();
            setTotal(total);
            const data = await getData(page, pageSize);
            setLista(data);
            setLoadingTable(false);
        }
        init();
    }, [getData, getTotal, page, pageSize, handleUpdateTable]);

    const onChangePagnator = (pg, ps) => {
        if (pg > Math.ceil(total / ps)) {
            notificarErro('Página inválida!');
        } else {
            if (ps !== pageSize) {
                setPage(0);
                setPageSize(ps);
            } else {
                setPage(pg);
            }
        }
    }

    return (
        <div>
            <div className='separeBotoom'>
                {getFiltro(setPage)}
            </div>
            <div>
                <div className='grid'>
                    <div className='grid center'>

                    </div>
                </div>
                {!loadingTable && (
                    <div className='separeBotoom'>
                        <div>
                            {lista.length > 0 && (
                                lista.map((obj) => {
                                    return (
                                        getCard(obj)
                                    );
                                })
                            )
                            }{
                                lista.length === 0 && (
                                    <div className='contentEmpty grid'>
                                        <div className='center'>
                                            <h3>Não há dados.</h3>
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                    </div>
                )}{loadingTable && (
                    <ProgressBar />
                )}
            </div>
            <div className="grid">
                <div className="grid center">
                    <Pagination showQuickJumper showSizeChanger defaultCurrent={1} total={total} defaultPageSize={pageSize} onChange={onChangePagnator} pageSizeOptions={[5, 10, 20]} />
                </div>
            </div>
        </div>
    );
}

export default Tabela;