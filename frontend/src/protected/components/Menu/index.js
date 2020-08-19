import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { Avatar } from 'antd';
import { isClienteLogado, sair, getAvatar, getKeyUsuarioLogado, getTipoUsuarioLogado, isFuncionarioLogado } from '../../../service/usuario';
import { UserOutlined } from '@ant-design/icons';

function Menu() {

    const [linkAvatar, setLinkAvatar] = useState('');
    const [linkHome, setLinkHome] = useState('#');

    const [funcionarioLogado, setFuncionarioLogado] = useState(false);
    const [clienteLogado, setClienteLogado] = useState(false);

    useEffect(() => {
        const getLinkAvatar = async () => {
            const avatar = await getAvatar();
            if (avatar !== 'null') {
                setLinkAvatar(avatar);
            }
            const key = await getKeyUsuarioLogado();
            const tipo = await getTipoUsuarioLogado();
            setLinkHome(`/perfilUsuario?key=${key}&tipo=${tipo}`)
        }
        const verificarUsuarioLogado = async () => {
            const clienteLog = await isClienteLogado();
            const funcionarioLog = await isFuncionarioLogado();
            setFuncionarioLogado(funcionarioLog);
            setClienteLogado(clienteLog);
        }
        verificarUsuarioLogado();
        getLinkAvatar();

    }, []);

    return (
        <Navbar bg="success" expand="lg">
            <Navbar.Brand href="/">HortSystem</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {(funcionarioLogado || clienteLogado) &&
                        <Nav.Link href="/pedidos">Pedidos</Nav.Link>
                    }
                    {funcionarioLogado &&
                        <Nav.Link href="/usuarios">Usuarios</Nav.Link>
                    }
                    {(funcionarioLogado || clienteLogado) &&
                        <Nav.Link href="/hortalicas">Hortalicas</Nav.Link>
                    }
                </Nav>
                {(funcionarioLogado || clienteLogado) &&
                    <Form inline>
                        <Nav className="mr-auto">
                            <Nav.Link href={linkHome}>
                                <div>
                                    {linkAvatar && <Avatar size={40} src={linkAvatar} />}
                                    {!linkAvatar && <Avatar size={40} icon={<UserOutlined />} />}
                                </div>
                            </Nav.Link>
                        </Nav>

                        <Button variant="light" href={'/'} onClick={
                            () => {
                                sair();
                            }
                        }>Sair</Button>
                    </Form>
                }
            </Navbar.Collapse>
        </Navbar>);
}

export default Menu;