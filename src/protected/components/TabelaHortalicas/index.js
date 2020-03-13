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
                        <th width="10%">Categoria</th>
                        <th width="10%">Classificação</th>
                        <th width="5%">Valor</th>
                        <th width="20%">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Alface</td>
                        <td>Folhas</td>
                        <td>5</td>
                        <td>2,00</td>
                        <td>
                            <Col>
                                <ButtonToolbar>
                                    <Button style={{margin:'2px'}} variant="primary">ver</Button>
                                    <Button style={{margin:'2px'}} variant="danger">excluir</Button>
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