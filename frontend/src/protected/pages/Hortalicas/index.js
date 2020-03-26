import React from 'react';
import { Breadcrumb, Container } from 'react-bootstrap';
import Titulo from '../../components/Titulo';
import TabelaHortalicas from '../../components/TabelaHortalicas';
import { Divider, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
const { Item } = Breadcrumb;

function Hortalicas() {

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
                        alert(record)
                    }}
                />
                <Button
                    type='primary'
                    style={{ marginLeft: '2px' }}
                    danger
                    icon={<DeleteOutlined />}
                    onClick={_ => {
                        alert(record)
                    }}
                />
            </span>
        )
    }

    const dataSource = [
        {
            id: '1',
            nome: 'Alface',
            categoria: 'Folhas',
            classificacao: '5',
            valor: 3
        },
        {
            id: '2',
            nome: 'Coentro',
            categoria: 'Folhas',
            classificacao: '5',
            valor: 2,
        },
        {
            id: '3',
            nome: 'Cebola',
            categoria: 'Folhas',
            classificacao: '5',
            valor: 5,
            
        },
    ];
    return (
        <div>
            <Breadcrumb>
                <Item href="/">Principal</Item>
                <Item active>Hortaliças</Item>
            </Breadcrumb>
            <Container>
                <Titulo name='Hortaliças' />
                <Divider />
                <TabelaHortalicas dataSource={dataSource} acoes={acoes} />
                <Divider />
                <Button type='primary' href='/cadastroHortalicas'>Cadastrar</Button>
            </Container>
        </div>
    );
}

export default Hortalicas;