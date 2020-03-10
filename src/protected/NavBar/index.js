import React from 'react';
import { Navbar,Nav,NavDropdown,Form,FormControl, Button} from 'react-bootstrap';

function NavBar(){
    return (
        <Navbar bg="success" expand="lg">
            <Navbar.Brand href="#home">HortSystem</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#estoque">Estoque</Nav.Link>
                <Nav.Link href="#usuarios">Usuarios</Nav.Link>
                <Nav.Link href="#pedidos">Pedidos</Nav.Link>
                </Nav>
                <Form inline>
                <Button variant="light">Sair</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>);
}

export default NavBar;