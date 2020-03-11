import React from 'react';
import {
    Row,
    Col,
    Container,
    Badge,
    Table,
    Button,
    ButtonToolbar,
} from 'react-bootstrap';
function TabelaPedidos() {
    return (
        <Row >
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th width="5%">Nº</th>
                        <th width="50%">Cliente</th>
                        <th width="20%">Tipo</th>
                        <th width="15%">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Samuel Pereira de Vasconcelos</td>
                        <td>Fornecedor</td>
                        <td>
                            <Col>
                                <ButtonToolbar>
                                    <Button variant="danger">excluir</Button>
                                </ButtonToolbar>
                            </Col>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Row>
    );
}

export default TabelaPedidos;