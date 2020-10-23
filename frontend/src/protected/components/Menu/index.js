import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useUsuarioContext } from '../../../context/UsuarioContext';
import { Link } from 'react-router-dom';

function Menu() {

    const [linkAvatar, setLinkAvatar] = useState('');
    const [linkHome, setLinkHome] = useState('#');

    const { isClienteLogado, sair, getAvatar, getKeyUsuarioLogado, getTipoUsuarioLogado, isFuncionarioLogado } = useUsuarioContext();

    useEffect(() => {
        const getLinkAvatar = async () => {
            const avatar = getAvatar();
            if (avatar !== 'null') {
                setLinkAvatar(avatar);
            }
            const key = getKeyUsuarioLogado();
            const tipo = getTipoUsuarioLogado();
            setLinkHome(`/perfilUsuario?key=${key}&tipo=${tipo}`)
        }

        getLinkAvatar();

    }, [getAvatar, getKeyUsuarioLogado, getTipoUsuarioLogado, isClienteLogado, isFuncionarioLogado]);

    return (
        <Navbar bg="success" expand="lg">
            <Navbar.Brand>
                <Link className='link' to='/pedidos'>HortSystem</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {(isFuncionarioLogado() || isClienteLogado()) &&
                        <Nav.Link>
                            <Link className='link' to='/pedidos'>Pedidos</Link>
                        </Nav.Link>
                    }
                    {isFuncionarioLogado() &&
                        <Nav.Link>
                            <Link className='link' to='/usuarios'>Usuarios</Link>
                        </Nav.Link>
                    }
                    {(isFuncionarioLogado() || isClienteLogado()) &&
                        <Nav.Link>
                            <Link className='link' to='/hortalicas'>Hortaliças</Link>
                        </Nav.Link>
                    }
                </Nav>
                {(isFuncionarioLogado() || isClienteLogado()) &&
                    <Form inline>
                        <Nav className="mr-auto">
                            <Nav.Link >
                                <Link className='link' to={linkHome}>
                                    <div>
                                        {linkAvatar && <Avatar size={40} src={linkAvatar} />}
                                        {!linkAvatar && <Avatar size={40} icon={<UserOutlined />} />}
                                    </div>
                                </Link>
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