import React from 'react';
import { Navbar,Nav,Form, Button} from 'react-bootstrap';

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
                    <Button variant="light">Sair</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>);
}

export default Menu;