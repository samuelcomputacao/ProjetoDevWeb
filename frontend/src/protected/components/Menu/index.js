import React from 'react';
import { Navbar,Nav,Form, Button} from 'react-bootstrap';
import {Avatar} from 'antd';

function Menu(){
    return (
        <Navbar bg="success" expand="lg">
            <Navbar.Brand href="/">HortSystem</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/pedidos">Pedidos</Nav.Link>
                    <Nav.Link href="/usuarios">Usuarios</Nav.Link>
                    <Nav.Link href="/hortalicas">Hortalicas</Nav.Link>
                </Nav>
                <Form inline>
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">
                            <Avatar size={40} src="https://avatars3.githubusercontent.com/u/37349965?s=460&u=2817736bcc93cbf543c3a88cdbbbb7c7f0fa14db&v=4" />
                        </Nav.Link>
                    </Nav>
                    
                    <Button variant="light">Sair</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>);
}

export default Menu;