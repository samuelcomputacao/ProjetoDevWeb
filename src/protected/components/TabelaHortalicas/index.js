import React from 'react';
import {
    Row,
    Col,
    Table,
    Button,
    ButtonToolbar,
} from 'react-bootstrap';
function TabelaHortalicas() {
    return (
        <Row >
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th width="5%">Nº</th>
                        <th width="50%">Nome</th>
                        <th width="20%">Valor</th>
                        <th width="15%">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Alface</td>
                        <td>R$ 2,00</td>
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

export default TabelaHortalicas;