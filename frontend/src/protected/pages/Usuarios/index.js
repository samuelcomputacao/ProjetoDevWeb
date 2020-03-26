import React,{useEffect,useState} from 'react';
import Menu from '../../components/Menu';
import { Container, Breadcrumb } from 'react-bootstrap';
import Titulo from '../../components/Titulo';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import TabelaUsuarios from '../../components/TabelaUsuarios';
import { Divider, Button } from 'antd';
import api from '../../../service/api';
import './index.css';
const { Item } = Breadcrumb;

function Usuarios() {

    const [dataSource, setDataSource] = useState([]);

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

    useEffect(() => { carregaUsuarios() }, []);

    const carregaUsuarios = async () => {
        const { data } = await api.get('/usuario');
        data.map((u) => (
            setDataSource([...dataSource,  ajustaUsuario(u)])
        ));
    }

    const ajustaUsuario = (usuario) => {
        const { id, nome, funcao, cpfCnpj } = usuario;
        const retorno = {
            nome,
            funcao,
            cpfCnpj,
            key: id
        }
        return retorno;
    }

return (
    <div>
        <Breadcrumb>
            <Item href="/">Principal</Item>
            <Item active>Usuarios</Item>
        </Breadcrumb>
        <Container className='Container'>
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