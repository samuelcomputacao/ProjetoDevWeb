import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import './index.css';
import Card from '../Card';
import ProgressBar from '../ProgressBar';
import { notificarErro } from '../Notificacao';
function TabelaUsuarios({ getData, acoes, getTotal, handleUpdateTable, getFiltro }) {

    const [lista, setLista] = useState([]);
    const [loadingTable, setLoadingTable] = useState(false);
    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        async function init() {
            setLoadingTable(true);
            const data = await getData(page, pageSize);
            const total = await getTotal();
            setTotal(total);
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
        <div>
            <div className='separeBotoom'>
                {getFiltro()}
            </div>
            {!loadingTable && (
                <div className='separeBotoom'>
                    <div>
                        {lista.length > 0 && (
                            lista.map((usuario) => {
                                return (
                                    <div key={usuario.key} className='force-display-inline'>
                                        <Card titulo={usuario.nome} conteudo={getConteudo(usuario)} acoes={acoes(usuario)} />
                                    </div>
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
            <div className="grid">
                <div className="grid center">
                    <Pagination showQuickJumper showSizeChanger defaultCurrent={1} total={total} defaultPageSize={pageSize} onChange={onChangePagnator} pageSizeOptions={[5, 10, 20]} />
                </div>
            </div>
        </div>
    );
}

export default TabelaUsuarios;