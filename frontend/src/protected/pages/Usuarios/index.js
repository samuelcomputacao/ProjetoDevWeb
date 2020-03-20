import React from 'react';
import Menu from '../../components/Menu';
import { Container, Breadcrumb } from 'react-bootstrap';
import Titulo from '../../components/Titulo';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import TabelaUsuarios from '../../components/TabelaUsuarios';
import { Divider, Button } from 'antd';
const { Item } = Breadcrumb;


function Usuarios() {

    const dataSource = [
        {
            id: '1',
            nome: 'Samuel Vasconcelos',
            funcao: 'Cliente',
            cpfCnpj:'111.111.111-11'
        },
        {
            id: '2',
            nome: 'Samuel Vasconcelos',
            funcao: 'Cliente',
            cpfCnpj:'111.111.111-11'
        },
        {
            id: '3',
            nome: 'Samuel Vasconcelos',
            funcao: 'Funcionario',
            cpfCnpj:'111.111.111-11'
        },
    ];

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
                        _=>{editarUsuario(record)}
                    }
                />
                <Button
                    type='primary'
                    style={{ marginLeft: '2px' }}
                    danger
                    icon={<DeleteOutlined />}
                    onClick={
                        _=>{excluirUsuario(record)}
                    }
                />
            </span>
        ),
    }

    const editarUsuario = (usuario) => {
        alert(usuario.id)
    }

    const excluirUsuario = (usuario) => {
        alert(usuario.id)
    }

return (
    <div>
        <Menu></Menu>
        <Breadcrumb>
            <Item href="/">Principal</Item>
            <Item active>Usuarios</Item>
        </Breadcrumb>
        <Container>
            <Titulo name='Usuários' />
            <Divider />
            <TabelaUsuarios dataSource={dataSource} acoes={acoes} />
            <Divider />
            <Button type='primary' href='/cadastroUsuarios'>Cadastrar</Button>
        </Container>

    </div>
);
}

export default Usuarios;