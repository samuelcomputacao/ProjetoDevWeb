import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { Avatar } from 'antd';
import { isFuncionarioLogado, sair, getUsuarioCorrente } from '../../../service/usuario';
import { UserOutlined } from '@ant-design/icons';

function Menu() {

    const [linkAvatar, setLinkAvatar] = useState('');

    useEffect(() => {
        const getAvatar = async () => {
            const avatar = await getUsuarioCorrente();
            if (avatar) {
                setLinkAvatar(avatar);
            }
        }
        getAvatar();
    }, []);

    return (
        <Navbar bg="success" expand="lg">
            <Navbar.Brand href="/">HortSystem</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/pedidos">Pedidos</Nav.Link>
                    {isFuncionarioLogado() &&
                        <Nav.Link href="/usuarios">Usuarios</Nav.Link>
                    }
                    <Nav.Link href="/hortalicas">Hortalicas</Nav.Link>
                </Nav>
                <Form inline>
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">
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
            </Navbar.Collapse>
        </Navbar>);
}

export default Menu;